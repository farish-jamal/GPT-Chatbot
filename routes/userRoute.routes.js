const express = require("express");
const {handleCreateUSer, handleGetUser} = require("../controllers/user.controller");

const route = express.Router();

route.get("/register", (req, res)=>{
 res.render("register", {
  alert: false,
 });
});

route.get("/login", (req, res)=>{
 res.render("login");
});

route.post("/register", handleCreateUSer);

route.post("/login", handleGetUser);

module.exports = route;
