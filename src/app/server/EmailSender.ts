'use server';
import nodemailer from 'nodemailer';

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail({ name, email, message }: ContactFormData) {
  if (!SMTP_USER || !SMTP_PASS || !RECEIVER_EMAIL) {
    throw new Error("Missing SMTP credentials");
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: RECEIVER_EMAIL,
    subject: `📩 New Contact Form Message from ${name}`,
    // Plain text fallback
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    // HTML formatted email
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2F2F2F;">📩 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 10px; background: #f5f5f5; border-radius: 5px; border-left: 4px solid #00B4D8;">
          ${message.replace(/\n/g, "<br />")}
        </div>
        <hr style="margin: 20px 0;" />
        <p style="font-size: 12px; color: #888;">Sent via your Next.js contact form</p>
      </div>
      <div>
        Built with NextJs + Nodemailer! Chris, 2025!
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Failed to send email:', err);
    throw new Error('Email sending failed');
  }
}
