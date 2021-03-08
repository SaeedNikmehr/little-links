const express = require('express')
const LinkController = require('../app/links/LinkController')
const validator = require('../middlewares/validations/link')
const {authJWT} = require('../middlewares/auth')


const router = express.Router();

router.post('/create', validator.createLinkRules() , validator.validate, LinkController.createLink)
router.post('/revert', validator.revertLinkRules() , validator.validate, LinkController.revertLink)
router.post('/test',LinkController.test)


module.exports = router;