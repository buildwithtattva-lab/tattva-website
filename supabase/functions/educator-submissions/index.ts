import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

const jsonResponse = (payload: any, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  })

const requireString = (value: any, fieldName: string): string => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${fieldName} is required.`)
  }
  return value.trim()
}

async function sendEmail(to: string, subject: string, html: string) {
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  if (!RESEND_API_KEY || !RESEND_API_KEY.startsWith('re_')) {
    console.warn('RESEND_API_KEY is missing or invalid. Skipping email.')
    return
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Tattva <onboarding@resend.dev>',
        to: [to],
        subject: subject,
        html: html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend API error:', err)
    }
  } catch (e) {
    console.error('Email fetch error:', e)
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const action = requireString(body.action, 'action')

    if (action === 'submit_application') {
      const applicant = body.applicant ?? {}
      const fullName = requireString(applicant.fullName, 'fullName')
      const email = requireString(applicant.email, 'email')
      const phone = requireString(applicant.phone, 'phone')
      const role = requireString(applicant.role, 'role')
      const resumeUrl = requireString(applicant.resumeUrl, 'resumeUrl')
      const subject = typeof applicant.subject === 'string' && applicant.subject.trim()
        ? applicant.subject.trim()
        : null

      const { data, error } = await supabaseAdmin
        .from('applicants')
        .insert([{
          full_name: fullName,
          email,
          phone,
          role,
          subject: role === 'Subject Teacher' ? subject : null,
          interview_date: null,
          resume_url: resumeUrl,
          application_status: 'application_submitted',
          slot_status: 'not_scheduled',
          payment_status: 'not_submitted',
        }])
        .select('id, submission_token')
        .single()

      if (error) throw error

      return jsonResponse({
        applicantId: data.id,
        submissionToken: data.submission_token,
      })
    }

    if (action === 'update_slot') {
      const applicantId = requireString(body.applicantId, 'applicantId')
      const submissionToken = requireString(body.submissionToken, 'submissionToken')
      const interviewDate = requireString(body.interviewDate, 'interviewDate')

      const { data, error } = await supabaseAdmin
        .from('applicants')
        .update({
          interview_date: interviewDate,
          slot_status: 'scheduled',
          application_status: 'slot_booked',
        })
        .eq('id', applicantId)
        .eq('submission_token', submissionToken)
        .select('id')
        .single()

      if (error || !data) {
        throw error ?? new Error('Could not find the applicant record for slot selection.')
      }

      return jsonResponse({ success: true })
    }

    if (action === 'submit_payment') {
      const applicantId = requireString(body.applicantId, 'applicantId')
      const submissionToken = requireString(body.submissionToken, 'submissionToken')
      const utrNumber = requireString(body.utrNumber, 'utrNumber')
      const paymentScreenshotUrl = requireString(body.paymentScreenshotUrl, 'paymentScreenshotUrl')

      // Get applicant details for the email
      const { data: applicant, error: fetchError } = await supabaseAdmin
        .from('applicants')
        .select('full_name, email, interview_date')
        .eq('id', applicantId)
        .single()

      if (fetchError || !applicant) {
        throw fetchError ?? new Error('Could not find applicant details.')
      }

      const { data, error } = await supabaseAdmin
        .from('applicants')
        .update({
          utr_number: utrNumber,
          payment_screenshot_url: paymentScreenshotUrl,
          payment_status: 'pending_verification',
          application_status: 'pending_verification',
          payment_submitted_at: new Date().toISOString(),
        })
        .eq('id', applicantId)
        .eq('submission_token', submissionToken)
        .select('id')
        .single()

      if (error || !data) {
        throw error ?? new Error('Could not find the applicant record for payment submission.')
      }

      // Send the acknowledgement email
      if (applicant.interview_date) {
        const dateObj = new Date(applicant.interview_date)
        const formattedDate = dateObj.toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })

        const emailHtml = `
          <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #002B2B;">Payment Proof Received</h2>
            <p>Hi ${applicant.full_name},</p>
            <p>Thank you for submitting your payment proof for the Tattva Educator interview.</p>
            <p><strong>Our team will verify your payment details. Once verified, we will confirm your selected interview slot (${formattedDate}).</strong></p>
            <p>We appreciate your patience.</p>
            <p>Best regards,<br/>Team Tattva</p>
          </div>
        `

        await sendEmail(
          applicant.email,
          'Payment Proof Received - Tattva Interview',
          emailHtml
        )
      }

      return jsonResponse({ success: true })
    }

    return jsonResponse({ error: 'Unsupported action.' }, 400)
  } catch (error) {
    console.error('Function error:', error)
    return jsonResponse({
      error: error instanceof Error ? error.message : 'Unexpected error.',
    }, 400)
  }
})
