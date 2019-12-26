const express = require('express');

exports.getLoginPage = (req, res, next) => {
    res.render('./signin', {
        "pageTitle": "Login",
        "menu": "login"
    });
}

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'isAdmin=1');
    res.redirect('/');
}