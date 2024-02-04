const express = require("express");

const { restrictTo } = require("../middleware/auth.middleware.js");
const {
  handleAdminGetAllHistory,
  handleGetSpecificUserForAdmin,
  handleDeleteUser,
  handleUpdateUser,
} = require("../controllers/admin.controller.js");

const route = express.Router();

route.get("/", restrictTo("ADMIN"), handleAdminGetAllHistory);

route.post("/", handleGetSpecificUserForAdmin);

route.get("/delete/:id", handleDeleteUser);

route.post("/update/", handleUpdateUser);

module.exports = route;
