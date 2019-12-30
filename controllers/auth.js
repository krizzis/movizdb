const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

function renderLoginPage(res, err) {
    res.render
        ('./signin', {
            "pageTitle": "Login",
            "menu": "login",
            "error": err
        });
}

function renderSignupPage(res, data, err) {
    res.render('./signup', {
        "pageTitle": "Sign Up",
        "menu": "signup",
        "data": data,
        "error": err
    });
}

exports.getLoginPage = (req, res, next) => {
    renderLoginPage(res);
}

exports.getSignUpPage = (req, res, next) => {
    renderSignupPage(res);
}

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
        where: { username: username }
    })
        .then(user => {
            if (!user) {
                const err = "Username or password is invalid";
                return renderLoginPage(res, err);  
            }
            else {
                bcrypt.compare(password, user.password)
                    .then(result => {
                        if (result) {
                            req.user = user;
                            req.session.user = user
                            return req.session.save(err => {
                                if (err) {
                                    console.log(err)
                                }
                                return res.redirect('/');
                            })
                        }
                        const err = "Username or password is invalid";
                        return renderLoginPage(res, err);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
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
                const data = {};
                data.username = username;
                data.email = email;
                const err = "Email already exist";
                return renderSignupPage(res, data, err);
            }
            else {
                return bcrypt.hash(password, 12)
                    .then(hash => {
                        return User.create({
                            email: email,
                            username: username,
                            password: hash
                        })
                    })
            }
        })
        .then(user => {
            user.createFavorite();
            return user;
        })
        .then(() => {
            return res.redirect("/auth/login");
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}
