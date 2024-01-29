const express = require("express");

const route = express.Router();

route.get("/", (req, res)=>{
 res.render("home", {
  response: null,
  prompt: null
 });
});

route.get("/api/response", (req, res)=>{
 res.redirect("/");
});

module.exports = route;