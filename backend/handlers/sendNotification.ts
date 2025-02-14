const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

const sendNotification = async (to, subject, message) => {
  try {
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to,
      subject,
      text: message,
    });
    console.log("Notification sent!");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

module.exports = { sendNotification };
