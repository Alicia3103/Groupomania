const express = require('express');
const router = express.Router();
// récupération des middlewares
const limitMax = require('../middleware/limiter')
const emailValid = require('../middleware/emailvalidator');
const passwordValid = require('../middleware/passwordvalidator')
const userCtrl = require('../controllers/user');

//routes avec tous les middleware nécessaires
router.post('/signup',emailValid,passwordValid, userCtrl.signup);
router.post('/login',limitMax.limiter, userCtrl.login);

module.exports = router;