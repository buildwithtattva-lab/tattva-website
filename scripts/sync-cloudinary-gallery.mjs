import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const envPaths = ['.env', '.env.local'].map((fileName) => path.join(rootDir, fileName));
const outputPath = path.join(rootDir, 'public', 'cloudinary-gallery.json');

const parseEnv = (content) => {
  const values = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) continue;

    const equalsIndex = line.indexOf('=');
    if (equalsIndex === -1) continue;

    const key = line.slice(0, equalsIndex).trim().replace(/^export\s+/, '');
    let value = line.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
};

const loadEnv = async () => {
  const values = {};

  for (const envPath of envPaths) {
    try {
      const content = await readFile(envPath, 'utf8');
      Object.assign(values, parseEnv(content));
    } catch {
      // The project may not use every supported dotenv file.
    }
  }

  return { ...values, ...process.env };
};

const parseCloudinaryUrl = (cloudinaryUrl = '') => {
  if (!cloudinaryUrl) return {};

  try {
    const url = new URL(cloudinaryUrl);
    return {
      apiKey: decodeURIComponent(url.username),
      apiSecret: decodeURIComponent(url.password),
      cloudName: url.hostname
    };
  } catch {
    return {};
  }
};

const normalizePrefix = (prefix = '') => prefix.trim().replace(/^\/+/, '').replace(/\/?$/, '/');

const buildCloudinaryUrl = ({ cloudName, tag, nextCursor }) => {
  const url = tag
    ? new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image/tags/${encodeURIComponent(tag)}`)
    : new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`);

  url.searchParams.set('max_results', '100');
  url.searchParams.set('context', 'true');
  url.searchParams.set('tags', 'true');
  url.searchParams.set('metadata', 'true');

  if (nextCursor) {
    url.searchParams.set('next_cursor', nextCursor);
  }

  return url;
};

const fetchResources = async ({ cloudName, apiKey, apiSecret, tag, prefix }) => {
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  const resources = [];
  let nextCursor = '';
  const normalizedPrefix = prefix ? normalizePrefix(prefix).toLowerCase() : '';
  const matchesPrefix = (resource) => {
    if (!normalizedPrefix) return true;

    return [resource.asset_folder, resource.folder, resource.public_id]
      .filter(Boolean)
      .some((value) => normalizePrefix(String(value)).toLowerCase().startsWith(normalizedPrefix));
  };

  do {
    const response = await fetch(buildCloudinaryUrl({ cloudName, tag, nextCursor }), {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Cloudinary request failed (${response.status}): ${message}`);
    }

    const data = await response.json();
    resources.push(...(data.resources || []).filter(matchesPrefix));
    nextCursor = data.next_cursor || '';
  } while (nextCursor);

  return resources;
};

const main = async () => {
  const env = await loadEnv();
  const cloudinaryUrl = parseCloudinaryUrl(env.CLOUDINARY_URL);
  const cloudName = env.CLOUDINARY_CLOUD_NAME || env.VITE_CLOUDINARY_CLOUD_NAME || cloudinaryUrl.cloudName;
  const apiKey = env.CLOUDINARY_API_KEY || cloudinaryUrl.apiKey;
  const apiSecret = env.CLOUDINARY_API_SECRET || cloudinaryUrl.apiSecret;
  const prefix = env.CLOUDINARY_GALLERY_PREFIX ? normalizePrefix(env.CLOUDINARY_GALLERY_PREFIX) : '';
  const tag = prefix ? '' : (env.CLOUDINARY_GALLERY_TAG || env.VITE_CLOUDINARY_GALLERY_TAG || '');

  if (!cloudName || !apiKey || !apiSecret) {
    const missingKeys = [
      !cloudName && 'CLOUDINARY_CLOUD_NAME',
      !apiKey && 'CLOUDINARY_API_KEY',
      !apiSecret && 'CLOUDINARY_API_SECRET'
    ].filter(Boolean);

    throw new Error(
      `Missing ${missingKeys.join(', ')} in .env or .env.local. `
      + 'You can also provide CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>.'
    );
  }

  const resources = await fetchResources({ cloudName, apiKey, apiSecret, tag, prefix });
  const payload = {
    generated_at: new Date().toISOString(),
    source: tag ? `tag:${tag}` : prefix ? `prefix:${prefix}` : 'all',
    count: resources.length,
    resources
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  console.log(`Synced ${resources.length} Cloudinary images to ${path.relative(rootDir, outputPath)}.`);
};

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
