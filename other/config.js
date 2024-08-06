const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'http://localhost:3000',
  service: 'gmail',
  port: 587,
  secure: true, 
  auth: {
    user: 'phuclv272@gmail.com', // Thay bằng tài khoản email của bạn
    pass: 'dbcohuhjukbqbtox' // Thay bằng mật khẩu của tài khoản email
  }
});

module.exports = { transporter };
