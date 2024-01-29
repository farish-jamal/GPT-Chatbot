const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
 userQuery:{
  type: String,
 },
 botResponse:{
  type: String
 }
}, {timestamps: true});

const Response = mongoose.model("Response", responseSchema);
module.exports = Response;