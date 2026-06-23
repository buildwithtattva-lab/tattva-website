const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || import.meta.env.CLOUDINARY_CLOUD_NAME || '';
const galleryTag = import.meta.env.VITE_CLOUDINARY_GALLERY_TAG || import.meta.env.CLOUDINARY_GALLERY_TAG || 'tattva-gallery';
const manifestUrl = import.meta.env.VITE_CLOUDINARY_GALLERY_MANIFEST_URL || '';
const fallbackManifestUrl = '/cloudinary-gallery.json';

const categoryLookup = new Map(
  ['Classroom', 'Workshops', 'Student Projects', 'Achievements'].flatMap((category) => [
    [category.toLowerCase(), category],
    [category.toLowerCase().replace(/\s+/g, '-'), category]
  ])
);

const toTitle = (publicId = '') => {
  const fileName = publicId.split('/').pop() || 'Gallery image';
  return fileName
    .replace(/\.[^./]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const normalizeCategory = (resource) => {
  const custom = resource.context?.custom || resource.context || {};
  const candidate = custom.category || resource.category || resource.metadata?.category;
  const tags = resource.tags || [];
  const folderSegments = [
    resource.public_id || resource.publicId || '',
    resource.asset_folder || resource.assetFolder || resource.folder || ''
  ].flatMap((value) => String(value).split('/'));

  const matched = [candidate, ...tags, ...folderSegments]
    .filter(Boolean)
    .map((item) => categoryLookup.get(String(item).toLowerCase()))
    .find(Boolean);

  return matched || 'Classroom';
};

const getResourceType = (resource) => resource.resource_type || resource.resourceType || 'image';

const cloudinaryMediaUrl = (resource, transform = 'f_auto,q_auto,c_fill,w_720,h_540', resourceType = getResourceType(resource)) => {
  if (resource.secure_url && resource.secure_url.includes('/upload/')) {
    return resource.secure_url.replace('/upload/', `/upload/${transform}/`);
  }

  if (!cloudName || !resource.public_id) return '';

  const version = resource.version ? `v${resource.version}/` : '';
  const extension = resource.format ? `.${resource.format}` : '';
  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${transform}/${version}${resource.public_id}${extension}`;
};

const cloudinaryImageUrl = (resource, transform = 'f_auto,q_auto,c_fill,w_720,h_540') => {
  const resourceType = getResourceType(resource);
  const mediaTransform = resourceType === 'video'
    ? transform.replace(/^f_auto,?/, 'f_jpg,so_auto,')
    : transform;

  return cloudinaryMediaUrl(resource, mediaTransform, resourceType);
};

const cloudinaryFullUrl = (resource) => {
  const resourceType = getResourceType(resource);
  const transform = resourceType === 'video' ? 'f_auto,q_auto' : 'f_auto,q_auto,w_1800';

  return cloudinaryMediaUrl(resource, transform, resourceType);
};

const normalizeResource = (resource, index) => {
  const custom = resource.context?.custom || resource.context || {};
  const publicId = resource.public_id || resource.publicId || resource.id || `gallery-${index}`;
  const folder = resource.asset_folder || resource.assetFolder || resource.folder || '';
  const resourceType = getResourceType(resource);

  return {
    id: `${publicId}-${resource.version || index}`,
    type: resourceType,
    isVideo: resourceType === 'video',
    public_id: publicId,
    display_name: resource.display_name || resource.displayName || '',
    version: resource.version,
    format: resource.format,
    secure_url: resource.secure_url || resource.url,
    created_at: resource.created_at || resource.createdAt || '',
    width: resource.width || 0,
    height: resource.height || 0,
    title: custom.caption || custom.title || resource.title || toTitle(publicId),
    alt: custom.alt || resource.alt || custom.caption || toTitle(publicId),
    category: normalizeCategory(resource),
    folder,
    thumb: cloudinaryImageUrl(resource),
    full: cloudinaryFullUrl(resource)
  };
};

const sourceCandidates = () => {
  const sources = [
    manifestUrl,
    cloudName ? `https://res.cloudinary.com/${cloudName}/image/list/${galleryTag}.json` : '',
    fallbackManifestUrl
  ].filter(Boolean);

  return [...new Set(sources)];
};

export const fetchGalleryResources = async () => {
  const errors = [];

  for (const sourceUrl of sourceCandidates()) {
    try {
      const response = await fetch(sourceUrl);

      if (!response.ok) {
        throw new Error(`Unable to load Cloudinary gallery (${response.status}).`);
      }

      const data = await response.json();
      const resources = Array.isArray(data) ? data : data.resources || data.images || [];
      const images = resources.map(normalizeResource).filter((image) => image.thumb);

      if (images.length) {
        return images;
      }

      errors.push(`${sourceUrl}: no images found`);
    } catch (error) {
      errors.push(`${sourceUrl}: ${error.message}`);
    }
  }

  throw new Error(errors[0] || 'Cloudinary gallery is not configured.');
};

export const cloudinaryGalleryConfig = {
  cloudName,
  galleryTag,
  manifestUrl
};
