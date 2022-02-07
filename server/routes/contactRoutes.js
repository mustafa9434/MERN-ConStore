const express = require('express');
const { 
    addContact, 
    addContactValidation, 
    getContacts, 
    getOneContact,
    updatecontact,
    updateContactValidation,
    deleteContact
} = require('../controllers/contactsController');
const auth = require('../utils/auth')
const router = express.Router();

router.post('/add_contact', addContactValidation, addContact)
router.get('/contacts/:id', auth, getContacts)
router.get('/contact/:id', auth, getOneContact)
router.patch('/contacts/:id', updateContactValidation, updatecontact)
router.delete('/contacts/:id', auth, deleteContact)

module.exports = router;