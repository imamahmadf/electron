const express = require("express");

const { userControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get", userControllers.getUserAll);

module.exports = routers;
