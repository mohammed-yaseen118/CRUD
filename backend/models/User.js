const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  photo: { type: String } // URL/path to photo
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
