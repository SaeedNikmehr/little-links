//const {authJWT} = require('../middlewares/auth')
const expect = require('chai').expect;
const sinon = require('sinon');
const Link = require('../app/links/LinkModel')
const User = require('../app/users/UserModel')
const LinkService = require('../app/links/LinkService')


describe('LinkService - convert', function(){
    it('should add userId to insert object', function(){
        let originalLink = 'xyz';
        let userId = 'abc';
        let insert = {originalLink};
        const LinkServiceInstance = new LinkService({Link, User})
        LinkServiceInstance.convert({originalLink, userId})
        expect(insert).to.have.property('userId')
        // sinon.stub(Link, 'create')
        // Link.create.returns({})
        // sinon.create.restore()
    })
})
