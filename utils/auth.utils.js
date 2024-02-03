const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretID = process.env.JWT_SECRET;

function setUser(user){
 return jwt.sign({
  id: user._id,
  email: user.email,
  firstName: user.firstName,
  role: user.role
 }, secretID);
}

function getUser(token){
 if(!token) return null;
 return jwt.verify(token, secretID);
}


module.exports = {
 setUser,
 getUser
}