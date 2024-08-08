const express = require("express");

const { suratControllers } = require("../controllers");
const routers = express.Router();

routers.get("/post", suratControllers.exel);

module.exports = routers;
