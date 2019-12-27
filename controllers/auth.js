const express = require('express');

const User = require('../models/user');

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
    User.findByPk(1)
        .then(user => {
            req.user = user;
            req.session.user = user
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        });
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const repassword = req.body.repassword;

    User.findOne({
        where: { email: email }
    })
        .then(user => {
            if (user) {
                return res.redirect("/auth/signup");
            }
            else {
                return User.create({
                    email: email,
                    username: username,
                    password: password
                })
            }
        })
        .then(user => {
            return user.createFavorite();
        })
        .then(user => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/')
    })
}
