const User = require("../models/user.model");

async function handleCreateUSer(req, res){
 const body = req.body;
 const user = await User.create({
  userName: body.userName,
  email: body.email,
  password: body.password
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