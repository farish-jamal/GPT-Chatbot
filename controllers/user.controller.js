const bycrypt = require("bcrypt");
const User = require("../models/user.model");

async function handleCreateUSer(req, res) {
  const salt = await bycrypt.genSalt(10);
  const securePassword = await bycrypt.hash(req.body.password, salt);
  const body = req.body;

  if (body.userName === "") {
    return res.render("register", {
      alert: true,
      message: "Username cannot be empty.",
    });
  } else if (body.email === "") {
    return res.render("register", {
      alert: true,
      message: "Email cannot be empty.",
    });
  } else if (body.password === "") {
    return res.render("register", {
      alert: true,
      message: "Password cannot be empty.",
    });
  } else {
    try {
      const user = await User.create({
        userName: body.userName,
        email: body.email,
        password: securePassword,
      });
      return res.send(user._id);
    } catch (error) {
      return res.render("register", {
        alert: true,
        message:
          "Oops! Email Already exists, Verify Your Email and Try To Register Again.",
      });
    }
  }
}

async function handleGetUser(req, res) {
  const { email, password } = req.body;
  if (email === "") {
   return res.render("login", {
     alert: true,
     message: "Email cannot be empty.",
   });
 } else if (password === "") {
   return res.render("login", {
     alert: true,
     message: "Password cannot be empty.",
   });
 } else {
  const user = await User.findOne({ email });
  if (!user) return res.render("login", {
   message: "Email Not Correct, Please Login With Correct Credentials",
   alert: true
  });
  const comparePassword = bycrypt.compare(password, user.password);
  if (!comparePassword) return res.render("login", {
   message: "Password Not Correct, Please Login With Correct Credentials",
   alert: true
  });
  return res.render("home", {
   response: null,
   prompt: null
  });
 }
}

module.exports = {
  handleCreateUSer,
  handleGetUser,
};
