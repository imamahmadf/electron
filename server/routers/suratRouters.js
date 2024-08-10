const express = require("express");

const { suratControllers } = require("../controllers");
const routers = express.Router();

routers.get("/post", suratControllers.exel);
routers.post("/post", suratControllers.handlePost); // Menambahkan router POST

module.exports = routers;
