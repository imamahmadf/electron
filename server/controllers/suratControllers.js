const { db } = require("../database");
const path = require("path");
const ExcelJS = require("exceljs");
const { app } = require("electron");

module.exports = {
  // ... kode lain ...

  exel: async (req, res) => {
    try {
      // Ambil data nama, jabatan, NIP, dan golongan dari tabel pegawais untuk id 1
      const sqlGet = `SELECT nama, jabatan, NIP, golongan FROM pegawais WHERE id = 1`;
      db.query(sqlGet, async (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }

        const sourceFilePath = path.join(
          __dirname,
          "..",
          "assets",
          "SPPD Distribusi  2024SPPD.xlsx"
        );
        const downloadPath = app.getPath("downloads");
        const newFileName = `updated_coba_${Date.now()}.xlsx`;
        const newFilePath = path.join(downloadPath, newFileName);

        // Baca file SPPD Distribusi 2024SPPD.xlsx yang sudah ada
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(sourceFilePath);

        // Pilih worksheet SURTUG atau buat baru jika tidak ada
        let worksheet = workbook.getWorksheet("SURTUG");
        if (!worksheet) {
          worksheet = workbook.addWorksheet("SURTUG");
        }

        // Tambahkan data ke sel yang sesuai
        if (results.length > 0) {
          worksheet.getCell("G17").value = results[0].nama; // Nama
          worksheet.getCell("G20").value = results[0].jabatan; // Jabatan
          worksheet.getCell("G18").value = results[0].golongan; // Golongan
          worksheet.getCell("G19").value = results[0].NIP; // NIP
        }

        // Simpan perubahan ke file SPPD Distribusi 2024SPPD.xlsx yang asli
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
