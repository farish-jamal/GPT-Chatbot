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
  return res.render("home", {
   response: null,
   prompt: null,
   firstName: user.firstName
  });
}

async function handleProfileEdit(req, res){
  const {editId, editEmail, editName} = req.body;
  console.log(editEmail, editName, editEmail)
  const user = await User.findByIdAndUpdate(editId, {
    firstName: editName,
    email: editEmail
  });
  console.log(user);
  if (!user) {
    return res.status(404).send("User not found");
  }
  const sessionId = setUser(user);
  res.cookie("uid", sessionId);
  return res.redirect("/api/history");
}


module.exports = {
  handleCreateUSer,
  handleGetUser,
  handleProfileEdit
};
