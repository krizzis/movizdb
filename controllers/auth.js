const express = require('express');
const bcrypt = require('bcryptjs');

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
    const username = req.body.username;
    const password = req.body.password;
    console.log("username : " + username)
    User.findOne({
        where: { username: username }
    })
        .then(user => {
            if (!user) {
                return res.redirect('/auth/login');
            }
            else {
                bcrypt.compare(password, user.password)
                    .then(result => {
                        if (result) {
                            req.user = user;
                            req.session.user = user
                            return req.session.save(err => {
                                console.log(err)
                                return res.redirect('/');
                            })
                        }
                        return res.redirect('/auth/login');
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
                return res.redirect("/auth/signup");
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
            // req.user = user;
            // req.session.user = user
            // res.redirect('/')
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
