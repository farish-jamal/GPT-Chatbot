const bycrypt = require("bcrypt");
const User = require("../models/user.model");
const {setUser} = require("../utils/auth.utils");

async function handleCreateUSer(req, res) {
  const salt = await bycrypt.genSalt(10);
  const securePassword = await bycrypt.hash(req.body.password, salt);
  const body = req.body;
    try {
      const user = await User.create({
        firstName: body.firstName,
        email: body.email,
        password: securePassword,
      });
      const sessionId = setUser(user);
      res.cookie("uid", sessionId);
      res.redirect("/");
      return res.render("home", {
        response: null,
        prompt: null,
        firstName: user.firstName
      });
    } catch (error) {
      return res.render("register", {
        alert: true,
        message: "Email already exists! Please use another email to register.",
      });
    }
}

async function handleGetUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.render("login", {
   message: "Email Not Correct, Please Login With Correct Credentials 📬",
   alert: true
  });
  const comparePassword = await bycrypt.compare(password, user.password);
  if (!comparePassword) return res.render("login", {
   message: "Password Not Correct, Please Login With Correct Credentials 🔑",
   alert: true
  });
  const sessionId = setUser(user);
  res.cookie("uid", sessionId);
  res.redirect("/");
  return res.render("home", {
   response: null,
   prompt: null,
   firstName: user.firstName
  });
}

async function handleProfileEdit(req, res){
  const {editId, editEmail, editName} = req.body;
  console.log(editEmail, editName);
  const user = await User.findByIdAndUpdate(editId, {
    firstName: editName,
    email: editEmail
  },{ new: true } );
  console.log(user);
  const sessionId = setUser(user);
  res.cookie("uid", sessionId);
  return res.redirect("/api/history");
}


async function handleChangePassword(req, res){
  const {editPassId, editPassword, currPassword} = req.body;
  console.log(editPassId, currPassword, editPassword);
  const user = await User.findOne({ _id: editPassId });
  console.log(user);
  const comparePassword = await bycrypt.compare(currPassword, user.password);
  if (!comparePassword){
    res.redirect("/");
    return res.render("home", {
      firstName: user.firstName,
      response: null,
      prompt: null,
      msg: false
    });
  }
  const salt = await bycrypt.genSalt(10);
  const securePassword = await bycrypt.hash(editPassword, salt);
  await User.findByIdAndUpdate(editPassId, {
    password: securePassword
  });
  res.redirect("/");
  return res.render("home", {
    firstName: user.firstName,
    response: null,
    prompt: null,
    msg: true
  });
}

module.exports = {
  handleCreateUSer,
  handleGetUser,
  handleProfileEdit,
  handleChangePassword
};
