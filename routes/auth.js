const express = require('express');
const router = express.Router();

const loginFormRouter = require('../controllers/auth');

router.get('/', loginFormRouter.getLoginPage);
router.post('/', loginFormRouter.postLogin);

module.exports = router;
