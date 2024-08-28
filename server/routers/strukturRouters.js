const express = require("express");

const { strukturControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get", strukturControllers.getAll);
routers.post("/edit", strukturControllers.editStruktur);

module.exports = routers;
