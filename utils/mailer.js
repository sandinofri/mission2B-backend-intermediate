import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'example@gmail.com',
    pass: 'password', 
  },
});

export const sendVerificationEmail = async (toEmail, token) => {
  const verificationLink = `http://localhost:3000/verify?token=${token}`;

  const mailOptions = {
    from: '"My App" <example@gmail.com>',
    to: toEmail,
    subject: 'Verifikasi Akun Anda',
    html: `
      <h3>Verifikasi Akun</h3>
      <p>Klik link berikut untuk memverifikasi akun Anda:</p>
      <a href="${verificationLink}">Verifikasi Sekarang</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};
