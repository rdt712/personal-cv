var path = require("path");
var express = require("express");
var request = require("request");
var fs = require('fs');
var logger = require("morgan");
var nodemailer = require("nodemailer");
var mg = require("nodemailer-mailgun-transport");
var bodyParser = require("body-parser");
var nconf = require("nconf");
var config = require("./config/config");

var app = express();
var projectRoot = __dirname;

app.use('/', express.static(projectRoot));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// log requests to stdout and also
// log HTTP requests to a file using the standard Apache combined format
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {
    flags: 'a'
});
app.use(logger('dev'));
app.use(logger('combined', {
    stream: accessLogStream
}));

// http POST /contact
app.post("/", function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;
    var isError = false;

    console.log('\nCONTACT FORM DATA: ' + name + ' ' + email + ' ' + subject + ' ' + message + '\n');

    // create transporter object capable of sending email using the default SMTP transport
    var transporter = nodemailer.createTransport(mg(config));

    // if (name === "" || email === "" || subject === "" || message === "") {
    //     isError = true;
    // }

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: name + ' <' + email + '>', // sender address
        to: 'rdt712@gmail.com', // list of receivers
        subject: subject, // Subject line
        text: message,
        err: isError
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('\nERROR: ' + error + '\n');
            res.sendStatus(500);
        } else {
            console.log('\nRESPONSE SENT: ' + info.response + '\n');
            res.sendStatus(200);
        }
    });
});

app.listen(config.port);
console.log('Express server up and running on port ' + config.port);
