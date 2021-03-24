const express = require('express')
const AuthController = require('../app/auth/AuthController')
const validator = require('../middlewares/validations/auth')

const router = express.Router();
 
router.post('/register', validator.registerRules() , validator.validate, AuthController.register)
router.post('/login', validator.loginRules() , validator.validate, AuthController.login)


module.exports = router;