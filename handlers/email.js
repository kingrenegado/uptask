const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user, // generated ethereal user
      pass: emailConfig.pass, // generated ethereal password
    },
});

let mailoptions = {
    from: 'Uptask <no-reply@uptask.com>', // sender address
    to: "correo@correo.com", // list of receivers
    subject: "Passowrd Reset", // Subject line
    text: "Hola", // plain text body
    html: "<b>hola</b>", // html body
};

transport.sendMail(mailoptions);
