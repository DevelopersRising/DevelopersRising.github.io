const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'devsrising@gmail.com',
    pass: process.env.GMAILPASS
  }
});

var sendMail = (userInfo, callback) => {
  console.log(userInfo);
  var send = `Hi ${userInfo.name}, \n
We recieved your Feedback :),
Thanks for the feedback. :)
Hope to see you soon.\n
REGARDS,
TEAM DevelopersRising`;

  let sendSelf = `Feedback from ${userInfo.name}, \n
  ${userInfo.feedback}`;

  let mailOptions = {
    from: 'DevelopersRising',
    to: userInfo.email,
    subject: 'Thanks For The Feedback',
    text: send
  };
  let selfMailOptions = {
    from: userInfo.email,
    to: 'devsrising@gmail.com',
    subject: `Feedback from ${userInfo.name}`,
    text: sendSelf
  };

  transporter.sendMail(selfMailOptions, (err, info) => {
    if (err) {
      return callback(err);
    } else {
      return callback(undefined, send);
    }
  });
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return callback(err);
    } else {
      return callback(undefined, send);
    }
  });
};

module.exports = { sendMail };
