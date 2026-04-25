import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const RESEND_API_URL = 'https://api.resend.com/emails'

type WebhookPayload = {
  type?: 'INSERT' | 'UPDATE' | 'DELETE'
  record?: Record<string, unknown> | null
  old_record?: Record<string, unknown> | null
}

type ApplicantStage = 'application_received' | 'slot_booked' | 'payment_received' | 'interview_confirmed'

type DbRecord = {
  institution_name: string | null
  contact_person: string | null
  roles_needed: string | null
  message: string | null
  full_name: string | null
  email: string | null
  phone: string | null
  role: string | null
  subject: string | null
  application_status: string | null
  payment_status: string | null
  slot_status: string | null
  confirmed_at: string | null
  payment_screenshot_url: string | null
  scheduled_at: string | null
  interview_date: string | null
  utr_number: string | null
  resume_url: string | null
}

type ResendEmailPayload = {
  from: string
  to: string[]
  cc?: string[]
  subject: string
  html: string
}

const toOptionalString = (value: unknown) => {
  if (typeof value !== 'string') {
    return null
  }

  const trimmedValue = value.trim()
  return trimmedValue ? trimmedValue : null
}

const normalizeRecord = (record: Record<string, unknown>): DbRecord => ({
  institution_name: toOptionalString(record.institution_name),
  contact_person: toOptionalString(record.contact_person),
  roles_needed: toOptionalString(record.roles_needed),
  message: toOptionalString(record.message),
  full_name: toOptionalString(record.full_name),
  email: toOptionalString(record.email),
  phone: toOptionalString(record.phone),
  role: toOptionalString(record.role),
  subject: toOptionalString(record.subject),
  application_status: toOptionalString(record.application_status),
  payment_status: toOptionalString(record.payment_status),
  slot_status: toOptionalString(record.slot_status),
  confirmed_at: toOptionalString(record.confirmed_at),
  payment_screenshot_url: toOptionalString(record.payment_screenshot_url),
  scheduled_at: toOptionalString(record.scheduled_at),
  interview_date: toOptionalString(record.interview_date),
  utr_number: toOptionalString(record.utr_number),
  resume_url: toOptionalString(record.resume_url),
})

const isEmployerRecord = (record: DbRecord) => record.institution_name !== null

const detectApplicantStage = (record: DbRecord): ApplicantStage => {
  if (
    record.application_status === 'interview_confirmed' ||
    record.payment_status === 'verified' ||
    record.confirmed_at !== null
  ) {
    return 'interview_confirmed'
  }

  if (
    record.application_status === 'pending_verification' ||
    record.payment_status === 'pending_verification' ||
    record.payment_screenshot_url !== null
  ) {
    return 'payment_received'
  }

  if (
    record.application_status === 'slot_booked' ||
    record.slot_status === 'scheduled'
  ) {
    return 'slot_booked'
  }

  return 'application_received'
}

const formatInterviewDate = (value: unknown) => {
  if (typeof value !== 'string' || !value) {
    return null
  }

  const interviewDate = new Date(value)

  if (Number.isNaN(interviewDate.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(interviewDate)
}

const sendEmail = async (payload: ResendEmailPayload) => {
  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Resend error (${response.status}): ${errorText}`)
  }
}

serve(async (req) => {
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ success: false, error: 'RESEND_API_KEY is missing.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const payload = await req.json() as WebhookPayload
  const record = payload.record ? normalizeRecord(payload.record) : null
  const oldRecord = payload.old_record ? normalizeRecord(payload.old_record) : null

  if (!record || payload.type === 'DELETE') {
    return new Response(JSON.stringify({ success: true, skipped: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const isEmployer = isEmployerRecord(record)
  const userName = isEmployer ? record.contact_person ?? '' : record.full_name ?? ''
  const userEmail = record.email ?? ''

  if (!userEmail) {
    return new Response(JSON.stringify({ success: true, skipped: true, reason: 'Missing recipient email.' }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let shouldSendUserEmail = false
  let shouldSendAdminEmail = false
  let userSubject = ''
  let userHtml = ''
  let adminSubject = ''
  let adminHtml = ''

  if (isEmployer) {
    if (payload.type !== 'INSERT') {
      return new Response(JSON.stringify({ success: true, skipped: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    shouldSendUserEmail = true
    shouldSendAdminEmail = true

    userSubject = 'Inquiry Received: Partnership with Tattva Network'
    userHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #008080; margin: 0; font-size: 28px; letter-spacing: -0.5px;">Tattva</h1>
          <p style="color: #666; margin-top: 5px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Institutional Partnerships</p>
        </div>

        <h2 style="color: #2d3748; font-size: 20px; font-weight: 600;">Dear ${userName},</h2>

        <p style="color: #4a5568; line-height: 1.6; font-size: 16px;">
          Thank you for reaching out to Tattva Network regarding a partnership for <strong>${record.institution_name ?? ''}</strong>. We have successfully received your inquiry.
        </p>

        <div style="background-color: #f0fff4; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #c6f6d5;">
          <h3 style="color: #2f855a; margin: 0 0 10px 0; font-size: 18px;">Next Steps</h3>
          <p style="color: #4a5568; margin: 0; font-size: 15px; line-height: 1.5;">
            Our institutional partnership team is reviewing your requirements for <strong>${record.roles_needed ?? 'your requested roles'}</strong>. A dedicated partnerships manager will contact you via WhatsApp or Email within the next 24 business hours to discuss the next steps.
          </p>
        </div>

        <p style="color: #4a5568; line-height: 1.6; font-size: 16px;">
          At Tattva, we are committed to bringing the top 1% of global experts to your institution. We look forward to helping you shape the future of education together.
        </p>

        <div style="margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px;">
          <p style="color: #718096; font-size: 14px; margin: 0;">Best regards,</p>
          <p style="color: #2d3748; font-weight: 600; font-size: 15px; margin: 5px 0 0 0;">Tattva Partnerships Team</p>
        </div>
      </div>
    `

    adminSubject = `New Inquiry: ${record.institution_name ?? 'Institution'} - ${record.contact_person ?? 'Contact'}`
    adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333;">New Institutional Inquiry Received</h2>
        <p>Details from the Tattva Website:</p>
        <table style="width: 100%; border-collapse: collapse; text-align: left; margin-top: 20px;">
          <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9; width: 35%;">Institution</th><td style="padding: 10px; border: 1px solid #ccc;">${record.institution_name ?? 'N/A'}</td></tr>
          <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Contact Person</th><td style="padding: 10px; border: 1px solid #ccc;">${record.contact_person ?? 'N/A'}</td></tr>
          <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Email</th><td style="padding: 10px; border: 1px solid #ccc;"><a href="mailto:${record.email ?? ''}">${record.email ?? 'N/A'}</a></td></tr>
          <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Phone</th><td style="padding: 10px; border: 1px solid #ccc;">${record.phone ?? 'N/A'}</td></tr>
          <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Roles Needed</th><td style="padding: 10px; border: 1px solid #ccc;">${record.roles_needed ?? 'N/A'}</td></tr>
          <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Message</th><td style="padding: 10px; border: 1px solid #ccc;">${record.message ?? 'N/A'}</td></tr>
        </table>
        <p style="font-size: 12px; color: #777; margin-top: 30px;">Sent securely via Tattva Edge Functions.</p>
      </div>
    `
  } else {
    const currentStage = detectApplicantStage(record)
    const previousStage = oldRecord ? detectApplicantStage(oldRecord) : null
    const interviewDateLabel = formatInterviewDate(record.scheduled_at ?? record.interview_date)

    if (payload.type === 'INSERT') {
      shouldSendUserEmail = currentStage === 'application_received'
      shouldSendAdminEmail = true
    } else if (payload.type === 'UPDATE' && currentStage !== previousStage) {
      shouldSendUserEmail = currentStage === 'payment_received' || currentStage === 'interview_confirmed'
      shouldSendAdminEmail = currentStage === 'payment_received'
    }

    if (!shouldSendUserEmail && !shouldSendAdminEmail) {
      return new Response(JSON.stringify({ success: true, skipped: true, stage: currentStage }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (currentStage === 'application_received') {
      userSubject = 'Application Received: Complete Your Interview Booking - Tattva Network'
      userHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #008080; margin: 0; font-size: 28px; letter-spacing: -0.5px;">Tattva</h1>
            <p style="color: #666; margin-top: 5px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Network of Excellence</p>
          </div>

          <h2 style="color: #2d3748; font-size: 20px; font-weight: 600;">Dear ${userName},</h2>

          <p style="color: #4a5568; line-height: 1.6; font-size: 16px;">
            Thank you for applying for the <strong>${record.role ?? 'educator'}</strong> position at Tattva. Your application has been successfully received.
          </p>

          <div style="background-color: #fffaf0; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #fbd38d;">
            <h3 style="color: #c05621; margin: 0 0 10px 0; font-size: 18px;">Next Steps</h3>
            <p style="color: #4a5568; margin: 0; font-size: 15px; line-height: 1.5;">
              Please complete your interview booking through Calendly and then upload your payment proof on the website. Your interview slot will remain provisional until our team verifies the payment manually.
            </p>
          </div>

          <p style="color: #4a5568; line-height: 1.6; font-size: 16px;">
            Once your payment is verified, we will send a separate confirmation email for the final interview slot.
          </p>

          <div style="margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px;">
            <p style="color: #718096; font-size: 14px; margin: 0;">Warm regards,</p>
            <p style="color: #2d3748; font-weight: 600; font-size: 15px; margin: 5px 0 0 0;">Tattva Recruitment Team</p>
          </div>
        </div>
      `

      adminSubject = `New Application: ${record.full_name ?? 'Applicant'} - ${record.role ?? 'Role not provided'}`
    }

    if (currentStage === 'payment_received') {
      userSubject = 'Payment Received: Interview Slot Under Review - Tattva Network'
      userHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #008080; margin: 0; font-size: 28px; letter-spacing: -0.5px;">Tattva</h1>
            <p style="color: #666; margin-top: 5px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Manual Verification in Progress</p>
          </div>

          <h2 style="color: #2d3748; font-size: 20px; font-weight: 600;">Dear ${userName},</h2>

          <p style="color: #4a5568; line-height: 1.6; font-size: 16px;">
            We have received your payment proof for the <strong>${record.role ?? 'educator'}</strong> application.
          </p>

          <div style="background-color: #fffaf0; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #fbd38d;">
            <h3 style="color: #c05621; margin: 0 0 10px 0; font-size: 18px;">Current Status</h3>
            <p style="color: #4a5568; margin: 0; font-size: 15px; line-height: 1.5;">
              Your interview slot is still <strong>provisional</strong> while our team manually verifies the payment details.
              ${interviewDateLabel ? `<br/><br/>Booked interview slot: <strong>${interviewDateLabel}</strong>` : ''}
            </p>
          </div>

          <p style="color: #4a5568; line-height: 1.6; font-size: 16px;">
            Once the verification is complete on our side, you will receive a separate confirmation email with your final interview confirmation.
          </p>

          <div style="margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px;">
            <p style="color: #718096; font-size: 14px; margin: 0;">Warm regards,</p>
            <p style="color: #2d3748; font-weight: 600; font-size: 15px; margin: 5px 0 0 0;">Tattva Recruitment Team</p>
          </div>
        </div>
      `

      adminSubject = `Payment Submitted: ${record.full_name ?? 'Applicant'} - ${record.role ?? 'Role not provided'}`
    }

    if (currentStage === 'interview_confirmed') {
      userSubject = 'Interview Slot Confirmed - Tattva Network'
      userHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #008080; margin: 0; font-size: 28px; letter-spacing: -0.5px;">Tattva</h1>
            <p style="color: #666; margin-top: 5px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Interview Confirmation</p>
          </div>

          <h2 style="color: #2d3748; font-size: 20px; font-weight: 600;">Dear ${userName},</h2>

          <p style="color: #4a5568; line-height: 1.6; font-size: 16px;">
            Your payment has been verified successfully and your interview slot for the <strong>${record.role ?? 'educator'}</strong> application is now confirmed.
          </p>

          <div style="background-color: #f0fff4; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #c6f6d5;">
            <h3 style="color: #2f855a; margin: 0 0 10px 0; font-size: 18px;">Confirmed Slot</h3>
            <p style="color: #4a5568; margin: 0; font-size: 15px; line-height: 1.5;">
              ${interviewDateLabel ? `<strong>${interviewDateLabel}</strong>` : 'Your interview application has been approved. Our team will share the exact scheduling details with you directly.'}
            </p>
          </div>

          <p style="color: #4a5568; line-height: 1.6; font-size: 16px;">
            Please keep an eye on your email and WhatsApp for any final instructions from our team.
          </p>

          <div style="margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px;">
            <p style="color: #718096; font-size: 14px; margin: 0;">Warm regards,</p>
            <p style="color: #2d3748; font-weight: 600; font-size: 15px; margin: 5px 0 0 0;">Tattva Recruitment Team</p>
          </div>
        </div>
      `
    }

    if (shouldSendAdminEmail) {
      adminHtml = `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333;">${currentStage === 'payment_received' ? 'Payment Proof Submitted' : 'New Job Application Received'}</h2>
          <p>Details from the Tattva Website:</p>
          <table style="width: 100%; border-collapse: collapse; text-align: left; margin-top: 20px;">
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9; width: 35%;">Name</th><td style="padding: 10px; border: 1px solid #ccc;">${record.full_name ?? 'N/A'}</td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Email</th><td style="padding: 10px; border: 1px solid #ccc;"><a href="mailto:${record.email ?? ''}">${record.email ?? 'N/A'}</a></td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Phone</th><td style="padding: 10px; border: 1px solid #ccc;">${record.phone ?? 'N/A'}</td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Role</th><td style="padding: 10px; border: 1px solid #ccc;">${record.role === 'Subject Teacher' ? `Subject Teacher (${record.subject ?? 'No subject specified'})` : (record.role ?? 'N/A')}</td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Application Status</th><td style="padding: 10px; border: 1px solid #ccc;">${record.application_status ?? 'application_submitted'}</td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Slot Status</th><td style="padding: 10px; border: 1px solid #ccc;">${record.slot_status ?? 'not_scheduled'}</td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Payment Status</th><td style="padding: 10px; border: 1px solid #ccc;">${record.payment_status ?? 'not_submitted'}</td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Interview Slot</th><td style="padding: 10px; border: 1px solid #ccc;">${interviewDateLabel ?? 'Pending Calendly sync'}</td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">UTR Number</th><td style="padding: 10px; border: 1px solid #ccc;">${record.utr_number ?? 'N/A'}</td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Resume</th><td style="padding: 10px; border: 1px solid #ccc;">${record.resume_url ? `<a href="${record.resume_url}" target="_blank" style="display: inline-block; padding: 8px 12px; background-color: #008080; color: white; text-decoration: none; border-radius: 4px;">View Resume</a>` : 'Not available'}</td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Payment Screenshot</th><td style="padding: 10px; border: 1px solid #ccc;">${record.payment_screenshot_url ? `<a href="${record.payment_screenshot_url}" target="_blank" style="display: inline-block; padding: 8px 12px; background-color: #008080; color: white; text-decoration: none; border-radius: 4px;">View Screenshot</a>` : 'Not submitted yet'}</td></tr>
          </table>
          <p style="font-size: 12px; color: #777; margin-top: 30px;">Sent securely via Tattva Edge Functions.</p>
        </div>
      `
    }
  }

  const emailRequests: Promise<void>[] = []

  if (shouldSendUserEmail) {
    emailRequests.push(sendEmail({
      from: 'Tattva Network <hiring@tattva-ai.in>',
      to: [userEmail],
      subject: userSubject,
      html: userHtml + `
        <div style="text-align: center; margin-top: 20px;">
          <p style="font-family: sans-serif; font-size: 12px; color: #a0aec0;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `,
    }))
  }

  if (shouldSendAdminEmail) {
    emailRequests.push(sendEmail({
      from: 'Tattva System <hiring@tattva-ai.in>',
      to: ['buildwithtattva@gmail.com'],
      cc: ['sudha.vamsi1965@gmail.com'],
      subject: adminSubject,
      html: adminHtml,
    }))
  }

  await Promise.all(emailRequests)

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
