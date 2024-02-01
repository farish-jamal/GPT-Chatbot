const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
 firstName:{
  type: String,
  require: true
 },
 email:{
  type: String,
  unique: true,
  require: true
 },
 password:{
  type: String,
  require: true
 },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;