// User model for MongoDB using Mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true } // Hashed password
});

module.exports = mongoose.model('User', userSchema);