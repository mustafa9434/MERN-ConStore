const db = require('../config/db')
const { body, validationResult } = require('express-validator');
const Contacts = db.contacts;



// add contact
module.exports.addContactValidation = [
    body("name").not().isEmpty().trim().withMessage('Name is Required'),
    body("email").not().isEmpty().trim().withMessage('Email is Required'),
    body("phone").not().isEmpty().trim().withMessage('Phone is Required'),
    body("address").not().isEmpty().trim().withMessage('Address is Required'),
]
module.exports.addContact = async (req, res) => {
    const { userId, name, email, phone, address } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const contact = await Contacts.create({ userId, name, email, phone, address });
        if (contact) {
            return res.status(200).json({ msg: 'Contact Created Successfuly!', contact })
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
}

// get contacts
module.exports.getContacts = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
        const contacts = await Contacts.findAll({ where: { userId } })
        if (contacts) {
            return res.status(200).json({ contacts })
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
}

// get one contact
module.exports.getOneContact = async (req, res) => {
    const contactId = req.params.id;
    try {
        const contactDetails = await Contacts.findOne({ where: { id: contactId } });
        if (contactDetails) {
            return res.status(200).json({ contact: contactDetails })
        } else {
            return res.status(400).json({ msg: 'Invalid param' })
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
}

// update contact
module.exports.updateContactValidation = [
    body("name").not().isEmpty().trim().withMessage('Name is Required'),
    body("email").not().isEmpty().trim().withMessage('Email is Required'),
    body("phone").not().isEmpty().trim().withMessage('Phone is Required'),
    body("address").not().isEmpty().trim().withMessage('Address is Required'),
]
module.exports.updatecontact = async (req, res) => {
    const contactId = req.params.id;
    const { name, email, phone, address } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const checkId = await Contacts.findOne({ where: { id: contactId } })
        if (checkId) {
            const update = await Contacts.update(
                { name, email, phone, address },
                { where: { id: contactId } }
            )
            return res.status(200).json({ msg: 'Contact Updated' })
        } else {
            return res.status(400).json({msg: 'Invalid Params'})
        }
    } catch (error) {
        return res.status(500).json({ errors: error })
    }

}

// delete contact
module.exports.deleteContact = async (req, res) => {
    const contactId = req.params.id;
    const contact = await Contacts.findOne({where: {id: contactId}})
    if (contact) {
        const response = await contact.destroy()
        return res.status(200).json({msg: 'Contact Deleted'})
    } else{
        return res.status(400).json({msg: 'Invalid Params'})
    }
}