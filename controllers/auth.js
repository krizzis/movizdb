const express = require('express');

exports.getLoginPage = (req, res, next) => {
    res.render('./signin', {
        "pageTitle": "Login",
        "menu": "login"
    });
}

exports.getSignUpPage = (req, res, next) => {
    res.render('./signup', {
        "pageTitle": "Sign Up",
        "menu": "signup"
    });
}

exports.postLogin = (req, res, next) => {
    req.session.isAdmin = 1;
    res.redirect('/');
}

exports.postSignup = (req, res, next) => {
    req.session.isAdmin = 1;
    res.redirect('/');
}

exports.getLogout = (req, res, next) => {
    req.session.isAdmin = 0
    res.redirect('/')
}