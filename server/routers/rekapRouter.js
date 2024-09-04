const express = require("express");

const { rekapControllers } = require("../controllers");
const routers = express.Router();

routers.post("/get", rekapControllers.getRekap);
routers.post("/delete/all", rekapControllers.deleteAll);
routers.post("/get/rekap-orang", rekapControllers.getRekapOrang);

module.exports = routers;
