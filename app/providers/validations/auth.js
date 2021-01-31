const { body, validationResult } = require('express-validator')
const {validateResponse} = require('../services/response')
const User = require('../../models/User')

exports.registerRules = () => {
    return [
        body('name')
        .trim()
        .not().isEmpty()
        .isLength({min:3})
        .withMessage("the name must have minimum length of 3"),
        
        body("email")
        .custom(async(value,{ req })=>{
            const user = await User.findOne({email:req.body.email})
            if(user){
                throw new Error("This email already exist");
            }
            return true;
        })
        .isEmail()
        .withMessage("invalid email address")
        .normalizeEmail(),
        
        body("password")
        .isLength({ min: 3, max: 15 })
        .withMessage("your password should have min and max length between 3-15")
        // .matches(/\d/)
        // .withMessage("your password should have at least one number")
        // .matches(/[!@#$%^&*(),.?":{}|<>]/)
        // .withMessage("your password should have at least one sepcial character")
        ,
        
        body("confirmPassword").not().isEmpty().custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("confirm password does not match");
            }
            return true;
        }),
    ]
}

exports.loginRules=()=>{
    return [
        body('email')
        .trim()
        .not().isEmpty()
        .isEmail()
        
        ,body('password')
        .trim()
        .not().isEmpty()
    ];
}

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    
    validateResponse(res, errors)
}
