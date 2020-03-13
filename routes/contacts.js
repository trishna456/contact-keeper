const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../model/User');
const Contact = require('../model/Contact');

const router = express.Router();

// @route    GET api/contacts
// @desc     Gets all user's contacts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    //we use try catch since we are dealing with mongoose, since we need to pull from the db
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1 //the most recent contacts first
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/contacts
// @desc     Add new contact
// @access   Private

//the auth parameter goes in as second parameter, so does the validator checks,
//so to user multiple middleware, enclose them in []
router.post(
  '/',
  [auth, [check('name', 'Name is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/contacts/:id
// @desc     Update contact
// @access   Private
router.put('/:id', auth, async (req, res) => {
  //don't forget to take the contact id as the parameter
  const { name, email, phone, type } = req.body;

  //Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
      //404 not found
    }

    //make sure user owns the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
      //401 unauthorized
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id, //contact id
      { $set: contactFields }, //object with which to be updated
      { new: true } //options, ie. if this contact doesn't exist then create it
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    //500 server error
  }
});

// @route    DELETE api/contacts/:id
// @desc     Delete contact
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    //make sure user owns the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);
    //findByIdAndDelete is deprecated

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
