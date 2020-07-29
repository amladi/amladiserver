var nodemailer = require("nodemailer");

module.exports = class email {
  async send(setting, userInfo) {
    var transporter = nodemailer.createTransport({
      host : setting.host,
      port : setting.port,
      auth: {
        user: setting.userAuth,
        pass: setting.passAuth,
      },
    });

    var mailOptions = {
      from: setting.from,
      to: userInfo.email,
      subject: setting.subject,
      text: `<h1>Hi ${userInfo.name}</h1><p>This is for you: ${userInfo.password}</p>$`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
};
