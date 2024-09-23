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
      const sourceFilePathDistribusi = path.join(
        __dirname,
        "..",
        "assets",
        "REKAP DISTRIBUSI ORANG.xlsx"
      );

      if (dataFromFrontend.pegawaiList[0]?.value) {
        const workbookDisOrg = new excel.Workbook();
        const downloadPathDisOrg = app.getPath("downloads");
        const newFileNameDisOrg = `REKAP ORANG DISTRIBUSI${Date.now()}.xlsx`;
        const newFilePathDisOrg = path.join(
          downloadPathDisOrg,
          newFileNameDisOrg
        );

        await workbookDisOrg.xlsx.readFile(sourceFilePathDistribusi);
        const worksheetDisOrg = workbookDisOrg.getWorksheet("REKAP");

        dataFromFrontend.dataKeAPI.forEach((data, index) => {
          const rowNumber = 7 + index * 1;
          worksheetDisOrg.getCell(`A${rowNumber}`).value = index + 1;
          worksheetDisOrg.getCell(`B${rowNumber}`).value = formatDate(
            data.keberangkatan
          );
          worksheetDisOrg.getCell(`C${rowNumber}`).value = JSON.parse(
            data.puskesmasId
          ).nama.toUpperCase();
          worksheetDisOrg.getCell(`D${rowNumber}`).value = data.nomorSuratTugas;
          worksheetDisOrg.getCell(`E${rowNumber}`).value = data.nomorSuratSPD;
          worksheetDisOrg.getCell(`F${rowNumber}`).value =
            req.body.jenisSPPD?.label == "Distribusi"
              ? "Distribusi Obat"
              : "Monitoring";
        });

        worksheetDisOrg.getCell(`A2`).value =
          req.body.jenisSPPD == "Distribusi"
            ? "REKAPITULASI SPPD DISTRIBUSI"
            : "REKAPITULASI SPPD MONITORING";

        await workbookDisOrg.xlsx.writeFile(newFilePathDisOrg);
      } else {
        const workbook = new excel.Workbook();
        const downloadPath = app.getPath("downloads");
        const newFileName = `REKAP${Date.now()}.xlsx`;
        const newFilePath = path.join(downloadPath, newFileName);

        await workbook.xlsx.readFile(sourceFilePath);
        const worksheet = workbook.getWorksheet("rekap");

        dataFromFrontend.dataKeAPI.forEach((data, index) => {
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
      }
      res.status(200).send(`REKAP BERHASIL`);
      // Membuat workbook baru
    } catch (error) {
      console.error("Error handling post request:", error);
      res.status(500).send("Terjadi kesalahan.");
    }
  },

  getRekapOrang: async (req, res) => {
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", options);
    };
    const dataFromFrontend = req.body;
    console.log(req.body);
    try {
      // Membuat workbook baru
    } catch (err) {
      console.error("Error handling post request:", err);
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
