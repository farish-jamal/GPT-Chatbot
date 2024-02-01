const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
 userQuery:{
  type: String,
 },
 botResponse:{
  type: String
 },
 createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
 }
}, {timestamps: true});

const Response = mongoose.model("Response", responseSchema);
module.exports = Response;