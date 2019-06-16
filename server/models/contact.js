// contact model
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  pseudonym: String,
  email: String,
  phone: String,
  phone2: String,
  phone3: String,
  fax: String,
  fax2: String,
  birthday: String,
  disc: String,
  image: String
});

module.exports = mongoose.model('contacts', ContactSchema);
