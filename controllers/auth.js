const express = require('express');

exports.getLoginPage = (req, res, next) => {
    res.render('./signin', {
        "pageTitle": "Login",
        "menu": "login"
    });
}

exports.postLogin = (req, res, next) => {
    req.session.isAdmin = 1;
    res.redirect('/');
}

exports.getLogout = (req, res, next) => {
    req.session.isAdmin = 0
    res.redirect('/')
}