require('dotenv').config();
const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

router.get('/', (req, res) => {
    res.render('home')
});
router.get('/about', (req, res) => {
    res.render('about')
});
router.get('/faq', (req, res) => {
    res.render('faq')
});
router.get('/practice-areas', (req, res) => {
    res.render('practice-areas');
});
router.get('/news', (req, res) => {
    res.render('news');
});
// GET /contact
router.get('/contact', (req, res) => {
    res.render('contact');
});

// POST /contact
router.post('/contact', (req, res) => {

    // email, subject, text
    let { email, subject, text } = req.body;
    email = req.sanitize(email);
    subject = req.sanitize(subject);
    text = req.sanitize(text);


    const auth = {
        auth: {
            api_key: process.env.API_KEY || 'MAIL_GUN_API_KEY',
            domain: process.env.DOMAIN || 'MAIL_GUN_DOMAIN'
        }
    };

    const transporter = nodemailer.createTransport(mailGun(auth));

    const mailOptions = {
        from: email,
        to: '',
        subject: subject,
        text: text,
        html: `
        <p>${text}</p>
        `
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log(err);
            return req.flash('error', 'Internal Error');
        }
        console.log(data);
        req.flash('success', 'Email sent admin!!!!!');
        res.redirect('/contact')
    });

});

router.get('/blog', (req, res) => {
    res.render('blog');
});


module.exports = router;