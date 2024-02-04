const express = require("express");
const {
  handleCreateUSer,
  handleGetUser,
  handleProfileEdit,
  handleChangePassword
} = require("../controllers/user.controller");

const route = express.Router();

route.post("/register", handleCreateUSer);

route.get("/register", (req, res) => {
  res.render("register", {
    alert: false,
  });
});

route.post("/login", handleGetUser);

route.get("/login", (req, res) => {
  res.render("login", {
    alert: false,
  });
});

route.post("/edit", handleProfileEdit);

route.post("/edit/password", handleChangePassword);

module.exports = route;
