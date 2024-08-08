const { db } = require("../database");
const path = require("path");
const ExcelJS = require("exceljs");
const { app } = require("electron");

module.exports = {
  // ... kode lain ...

  exel: async (req, res) => {
    try {
      // Ambil data nama dari database untuk id 2 dan 3
      const sqlGet = `SELECT nama FROM puskesmas WHERE id IN (2, 3) ORDER BY id`;
      db.query(sqlGet, async (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }

        const sourceFilePath = path.join(
          __dirname,
          "..",
          "assets",
          "coba.xlsx"
        );
        const downloadPath = app.getPath("downloads");
        const newFileName = `updated_coba_${Date.now()}.xlsx`;
        const newFilePath = path.join(downloadPath, newFileName);

        // Baca file coba.xlsx yang sudah ada
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(sourceFilePath);

        // Pilih worksheet pertama atau buat baru jika tidak ada
        let worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
          worksheet = workbook.addWorksheet("Sheet1");
        }

        // Tambahkan data nama ke sel H9 dan H10
        if (results.length > 0) worksheet.getCell("H9").value = results[0].nama;
        if (results.length > 1)
          worksheet.getCell("H10").value = results[1].nama;

        // Simpan perubahan ke file coba.xlsx yang asli
        await workbook.xlsx.writeFile(sourceFilePath);

        // Buat salinan file baru di folder Download
        await workbook.xlsx.writeFile(newFilePath);

        res
          .status(200)
          .send(
            `File Excel berhasil diperbarui dan file baru dibuat di folder Download: ${newFileName}`
          );
      });
    } catch (error) {
      res
        .status(500)
        .send("Terjadi kesalahan saat memperbarui dan membuat file Excel");
    }
  },
};
