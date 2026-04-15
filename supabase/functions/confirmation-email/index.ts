import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  const { record } = await req.json()

  // 1. Professional Email to the Candidate
  const candidateEmail = fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Tattva Network <hiring@tattva-ai.in>',
      to: [record.email],
      subject: 'Action Required: Complete your Application - Tattva Network',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #008080; margin: 0; font-size: 28px; letter-spacing: -0.5px;">Tattva</h1>
            <p style="color: #666; margin-top: 5px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Network of Excellence</p>
          </div>
          
          <h2 style="color: #2d3748; font-size: 20px; font-weight: 600;">Dear ${record.full_name},</h2>
          
          <p style="color: #4a5568; line-height: 1.6; font-size: 16px;">
            Thank you for applying for the <strong>${record.role}</strong> position at Tattva. Your application has been successfully received.
          </p>
          
          <div style="background-color: #fffaf0; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #fbd38d;">
            <h3 style="color: #c05621; margin: 0 0 10px 0; font-size: 18px;">⚠️ Next Step: Interview Confirmation</h3>
            <p style="color: #4a5568; margin: 0; font-size: 15px; line-height: 1.5;">
              If you have already scheduled your slot via Calendly, please note that it is currently <strong>PROVISIONAL</strong>. 
              <br/><br/>
              To confirm your interview, you must complete the <strong>₹250 verification fee</strong> as instructed on our website. Unpaid slots will be automatically cancelled after 24 hours.
            </p>
          </div>

          <p style="color: #4a5568; line-height: 1.6; font-size: 16px;">
            If you missed the scheduling or payment page, please follow the instructions on our website to finalize your spot. Once your payment is verified by our team, you will receive a <strong>final confirmation</strong> via WhatsApp and Email.
          </p>
          
          <div style="margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px;">
            <p style="color: #718096; font-size: 14px; margin: 0;">Warm regards,</p>
            <p style="color: #2d3748; font-weight: 600; font-size: 15px; margin: 5px 0 0 0;">Tattva Recruitment Team</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <p style="font-family: sans-serif; font-size: 12px; color: #a0aec0;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `,
    }),
  })

  // 2. Notification Email to the Admin
  const roleName = record.role === 'Subject Teacher' ? `Subject Teacher (${record.subject})` : record.role;
  const adminEmail = fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Tattva System <hiring@tattva-ai.in>',
      to: ['buildwithtattva@gmail.com'],
      cc: ['sudha.vamsi1965@gmail.com'],
      subject: `New Application: ${record.full_name} - ${record.role}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333;">New Job Application Received</h2>
          <p>Someone just applied via the Tattva Website hiring form. Here are their details:</p>
          <table style="width: 100%; border-collapse: collapse; text-align: left; margin-top: 20px;">
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9; width: 35%;">Name</th><td style="padding: 10px; border: 1px solid #ccc;">${record.full_name}</td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Email</th><td style="padding: 10px; border: 1px solid #ccc;"><a href="mailto:${record.email}">${record.email}</a></td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Phone</th><td style="padding: 10px; border: 1px solid #ccc;">${record.phone}</td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Role</th><td style="padding: 10px; border: 1px solid #ccc;">${roleName}</td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Requested Date</th><td style="padding: 10px; border: 1px solid #ccc;">${new Date(record.interview_date).toLocaleString()}</td></tr>
            <tr><th style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">Resume</th><td style="padding: 10px; border: 1px solid #ccc;"><a href="${record.resume_url}" target="_blank" style="display: inline-block; padding: 8px 12px; background-color: #008080; color: white; text-decoration: none; border-radius: 4px;">View Resume</a></td></tr>
          </table>
          <p style="font-size: 12px; color: #777; margin-top: 30px;">Sent securely via Tattva Edge Functions.</p>
        </div>
      `,
    }),
  })

  // Wait for both emails to be sent
  await Promise.all([candidateEmail, adminEmail])

  return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } })
})
