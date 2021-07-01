const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA
const userSchema = new Schema({
  username: {type: String,
    required: [true, "Username is required"],
    unique: true,
    match: [ /^\S+@\S+\.\S+$/ , "Please input a valid email"], //checks if email has @ and .
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]}
});


// CREATE MODEL
//                           users
const User = mongoose.model('User', userSchema);


// EXPORT
module.exports = User;