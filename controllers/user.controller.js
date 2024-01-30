const bycrypt = require("bcrypt");
const User = require("../models/user.model");


async function handleCreateUSer(req, res){
 const salt = await bycrypt.genSalt(10);
 const securePassword = await bycrypt.hash(req.body.password, salt);
 const body = req.body;
 const user = await User.create({
  userName: body.userName,
  email: body.email,
  password: securePassword
 })
 return res.send(user._id);
}

async function handleGetUser(req, res){
 const {email, password} = req.body;
 const user = await User.findOne({email, password});
 return res.json(user);
}

module.exports = {
 handleCreateUSer,
 handleGetUser
};