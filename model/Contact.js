const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  //we need to create a relationship between contacts and users
  //because each user has their own set of contacts
  user: {
    type: mongoose.Schema.Types.ObjectId,
    //when we create an entry with mongoDB, the document has an id called the ObjectId
    ref: 'users'
    //the specific collection that we are talking about
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: 'personal'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('contact', ContactSchema);
