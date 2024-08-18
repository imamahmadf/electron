const express = require("express");

const { suratControllers } = require("../controllers");
const routers = express.Router();

routers.post("/post", suratControllers.handlePost); // Menambahkan router POST
routers.get("/get", suratControllers.getAllSurat);
routers.delete("/delete/:id", suratControllers.deleteSurat);
routers.post(`/kwitansi`, suratControllers.printKwitansi);
routers.post(`/edit`, suratControllers.editNomorSurat);

module.exports = routers;
