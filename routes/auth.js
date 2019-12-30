const express = require('express');
const router = express.Router();

const loginFormRouter = require('../controllers/auth');

router.get('/login', loginFormRouter.getLoginPage);
router.post('/login', loginFormRouter.postLogin);

router.get('/signup', loginFormRouter.getSignUpPage);
router.post('/signup', loginFormRouter.postSignup);

router.get('/logout', loginFormRouter.getLogout);

module.exports = router;
