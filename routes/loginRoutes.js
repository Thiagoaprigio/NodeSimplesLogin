const express = require('express')
const router = express.Router()


const LoginController = require('../controllers/loginController')

router.get('/index', LoginController.login_pagina)
router.post('/sign_in', LoginController.login_save)
router.get('/logout', LoginController.logout)


module.exports = router