import nodemailer from "nodemailer";
import { SMTP_PASS, SMTP_SERVICE, SMTP_USER } from "../configs/env";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  service: SMTP_SERVICE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const mailOptions = {
    from: `Cyber store <no-reply>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
};
