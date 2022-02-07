const express = require('express');
const { register, registerValidation, loginValidations, login } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerValidation, register)
router.post('/login', loginValidations, login)

module.exports = router;