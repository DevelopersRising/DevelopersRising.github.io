var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'devsrising@gmail.com',
      pass: 'YOUR PASSWORD HERE'
    }
  });

  var sendMail = (userInfo,callback) => {
    var send = `Hi ${userInfo.name}, \n
  We recieved your Feedback :),
  Thanks for the feedback. :)
  Hope to see you soon.\n
  REGARDS,
  TEAM DevelopersRising`;
  
    var sendSelf = `Feedback from ${userInfo.name}, \n
  ${userInfo.feedback}`;
  
  
    var mailOptions = {
      from: 'DevelopersRising',
      to: userInfo.email,
      subject: 'Thanks For The Feedback',
      text: send
    };
    var selfMailOptions = {
      from: userInfo.email,
      to: 'devsrising@gmail.com',
      subject: `Feedback from ${userInfo.name}`,
      text: sendSelf
    };
  
    transporter.sendMail(selfMailOptions,(err,info) => {
      if(err){
        return callback(err);
      } else {
        // return callback(undefined,send);
        console.log(info.response);
      }
    });
    transporter.sendMail(mailOptions,(err,info) => {
      if(err){
        return callback(err);
      } else {
        return callback(undefined,send);
        console.log(info.response);
      }
    });
  };
  
  module.exports = {sendMail}