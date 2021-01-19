const express = require('express')
const LinkController = require('../app/controllers/LinkController')




const router = express.Router();

router.post('/posts',LinkController.createLink)
module.exports = router;