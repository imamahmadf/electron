const express = require("express");

const { bankControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get", bankControllers.getAll);
routers.post("/edit", bankControllers.editBank);

module.exports = routers;
