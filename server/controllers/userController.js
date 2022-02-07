const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db')
const Users = db.users;
require('dotenv').config();


// create token
const createToken = user => {
    return jwt.sign({user}, process.env.SECRET, {
        expiresIn: '7d'
    })
}

// Register
module.exports.registerValidation = [
    body("name").not().isEmpty().trim().withMessage("Name is Required"),
    body("email").not().isEmpty().trim().withMessage("Email is Required"),
    body("password").isLength({ min: 6 }).withMessage("Password Must be 6 Cahracters Long"),
]
module.exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const checkEmail = await Users.findOne({ where: { email: email } })
        if (checkEmail) {
            return res.status(400).json({ errors: [{msg: 'Email is already taken'}]})
        }
        const hashPassword = await bcrypt.hash(password, 10);
        try {
            const user = await Users.create({
                name,
                email,
                password: hashPassword
            })
            const token = createToken(user);
            return res.status(200).json({msg: 'Account Created', token})

        } catch (error) {
            return res.status(500).json({ error: error })
        }

    } catch (error) {
        return res.status(500).json({ errors: error })
    }
}

// login
module.exports.loginValidations = [
    body("email").not().isEmpty().trim().withMessage("Email is Required"),
    body("password").not().isEmpty().trim().withMessage("Password is required")
]
module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await Users.findOne({where: {email: email}})
        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password)
            if (checkPassword) {
                const token = createToken(user);
                return res.status(200).json({msg: 'You are Loggd in', token})
            } else {
                return res.status(400).json({ errors: [{msg: 'Password is incorrect'}]})
            }
        } else {
            return res.status(400).json({ errors: [{msg: 'Email not found'}]})
        }
    } catch (error) {
        return res.status(500).json({error})
    }
}