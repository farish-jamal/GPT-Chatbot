const bycrypt = require("bcrypt");
const User = require("../models/user.model");
const Response = require("../models/response.model");
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

async function handleAdminGetAllHistory(req, res){
  const result = await User.find({})
  return res.render("admin", {
    results: result,
  })
}

async function handleGetSpecificUserForAdmin(req, res){
  const {userId} = req.body;
  if(userId == "null") return res.redirect("/admin");
  const results = await Response.find({createdBy: userId});
  const user = await User.findOne({_id: userId});
  return res.render("specificuser", {
    results : results,
    name: user.firstName
  })
}

module.exports = {
  handleCreateUSer,
  handleGetUser,
  handleAdminGetAllHistory,
  handleGetSpecificUserForAdmin
};
