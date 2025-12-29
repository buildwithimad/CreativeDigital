import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { name, email, phone, company, subject, message } = await req.json()

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
      })
    }

    await resend.emails.send({
      from: 'Creativedigital <onboarding@resend.dev>',
      to: 'creativemarkimad@gmail.com',
      subject: subject || `New Inquiry from company: ${company}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Inquiry</title>
          <style>
            /* Reset & Base */
            body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #06091c; color: #ffffff; }
            a { color: #33b5e8; text-decoration: none; }
            
            /* Container */
            .wrapper { width: 100%; background-color: #06091c; padding: 40px 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #06091c; border: 1px solid #333; border-radius: 12px; overflow: hidden; }
            
            /* Header */
            .header { padding: 40px; background-color: #06091c; border-bottom: 1px solid #222; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 300; letter-spacing: -0.5px; color: #ffffff; }
            .header span { color: #33b5e8; }

            /* Content Fields */
            .content { padding: 40px; }
            .row { margin-bottom: 24px; }
            .label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #666; margin-bottom: 8px; font-weight: 600; }
            .value { font-size: 16px; color: #eeeeee; line-height: 1.5; font-weight: 400; }
            
            /* Message Box */
            .message-box { background-color: #06091c; padding: 2px; border-radius: 8px; margin-top: 30px; }
            .message-text { font-size: 15px; color: #ccc; line-height: 1.6; white-space: pre-wrap; }

            /* Footer */
            .footer { padding: 30px; text-align: center; border-top: 1px solid #222; background-color: #0a0a0a; }
            .footer p { margin: 0; font-size: 12px; color: #444; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              
              <div class="header">
                <h1>New Inquiry <span>.</span></h1>
              </div>

              <div class="content">
                
                <div class="row">
                  <span class="label">From</span>
                  <div class="value">${name}</div>
                </div>

                <div class="row">
                  <span class="label">Contact</span>
                  <div class="value">
                    <a href="mailto:${email}">${email}</a> <br>
                    <a href="tel:${phone}">${phone}</a>
                  </div>
                </div>

                <div class="row">
                  <span class="label">Company </span>
                  <div class="value">
                    ${company || 'General'}
                  </div>
                </div>

                <div class="row">
                  <span class="label">Message</span>
                  <div class="message-box">
                    <div class="message-text">${message.replace(/\n/g, '<br>')}</div>
                  </div>
                </div>

              </div>

              <div class="footer">
                <p>Sent via CreativeDigital Website</p>
              </div>

            </div>
          </div>
        </body>
        </html>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    })
  }
}