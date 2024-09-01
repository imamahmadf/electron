const { db } = require("../database");
const excel = require("exceljs");
const fs = require("fs");
const path = require("path");
const { app } = require("electron");

module.exports = {
  getRekap: async (req, res) => {
    console.log(req.body);
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", options);
    };
    const dataFromFrontend = req.body;

    try {
      const sourceFilePath = path.join(__dirname, "..", "assets", "REKAP.xlsx");
      // Membuat workbook baru
      const workbook = new excel.Workbook();
      const downloadPath = app.getPath("downloads");
      const newFileName = `REKAP${Date.now()}.xlsx`;
      const newFilePath = path.join(downloadPath, newFileName);

      await workbook.xlsx.readFile(sourceFilePath);
      const worksheet = workbook.getWorksheet("rekap");

      dataFromFrontend.forEach((data, index) => {
        const rowNumber = 7 + index * 4; // Baris dimulai dari 7, 11, 15, dst.

        worksheet.getCell(`A${rowNumber}`).value = index + 1;
        worksheet.getCell(`B${rowNumber}`).value = formatDate(
          data.keberangkatan
        );
        worksheet.getCell(`C${rowNumber}`).value = formatDate(data.pulang);
        worksheet.getCell(`D${rowNumber}`).value = JSON.parse(
          data.puskesmasId
        ).nama.toUpperCase();
        worksheet.getCell(`E${rowNumber}`).value = JSON.parse(
          data.pegawai1
        ).nama;
        worksheet.getCell(`E${rowNumber + 1}`).value = JSON.parse(
          data.pegawai2
        ).nama;
        worksheet.getCell(`E${rowNumber + 2}`).value = JSON.parse(
          data.pegawai3
        ).nama;
      });
      await workbook.xlsx.writeFile(newFilePath);
    } catch (error) {
      console.error("Error handling post request:", error);
      res.status(500).send("Terjadi kesalahan.");
    }
  },

  deleteAll: (req, res) => {
    let sqlDelete = `DELETE FROM keberangkatans`;

    db.query(sqlDelete, (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(`Semua rekap sudah dihapus`);
    });
  },
};
