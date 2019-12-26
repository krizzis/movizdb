const express = require('express');
const router = express.Router();

const loginFormRouter = require('../controllers/auth');

router.get('/', loginFormRouter.getLoginPage);
router.post('/', loginFormRouter.postLogin);
router.get('/logout', loginFormRouter.getLogout);

module.exports = router;
