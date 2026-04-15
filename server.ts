import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending enquiry emails
  app.post('/api/send-enquiry', async (req, res) => {
    const { name, mobile, email, message } = req.body;

    if (!name || !mobile || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Configure your SMTP transporter
      // For Gmail: Use an App Password (https://myaccount.google.com/apppasswords)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE === 'true' || true,
        auth: {
          user: process.env.SMTP_USER, // Your email
          pass: process.env.SMTP_PASS, // Your app password
        },
      });

      const mailOptions = {
        from: `"Adinath Motors CRM" <${process.env.SMTP_USER}>`,
        to: process.env.RECIPIENT_EMAIL || 'motorsadinath@gmail.com',
        subject: `New Enquiry from ${name}`,
        text: `
          New Enquiry Received:
          
          Name: ${name}
          Mobile: ${mobile}
          Email: ${email}
          Message: ${message}
          
          Date: ${new Date().toLocaleString()}
        `,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #dc2626;">New Enquiry Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Mobile:</strong> ${mobile}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
            <hr />
            <p style="font-size: 12px; color: #666;">Received on ${new Date().toLocaleString()}</p>
          </div>
        `,
      };

      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('SMTP credentials not configured. Email not sent.');
        return res.status(200).json({ 
          success: true, 
          message: 'Enquiry saved, but email notification skipped (SMTP not configured).' 
        });
      }

      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email notification' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
