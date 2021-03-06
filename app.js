require('dotenv').config();
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    expressSanitizer = require('express-sanitizer'),
    passport = require('passport'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    cloudinary = require('cloudinary').v2;

//requiring routes
const indexRoutes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(methodOverride("_Method"));
app.use(expressSanitizer())

//session
app.use(require('express-session')({
    secret: 'this is my fifth fullstack',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use(function(req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
});

//require moment
app.locals.moment = require('moment');

//routes
app.use("/", indexRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`The Server Has Started! at port${process.env.PORT}`);
});