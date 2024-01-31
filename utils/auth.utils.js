const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretID = process.env.JWT_SECRET;

function setUser(user){
 return jwt.sign({
  id: user._id,
  email: user.email
 }, secretID);
}


module.exports = {
 setUser
}