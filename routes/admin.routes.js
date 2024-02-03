const express = require("express");

const {restrictTo} = require("../middleware/auth.middleware.js");
const {handleAdminGetAllHistory, handleGetSpecificUserForAdmin, handleDeleteUser} = require("../controllers/admin.controller.js");

const route = express.Router();

route.get("/", restrictTo("ADMIN"), handleAdminGetAllHistory);

route.post("/", handleGetSpecificUserForAdmin);

route.get("/delete/:id", handleDeleteUser);

module.exports = route;