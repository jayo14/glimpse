import logger from "../utils/logger.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.EMAIL_USER,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken: process.env.REFRESH_TOKEN,
//   },
// });

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  connectionTimeout: 10000,
});


export const sendVerificationEmail = async ({ email, verificationLink }) => {
  await transporter.sendMail({
    from: `"Glimpse" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Glimpse account",

    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2>Welcome to Glimpse</h2>

        <p>
          Click the button below to verify your email address.
        </p>

        <a
          href="${verificationLink}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: black;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin-top: 20px;
          "
        >
          Verify Email
        </a>

        <p style="margin-top: 32px; color: #666;">
          If you didn’t create this account, ignore this email.
        </p>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async ({ email, resetLink }) => {
  await transporter.sendMail({
    from: `"Glimpse" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your Glimpse account password",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password. Click the button below to choose a new one:</p>
        <a
          href="${resetLink}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #dc3545;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin-top: 20px;
          "
        >
          Reset Password
        </a>
        <p style="margin-top: 32px; color: #666;">
          If you did not request this, you can safely ignore this email. This link will expire shortly.
        </p>
      </div>
    `,
  });
};

transporter.verify((error, success) => {
  if (error) {
    logger.error(`Nodemailer setup error: ${error.message}`);
  } else {
    logger.info("Nodemailer connected successfully.");
  }
});