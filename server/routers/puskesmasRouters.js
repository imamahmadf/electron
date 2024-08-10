const express = require("express");

const { puskesmasControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get", puskesmasControllers.getAllPuskesmas);

module.exports = routers;
