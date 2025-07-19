// src/app/server/EmailSender.ts
'use server';

import nodemailer from 'nodemailer';

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

export async function sendTestEmail() {
  if (!SMTP_USER || !SMTP_PASS || !RECEIVER_EMAIL) {
    console.error("Missing SMTP env vars");
    throw new Error("Missing SMTP credentials");
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Next.js Test" <${SMTP_USER}>`,
    to: RECEIVER_EMAIL,
    subject: '✅ Nodemailer Test Email from Next.js',
    text: 'Hello! This is a test email sent from a Next.js server action using Nodemailer.',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent:', info.response);
  } catch (err) {
    console.error('❌ Failed to send test email:', err);
    throw new Error('Email sending failed');
  }
}

