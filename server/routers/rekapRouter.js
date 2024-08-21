const express = require("express");

const { rekapControllers } = require("../controllers");
const routers = express.Router();

routers.post("/get", rekapControllers.getRekap);

module.exports = routers;
