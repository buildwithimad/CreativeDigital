import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
      })
    }

    await resend.emails.send({
      from: 'Creativedigital <onboarding@resend.dev>', // or your verified domain later
      to: 'creativemarkimad@gmail.com', // ← change this to your receiving email
      subject: subject || `New message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Message</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background-color: #000000;
              color: #ffffff;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #000000;
            }
            .header {
              background-color: #000000;
              padding: 40px 30px;
              text-align: center;
              border-bottom: 2px solid #6EFF33;
            }
            .header h1 {
              color: #6EFF33;
              font-size: 32px;
              font-weight: bold;
              margin: 0;
              font-family: Arial, sans-serif;
            }
            .content {
              background-color: #ffffff;
              padding: 40px 30px;
            }
            .field {
              margin-bottom: 20px;
              border-bottom: 1px solid #e5e5e5;
              padding-bottom: 10px;
            }
            .field-label {
              color: #000000;
              font-size: 14px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 5px;
              display: block;
            }
            .field-value {
              color: #333333;
              font-size: 16px;
              line-height: 1.5;
              margin: 0;
            }
            .message-field {
              border-bottom: 1px solid #e5e5e5;
              padding-bottom: 20px;
            }
            .message-content {
              color: #333333;
              font-size: 16px;
              line-height: 1.6;
              white-space: pre-wrap;
            }
            .footer {
              background-color: #000000;
              padding: 30px;
              text-align: center;
              color: #cccccc;
              font-size: 14px;
            }
            .accent {
              color: #6EFF33;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Message</h1>
            </div>

            <div class="content">
              <div class="field">
                <span class="field-label">Name</span>
                <p class="field-value">${name}</p>
              </div>

              <div class="field">
                <span class="field-label">Email</span>
                <p class="field-value">${email}</p>
              </div>

              ${subject ? `
              <div class="field">
                <span class="field-label">Subject</span>
                <p class="field-value">${subject}</p>
              </div>
              ` : ''}

              <div class="field message-field">
                <span class="field-label">Message</span>
                <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>

            <div class="footer">
              <p>This message was sent from the <span class="accent">Creativedigital</span> contact form</p>
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
