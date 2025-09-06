import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


// console.log("email from mailer.ts",process.env.EMAIL_USER)
// console.log("password from mailer.ts",process.env.APP_PASSWORD)
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection failed:", error);
  } else {
    console.log("SMTP server is ready to take messages ✅");
  }
});


export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Anuj" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error("sendMail error:", error);
    throw error;
  }
};


