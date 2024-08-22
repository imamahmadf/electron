const express = require("express");

const { rekapControllers } = require("../controllers");
const routers = express.Router();

routers.post("/get", rekapControllers.getRekap);
routers.post("/delete/all", rekapControllers.deleteAll);

module.exports = routers;
