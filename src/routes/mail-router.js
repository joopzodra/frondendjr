let express = require('express');
let postlist = require('../views/posts/postlist');
let nodemailer = require('nodemailer');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
const Entities = require('html-entities').AllHtmlEntities; 
const entities = new Entities();

let mail = express.Router();
mail.use(bodyParser.json());
mail.use(bodyParser.urlencoded({
  extended: false
}));
mail.use(expressValidator());

mail.post('', (req, res) => {

  req.checkBody('email', 'vul een geldig e-mailadres in').isEmail();

  req.sanitize('name').escape();
  req.sanitize('name').trim();
  req.sanitize('email').escape();
  req.sanitize('message').escape();
  req.sanitize('message').trim();

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: 'codesketches@gmail.com',
      clientId: '874059555584-69rvi5rrv3n25jh39nb18pujfvvrcl8b.apps.googleusercontent.com',
      clientSecret: 'RUxeBi_yWF5TVknhibyzszHr',
      refreshToken: '1/rR1Jr7CRd25rllRk1Q_c1uaTfV-aVHiOq79YKezrVdU'
    }
  });

  let mailOptions = {
      from: 'codesketches@gmail.com',
      to: 'codesketches@gmail.com',
      replyTo: req.body.email,
      subject: 'Code Sketches formulier',
      text: 'Van: ' + req.body.name + '\n\nE-mail:\n\n' + req.body.email + '\n\nBericht:\n\n' + req.body.message , // plain text body
      html: '<p>Van: ' + req.body.name + '<br></p><p>E-mail: ' + req.body.email + '<br></p><p>Bericht:<br>' + req.body.message + '</p>' // html body
  };

  let errors = req.validationErrors();  

  if(!errors){
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.cookie('formdata', {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    res.redirect('/formconfirm');
  } 

  else { 
    res.render('home', { 
      data: postlist,
      errors: errors,
      formdata: {
        name: req.body.name,
        email: req.body.email,
        message: entities.decode(req.body.message)
      },
      anchor: 'contact'
    });
  }
  
});

module.exports = mail;
