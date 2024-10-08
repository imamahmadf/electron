const express = require("express");

const { pegawaiControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get", pegawaiControllers.getAll);
routers.post("/delete/:id", pegawaiControllers.deletePegawai);
routers.post("/post", pegawaiControllers.addPegawai);
routers.post("/edit", pegawaiControllers.editPegawai);

module.exports = routers;
