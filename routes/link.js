const express = require('express')
const LinkController = require('../app/controllers/LinkController')


const router = express.Router();

router.post('/create',LinkController.createLink)
router.post('/revert',LinkController.revertLink)


module.exports = router;