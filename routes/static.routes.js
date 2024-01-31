const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  res.render("home", {
    response: null,
    prompt: null,
  });
});

route.get("/user/register", (req, res)=>{
 res.render("register", {
  alert: false,
 });
});

route.get("/user/login", (req, res)=>{
 res.render("login", {
  alert: false
 });
});

route.get("/api/response", (req, res) => {
  res.redirect("/");
});

module.exports = route;
