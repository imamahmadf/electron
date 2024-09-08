const express = require("express");

const { puskesmasControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get", puskesmasControllers.getAllPuskesmas);
routers.post("/delete/:id", puskesmasControllers.deletePuskesmas);
routers.patch("/edit", puskesmasControllers.editPuskesmas);
routers.post("/post", puskesmasControllers.postPuskesmas);

module.exports = routers;
