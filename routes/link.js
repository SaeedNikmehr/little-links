const express = require('express')
const LinkController = require('../app/links/LinkController')
const validator = require('../middlewares/validations/link')
const {authJWT} = require('../middlewares/auth')


const router = express.Router();

router.post('/create', validator.createLinkRules() , validator.validate, authJWT(false), LinkController.createLink)
router.post('/create/customize', authJWT(), validator.createCustomizeLinkRules() , validator.validate, LinkController.createCustomizeLink)
router.post('/revert', validator.revertLinkRules() , validator.validate, LinkController.revertLink)
router.post('/test',LinkController.test)


module.exports = router;