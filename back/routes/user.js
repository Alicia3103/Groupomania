const express = require('express')
const router = express.Router()
// récupération des middlewares
const limitMax = require('../middlewares/limiter')
const emailValid = require('../middlewares/emailvalidator')
const passwordValid = require('../middlewares/passwordvalidator')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')

//routes avec tous les middleware nécessaires
router.post('/signup', emailValid, passwordValid, userCtrl.signup)
router.post('/login', limitMax.limiter, userCtrl.login)
router.get('/user', auth, userCtrl.getUser)
router.get('/logout', userCtrl.logout)
router.put('/deleteAccount', auth, userCtrl.deleteAccount)

module.exports = router
