import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/email
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { to, subject, html, from = 'Car Rental <noreply@carrental.com>' } = data;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, or html' },
        { status: 400 }
      );
    }

    const { data: email, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(email);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 