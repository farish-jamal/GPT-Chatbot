const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
 firstName: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  unique: true,
  required: true,
 },
 role: {
  type: String,
  required: true,
  default: "NORMAL"
 },
 password: {
  type: String,
  required: true,
 },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
