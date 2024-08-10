const { db } = require("../database");
const path = require("path");
const ExcelJS = require("exceljs");
const { app } = require("electron");
const { format, parseISO } = require("date-fns");

module.exports = {
  handlePost: async (req, res) => {
    try {
      const { pegawai1, pegawai2, pegawai3, keberangkatan, pulang, puskesmas } =
        req.body; // Mengambil data pegawai

      console.log("Data yang diterima:", req.body); // Log data yang diterima

      // Validasi data
      if (!pegawai1 || !pegawai2 || !pegawai3) {
        return res.status(400).send("Data pegawai tidak lengkap.");
      }

      const sourceFilePath = path.join(
        __dirname,
        "..",
        "assets",
        "DISTRIBUSI.xlsx"
      );

      console.log("File path:", sourceFilePath); // Log file path
      const downloadPath = app.getPath("downloads");
      const newFileName = `updated_coba_${Date.now()}.xlsx`;
      const newFilePath = path.join(downloadPath, newFileName);
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(sourceFilePath);

      const worksheet = workbook.getWorksheet("SURTUG");
      if (!worksheet) {
        throw new Error("Worksheet 'SURTUG' tidak ditemukan.");
      }

      // Memasukkan data ke sel tertentu
      worksheet.getCell("G17").value = pegawai1.label; // pegawai1 label
      worksheet.getCell("G18").value = pegawai1.golongan; // pegawai1 golongan
      worksheet.getCell("G19").value = pegawai1.NIP; // pegawai1 NIP
      worksheet.getCell("G20").value = pegawai1.jabatan; // pegawai1 jabatan

      worksheet.getCell("G22").value = pegawai2.label; // pegawai2 label
      worksheet.getCell("G23").value = pegawai2.golongan; // pegawai2 golongan
      worksheet.getCell("G24").value = pegawai2.NIP; // pegawai2 NIP
      worksheet.getCell("G25").value = pegawai2.jabatan; // pegawai2 jabatan

      worksheet.getCell("G27").value = pegawai3.label; // pegawai3 label
      worksheet.getCell("G28").value = pegawai3.golongan; // pegawai3 golongan
      worksheet.getCell("G29").value = pegawai3.NIP; // pegawai3 NIP
      worksheet.getCell("G30").value = pegawai3.jabatan; // pegawai3 jabatan

      // Format tanggal ke format "DD MMMM YYYY"
      const formattedKeberangkatan = format(
        parseISO(keberangkatan),
        "d MMMM yyyy"
      );
      const formattedPulang = format(parseISO(pulang), "d MMMM yyyy");

      worksheet.getCell("G37").value = formattedKeberangkatan; // tanggalKeberangkatan
      worksheet.getCell("G38").value = formattedPulang; // tanggalPulang

      function generateNomorSurat(Keberangkatan, jenisSurat) {
        const date = new Date(keberangkatan);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();

        let nomorSurat = "";
        switch (jenisSurat) {
          case "tugas":
            nomorSurat = `${day}0.1/     /ST-POA/${month}/${year}`;
            break;
          case "nota dinas":
            nomorSurat = `440/      /ND-POA/${month}/${year}`;
            break;
          case "SPD":
            nomorSurat = `094/         /SPD-POA/${month}/${year}`;
            break;
          default:
            nomorSurat = "Nomor surat tidak valid";
        }

        return nomorSurat;
      }

      worksheet.getCell("E50").value = generateNomorSurat(
        keberangkatan,
        "tugas"
      );

      worksheet.getCell("E51").value = generateNomorSurat(
        keberangkatan,
        "nota dinas"
      );

      worksheet.getCell("E52").value = generateNomorSurat(keberangkatan, "SPD");

      // Simpan perubahan ke file baru
      await workbook.xlsx.writeFile(newFilePath);

      // Simpan data ke database
      const nomorSuratTugas = generateNomorSurat(keberangkatan, "tugas");
      const nomorSuratNotaDinas = generateNomorSurat(
        keberangkatan,
        "nota dinas"
      );
      const nomorSuratSPD = generateNomorSurat(keberangkatan, "SPD");

      const sql = `INSERT INTO keberangkatans (nomorSuratTugas, nomorSuratNotaDinas, nomorSuratSPD, keberangkatan, pulang, pegawai1Id, pegawai2Id, pegawai3Id, puskesmasId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      db.query(
        sql,
        [
          nomorSuratTugas,
          nomorSuratNotaDinas,
          nomorSuratSPD,
          keberangkatan,
          pulang,
          pegawai1.value,
          pegawai2.value,
          pegawai3.value,
          puskesmas.value,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting data to database:", err);
            return res
              .status(500)
              .send("Terjadi kesalahan saat menyimpan data ke database.");
          }
          res
            .status(200)
            .send(
              "Data berhasil ditambahkan ke file Excel dan disimpan ke database."
            );
        }
      );
    } catch (error) {
      console.error("Error handling post request:", error);
      res.status(500).send("Terjadi kesalahan saat menangani permintaan.");
    }
  },
  getAllSurat: (req, res) => {
    const sql = `SELECT keberangkatans.id, keberangkatans.nomorSuratTugas, keberangkatans.keberangkatan, keberangkatans.pulang, keberangkatans.nomorSuratNotaDinas, keberangkatans.nomorSuratSPD, 
JSON_OBJECT('id', pegawai1.id, 'nama', pegawai1.nama, 'NIP', pegawai1.NIP, 'jabatan', pegawai1.jabatan, 'golongan', pegawai1.golongan) AS pegawai1,
JSON_OBJECT('id', pegawai2.id, 'nama', pegawai2.nama, 'NIP', pegawai2.NIP, 'jabatan', pegawai2.jabatan, 'golongan', pegawai2.golongan) AS pegawai2,
JSON_OBJECT('id', pegawai3.id, 'nama', pegawai3.nama, 'NIP', pegawai3.NIP, 'jabatan', pegawai3.jabatan, 'golongan', pegawai3.golongan) AS pegawai3,
JSON_OBJECT('id', puskesmas.id, 'nama', puskesmas.nama) AS puskesmasId
FROM keberangkatans
LEFT JOIN pegawais AS pegawai1 ON keberangkatans.pegawai1Id = pegawai1.id
LEFT JOIN pegawais AS pegawai2 ON keberangkatans.pegawai2Id = pegawai2.id
LEFT JOIN pegawais AS pegawai3 ON keberangkatans.pegawai3Id = pegawai3.id
LEFT JOIN puskesmas ON keberangkatans.puskesmasId = puskesmas.id`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching data from database:", err);
        return res
          .status(500)
          .send("Terjadi kesalahan saat mengambil data dari database.");
      }
      res.status(200).json(result);
    });
  },
  deleteSurat: (req, res) => {
    const { id } = req.params; // Mengambil id dari URL

    const sql = `DELETE FROM keberangkatans WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error deleting data from database:", err);
        return res
          .status(500)
          .send("Terjadi kesalahan saat menghapus data dari database.");
      }
      res.status(200).send("Data berhasil dihapus dari database.");
    });
  },
};
