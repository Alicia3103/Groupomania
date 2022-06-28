const express = require('express');
const router = express.Router();
// récupération des middlewares
const limitMax = require('../middlewares/limiter')
const emailValid = require('../middlewares/emailvalidator');
const passwordValid = require('../middlewares/passwordvalidator')
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');

//routes avec tous les middleware nécessaires
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/unactiveAccount',auth, userCtrl.unactiveAccount);

module.exports = router;