import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendResetEmail = async (to, token) => {
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: "Reset your password",
    html: `
      <h3>Password Reset Request</h3>
      <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
      <p>This link is valid for 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
