const express = require("express");
const {restrictTo} = require("../middleware/auth.middleware.js");
const route = express.Router();

route.get("/", (req, res) => {
  res.render("home", {
    firstName: req.user.firstName,
    response: null,
    prompt: null,
  });
});

route.get("/api/response", (req, res) => {
  res.redirect("/");
});

route.get("/logout", (req, res)=>{
  res.clearCookie("uid");
  return res.redirect("/user/login");
})

route.get("/admin", restrictTo("ADMIN"),(req, res)=>{
  return res.send("user");
})

module.exports = route;
