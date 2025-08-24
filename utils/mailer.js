import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // You can change this to your preferred email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD // Use App Password for Gmail
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Email templates
const emailTemplates = {
  // Template for contact form emails
  contactEmail: (data) => ({
    subject: `Portfolio Contact: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; border-bottom: 3px solid #007bff; padding-bottom: 10px;">
            📧 New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 10px;">Contact Details:</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p style="margin: 8px 0;"><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; border-radius: 5px;">
              <p style="margin: 0; line-height: 1.6; color: #333;">${data.message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              📅 Received: ${new Date().toLocaleString()}<br>
              🌐 From: Portfolio Website Contact Form
            </p>
          </div>
          
          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${data.email}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reply to ${data.name}
            </a>
          </div>
        </div>
      </div>
    `
  }),

  // Template for feedback emails
  feedbackEmail: (data) => ({
    subject: `Portfolio Feedback from ${data.name || 'Anonymous'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; border-bottom: 3px solid #28a745; padding-bottom: 10px;">
            💬 New Feedback Received
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 10px;">Feedback Details:</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${data.name || 'Anonymous'}</p>
            ${data.rating ? `<p style="margin: 8px 0;"><strong>Rating:</strong> ${'⭐'.repeat(data.rating)} (${data.rating}/5)</p>` : ''}
            ${data.category ? `<p style="margin: 8px 0;"><strong>Category:</strong> ${data.category.charAt(0).toUpperCase() + data.category.slice(1)}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #28a745; border-radius: 5px;">
              <p style="margin: 0; line-height: 1.6; color: #333;">${data.message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              📅 Received: ${new Date().toLocaleString()}<br>
              🌐 From: Portfolio Website Feedback Form
            </p>
          </div>
        </div>
      </div>
    `
  }),

  // Confirmation email for contact form sender
  contactConfirmation: (data) => ({
    subject: 'Thank you for contacting me!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; border-bottom: 3px solid #007bff; padding-bottom: 10px;">
            ✨ Thank You for Reaching Out!
          </h2>
          
          <p style="color: #555; line-height: 1.6;">Hi ${data.name},</p>
          
          <p style="color: #555; line-height: 1.6;">
            Thank you for contacting me through my portfolio website. I have received your message about 
            "<strong>${data.subject}</strong>" and I appreciate you taking the time to reach out.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
            <p style="margin: 0; color: #555;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            I'll get back to you as soon as possible, usually within 24-48 hours. If your message is urgent, 
            feel free to reach out to me directly at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>.
          </p>
          
          <p style="color: #555; line-height: 1.6;">
            Best regards,<br>
            <strong>Your Name</strong>
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px; margin: 0; text-align: center;">
              This is an automated response from my portfolio website.
            </p>
          </div>
        </div>
      </div>
    `
  })
};

// Main email sending functions
export const sendContactEmail = async (contactData) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error('Email configuration is missing. Please set EMAIL_USER and EMAIL_PASSWORD in your .env file.');
    }

    const transporter = createTransporter();
    
    // Verify transporter
    await transporter.verify();
    
    const template = emailTemplates.contactEmail(contactData);
    
    // Send email to yourself
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: contactData.email,
      subject: template.subject,
      html: template.html
    };

    const result = await transporter.sendMail(mailOptions);
    
    // Optionally send confirmation email to the sender
    if (process.env.SEND_CONFIRMATION === 'true') {
      const confirmationTemplate = emailTemplates.contactConfirmation(contactData);
      await transporter.sendMail({
        from: `"Portfolio" <${process.env.EMAIL_USER}>`,
        to: contactData.email,
        subject: confirmationTemplate.subject,
        html: confirmationTemplate.html
      });
    }
    
    return {
      success: true,
      messageId: result.messageId,
      message: 'Contact email sent successfully'
    };
    
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to send contact email'
    };
  }
};

export const sendFeedbackEmail = async (feedbackData) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error('Email configuration is missing. Please set EMAIL_USER and EMAIL_PASSWORD in your .env file.');
    }

    const transporter = createTransporter();
    
    // Verify transporter
    await transporter.verify();
    
    const template = emailTemplates.feedbackEmail(feedbackData);
    
    const mailOptions = {
      from: `"Portfolio Feedback" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: template.subject,
      html: template.html
    };

    const result = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: result.messageId,
      message: 'Feedback email sent successfully'
    };
    
  } catch (error) {
    console.error('Feedback email sending error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to send feedback email'
    };
  }
};

// Test email function
export const sendTestEmail = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    
    const testMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Portfolio Email Test',
      html: `
        <h2>✅ Email Configuration Test</h2>
        <p>If you received this email, your email configuration is working correctly!</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    const result = await transporter.sendMail(testMailOptions);
    
    return {
      success: true,
      messageId: result.messageId,
      message: 'Test email sent successfully'
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Test email failed'
    };
  }
};