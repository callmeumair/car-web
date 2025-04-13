import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email templates for different scenarios
const emailTemplates = {
  bookingConfirmation: (data: any) => `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #3498db, #2c3e50); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🚗 Your Car Rental Confirmation</h1>
      </div>
      <div style="padding: 30px; background-color: white; border-radius: 0 0 10px 10px;">
        <p style="color: #34495e; font-size: 18px; margin-bottom: 20px;">Hello ${data.customerName},</p>
        <p style="color: #34495e; font-size: 16px; margin-bottom: 20px;">Your booking for the <strong style="color: #3498db;">${data.carName}</strong> has been confirmed!</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3498db;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
            <div style="flex: 1;">
              <p style="margin: 5px 0; color: #7f8c8d;"><strong>📅 Pickup Date</strong></p>
              <p style="margin: 5px 0; color: #2c3e50; font-size: 18px;">${data.pickupDate}</p>
            </div>
            <div style="flex: 1;">
              <p style="margin: 5px 0; color: #7f8c8d;"><strong>📅 Return Date</strong></p>
              <p style="margin: 5px 0; color: #2c3e50; font-size: 18px;">${data.returnDate}</p>
            </div>
          </div>
          <div style="text-align: center; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
            <p style="margin: 5px 0; color: #7f8c8d;"><strong>💰 Total Amount</strong></p>
            <p style="margin: 5px 0; color: #2c3e50; font-size: 24px; font-weight: bold;">$${data.totalAmount}</p>
          </div>
        </div>

        <p style="color: #34495e; font-size: 16px; margin-bottom: 20px;">We're excited to have you on board! If you have any questions, feel free to reply to this email.</p>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${data.bookingLink}" style="background-color: #3498db; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">View Booking Details</a>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #7f8c8d; font-size: 14px; text-align: center;">Need help? Contact our support team at support@carrental.com</p>
        </div>
      </div>
    </div>
  `,
  welcome: (data: any) => `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #2ecc71, #27ae60); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🌟 Welcome to Car Rental!</h1>
      </div>
      <div style="padding: 30px; background-color: white; border-radius: 0 0 10px 10px;">
        <p style="color: #34495e; font-size: 18px; margin-bottom: 20px;">Hello ${data.name},</p>
        <p style="color: #34495e; font-size: 16px; margin-bottom: 20px;">We're thrilled to have you join our car rental family! Here's what you can do with your new account:</p>
        
        <div style="margin: 20px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
            <span style="font-size: 24px; margin-right: 15px;">🚗</span>
            <span style="color: #34495e;">Browse our extensive fleet of vehicles</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
            <span style="font-size: 24px; margin-right: 15px;">📅</span>
            <span style="color: #34495e;">Make quick and easy bookings</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
            <span style="font-size: 24px; margin-right: 15px;">📱</span>
            <span style="color: #34495e;">Manage your reservations</span>
          </div>
          <div style="display: flex; align-items: center; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
            <span style="font-size: 24px; margin-right: 15px;">🎁</span>
            <span style="color: #34495e;">Earn rewards points</span>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${data.dashboardLink}" style="background-color: #2ecc71; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Start Exploring</a>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #7f8c8d; font-size: 14px; text-align: center;">Get 10% off your first rental with code: WELCOME10</p>
        </div>
      </div>
    </div>
  `,
  reminder: (data: any) => `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #e74c3c, #c0392b); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">⏰ Upcoming Rental Reminder</h1>
      </div>
      <div style="padding: 30px; background-color: white; border-radius: 0 0 10px 10px;">
        <p style="color: #34495e; font-size: 18px; margin-bottom: 20px;">Hello ${data.customerName},</p>
        <p style="color: #34495e; font-size: 16px; margin-bottom: 20px;">This is a friendly reminder about your upcoming rental:</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #e74c3c;">
          <div style="margin-bottom: 15px;">
            <p style="margin: 5px 0; color: #7f8c8d;"><strong>🚗 Vehicle</strong></p>
            <p style="margin: 5px 0; color: #2c3e50; font-size: 18px;">${data.carName}</p>
          </div>
          <div style="margin-bottom: 15px;">
            <p style="margin: 5px 0; color: #7f8c8d;"><strong>📅 Pickup Date</strong></p>
            <p style="margin: 5px 0; color: #2c3e50; font-size: 18px;">${data.pickupDate}</p>
          </div>
          <div>
            <p style="margin: 5px 0; color: #7f8c8d;"><strong>📍 Location</strong></p>
            <p style="margin: 5px 0; color: #2c3e50; font-size: 18px;">${data.pickupLocation}</p>
          </div>
        </div>

        <div style="background-color: #fef5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="color: #e74c3c; font-size: 16px; margin: 0;">⚠️ Don't forget to bring your driver's license and payment method!</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #7f8c8d; font-size: 14px; text-align: center;">Need to modify your booking? Contact us at support@carrental.com</p>
        </div>
      </div>
    </div>
  `
};

// POST /api/email
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { to, subject, template, templateData, html, from = 'Car Rental <noreply@carrental.com>' } = data;

    // Validate required fields
    if (!to) {
      return NextResponse.json(
        { error: 'Missing required field: to (recipient email)' },
        { status: 400 }
      );
    }

    // If using a template, validate template name and data
    if (template) {
      if (!emailTemplates[template as keyof typeof emailTemplates]) {
        return NextResponse.json(
          { error: 'Invalid template name. Available templates: bookingConfirmation, welcome, reminder' },
          { status: 400 }
        );
      }
      if (!templateData) {
        return NextResponse.json(
          { error: 'Template data is required when using a template' },
          { status: 400 }
        );
      }
    }

    // Generate HTML content
    let emailHtml = html;
    if (template) {
      emailHtml = emailTemplates[template as keyof typeof emailTemplates](templateData);
    }

    if (!emailHtml) {
      return NextResponse.json(
        { error: 'Either html content or a valid template must be provided' },
        { status: 400 }
      );
    }

    const { data: email, error } = await resend.emails.send({
      from,
      to,
      subject: subject || 'Message from Car Rental',
      html: emailHtml,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      emailId: email?.id
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
} 