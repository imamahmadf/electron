const express = require("express");

const { suratControllers } = require("../controllers");
const routers = express.Router();

routers.post("/post", suratControllers.handlePost); // Menambahkan router POST
routers.get("/get", suratControllers.getAllSurat);
routers.delete("/delete/:id", suratControllers.deleteSurat);
routers.post(`/kwitansi`, suratControllers.printKwitansi);

module.exports = routers;
