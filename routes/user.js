const express = require('express')
const UserController = require('../app/users/UserController')
const {authJWT} = require('../middlewares/auth')

const router = express.Router();

router.get('/links', authJWT(), UserController.links)

module.exports = router;