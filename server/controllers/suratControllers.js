const { db } = require("../database");
const path = require("path");
const ExcelJS = require("exceljs");
const { app } = require("electron");
const { format, parseISO } = require("date-fns");

function toRoman(num) {
  const romanNumerals = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
    // tambahkan angka Romawi lainnya sesuai kebutuhan
  };

  return romanNumerals[num];
}

module.exports = {
  handlePost: async (req, res) => {
    try {
      const {
        pegawai1,
        pegawai2,
        pegawai3,
        pegawai4,
        keberangkatan,
        pulang,
        puskesmas,
        tipe,
      } = req.body; // Mengambil data pegawai

      console.log("Data yang diterima:", req.body); // Log data yang diterima

      // Validasi data
      if (!pegawai1 || !pegawai2 || !pegawai3) {
        return res.status(400).send("Data pegawai tidak lengkap.");
      }

      const sourceFilePath = path.join(
        __dirname,
        "..",
        "assets",
        tipe == 1 ? "DISTRIBUSI.xlsx" : "MONITORING.xlsx"
      );

      console.log("File path:", sourceFilePath); // Log file path
      const downloadPath = app.getPath("downloads");
      const newFileName = `SPPD_${tipe == 1 ? "DISTRIBUSI" : "MONITORING"}_${
        puskesmas.label
      }${Date.now()}.xlsx`;
      const newFilePath = path.join(downloadPath, newFileName);
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(sourceFilePath);

      const worksheet = workbook.getWorksheet("SURTUG");
      if (!worksheet) {
        throw new Error("Worksheet 'SURTUG' tidak ditemukan.");
      }

      const workSheetSPD = workbook.getWorksheet("SPD");

      const formattedKeberangkatan = format(
        parseISO(keberangkatan),
        "d MMMM yyyy"
      );
      const formattedPulang = format(parseISO(pulang), "d MMMM yyyy");

      function generateNomorSurat(Keberangkatan, jenisSurat) {
        const date = new Date(keberangkatan);
        const month = toRoman(date.getMonth() + 1); // Mengubah bulan ke angka romawi
        const year = date.getFullYear().toString();

        let nomorSurat = "";
        switch (jenisSurat) {
          case "tugas":
            nomorSurat = `090.1/     /ST-POA/${toRoman(
              parseInt(month)
            )}/${year}`; // Mengubah bulan ke angka romawi
            break;
          case "nota dinas":
            nomorSurat = `440/      /ND-POA/${toRoman(
              parseInt(month)
            )}/${year}`; // Mengubah bulan ke angka romawi
            break;
          case "SPD":
            nomorSurat = `094/         /SPD-POA/${toRoman(
              parseInt(month)
            )}/${year}`; // Mengubah bulan ke angka romawi
            break;
          default:
            nomorSurat = "Nomor surat tidak valid";
        }

        return nomorSurat;
      }
      if (tipe == 2) {
        worksheet.getCell("G15").value = pegawai1.label; // pegawai1 label
        worksheet.getCell("G16").value = pegawai1.golongan; // pegawai1 golongan
        worksheet.getCell("G17").value = pegawai1.NIP; // pegawai1 NIP
        worksheet.getCell("G18").value = pegawai1.jabatan; // pegawai1 jabatan

        worksheet.getCell("G20").value = pegawai2.label; // pegawai2 label
        worksheet.getCell("G21").value = pegawai2.golongan; // pegawai2 golongan
        worksheet.getCell("G22").value = pegawai2.NIP; // pegawai2 NIP
        worksheet.getCell("G23").value = pegawai2.jabatan; // pegawai2 jabatan

        worksheet.getCell("G25").value = pegawai3.label; // pegawai3 label
        worksheet.getCell("G26").value = pegawai3.golongan; // pegawai3 golongan
        worksheet.getCell("G27").value = pegawai3.NIP; // pegawai3 NIP
        worksheet.getCell("G28").value = pegawai3.jabatan; // pegawai3 jabatan

        worksheet.getCell("G30").value = pegawai4.label; // pegawai3 label
        worksheet.getCell("G31").value = pegawai4.golongan; // pegawai3 golongan
        worksheet.getCell("G32").value = pegawai4.NIP; // pegawai3 NIP
        worksheet.getCell("G33").value = pegawai4.jabatan; // pegawai3 jabatan

        worksheet.getCell("G43").value = puskesmas.label; // pegawai3 jabatan

        worksheet.getCell("G36").value = formattedKeberangkatan; // tanggalKeberangkatan
        worksheet.getCell("G37").value = formattedPulang; // tanggalPulang
        // worksheet.getCell("G36").value = formattedPulang; // tanggalPulang

        worksheet.getCell("G9").value = generateNomorSurat(
          keberangkatan,
          "tugas"
        );

        worksheet.getCell("G11").value = generateNomorSurat(
          keberangkatan,
          "nota dinas"
        );

        // workSheetSPD.getCell("H9").value = generateNomorSurat(
        //   keberangkatan,
        //   "SPD"
        // );
      } else {
        worksheet.getCell("G16").value = pegawai1.label; // pegawai1 label
        worksheet.getCell("G17").value = pegawai1.golongan; // pegawai1 golongan
        worksheet.getCell("G18").value = pegawai1.NIP; // pegawai1 NIP
        worksheet.getCell("G19").value = pegawai1.jabatan; // pegawai1 jabatan

        worksheet.getCell("G21").value = pegawai2.label; // pegawai2 label
        worksheet.getCell("G22").value = pegawai2.golongan; // pegawai2 golongan
        worksheet.getCell("G23").value = pegawai2.NIP; // pegawai2 NIP
        worksheet.getCell("G24").value = pegawai2.jabatan; // pegawai2 jabatan

        worksheet.getCell("G26").value = pegawai3.label; // pegawai3 label
        worksheet.getCell("G27").value = pegawai3.golongan; // pegawai3 golongan
        worksheet.getCell("G28").value = pegawai3.NIP; // pegawai3 NIP
        worksheet.getCell("G29").value = pegawai3.jabatan; // pegawai3 jabatan
        worksheet.getCell("G38").value = puskesmas.label; // pegawai3 jabatan
        // Format tanggal ke format "DD MMMM YYYY"

        worksheet.getCell("G32").value = formattedKeberangkatan; // tanggalKeberangkatan
        worksheet.getCell("G33").value = formattedPulang; // tanggalPulang

        worksheet.getCell("G9").value = generateNomorSurat(
          keberangkatan,
          "tugas"
        );

        worksheet.getCell("G11").value = generateNomorSurat(
          keberangkatan,
          "nota dinas"
        );

        workSheetSPD.getCell("H9").value = generateNomorSurat(
          keberangkatan,
          "SPD"
        );
      }
      // Memasukkan data ke sel tertentu

      // Simpan perubahan ke file baru
      await workbook.xlsx.writeFile(newFilePath);

      // Simpan data ke database
      const nomorSuratTugas = generateNomorSurat(keberangkatan, "tugas");
      const nomorSuratNotaDinas = generateNomorSurat(
        keberangkatan,
        "nota dinas"
      );
      const nomorSuratSPD = generateNomorSurat(keberangkatan, "SPD");

      const sql = `INSERT INTO keberangkatans (nomorSuratTugas, nomorSuratNotaDinas, nomorSuratSPD, keberangkatan, pulang, pegawai1Id, pegawai2Id, pegawai3Id, pegawai4Id, puskesmasId, tipe) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
          pegawai4.value,
          puskesmas.value,
          tipe,
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
    const { pegawai, keberangkatan, pulang } = req.query;
    const tipe = req.query.tipe;

    console.log(req.query, "TIPEEEEEEEEEEEE");
    let whereClause = "";

    if (pegawai == "undefined" && tipe == "undefined") {
      if (keberangkatan !== "" && pulang !== "") {
        whereClause = `WHERE keberangkatans.keberangkatan >= '${keberangkatan}' AND keberangkatans.pulang <= '${pulang}'`;
      } else {
        whereClause = "";
      }
    } else if (pegawai !== "undefined" && tipe == "undefined") {
      if (keberangkatan && pulang) {
        whereClause = `WHERE (pegawai1.id = ? OR pegawai2.id = ? OR pegawai3.id = ? OR pegawai4.id = ?) AND keberangkatans.keberangkatan >= '${keberangkatan}' AND keberangkatans.pulang <= '${pulang}'`;
      } else {
        whereClause =
          "WHERE (pegawai1.id = ? OR pegawai2.id = ? OR pegawai3.id = ? OR pegawai4.id = ?)";
      }
    } else if (pegawai !== "undefined" && tipe !== "undefined") {
      if (keberangkatan && pulang) {
        whereClause = `WHERE ((pegawai1.id = ? OR pegawai2.id = ? OR pegawai3.id = ? OR pegawai4.id = ?) AND keberangkatans.tipe = ${tipe}) AND keberangkatans.keberangkatan >= '${keberangkatan}' AND keberangkatans.pulang <= '${pulang}'`;
      } else {
        whereClause = `WHERE ((pegawai1.id = ? OR pegawai2.id = ? OR pegawai3.id = ? OR pegawai4.id = ?) AND keberangkatans.tipe = ${tipe})`;
      }
    } else if (pegawai == "undefined" && tipe !== "undefined") {
      if (keberangkatan && pulang) {
        whereClause = `WHERE (keberangkatans.tipe = '${tipe}') AND keberangkatans.keberangkatan >= '${keberangkatan}' AND keberangkatans.pulang <= '${pulang}'`;
      } else {
        whereClause = `WHERE (keberangkatans.tipe = '${tipe}')`;
      }
    }

    const sql = `SELECT keberangkatans.id, keberangkatans.nomorSuratTugas, keberangkatans.keberangkatan, keberangkatans.pulang, keberangkatans.nomorSuratNotaDinas, keberangkatans.nomorSuratSPD, keberangkatans.tipe, 
    JSON_OBJECT('id', pegawai1.id, 'nama', pegawai1.nama, 'NIP', pegawai1.NIP, 'jabatan', pegawai1.jabatan, 'golongan', pegawai1.golongan) AS pegawai1,
    JSON_OBJECT('id', pegawai2.id, 'nama', pegawai2.nama, 'NIP', pegawai2.NIP, 'jabatan', pegawai2.jabatan, 'golongan', pegawai2.golongan) AS pegawai2,
    JSON_OBJECT('id', pegawai3.id, 'nama', pegawai3.nama, 'NIP', pegawai3.NIP, 'jabatan', pegawai3.jabatan, 'golongan', pegawai3.golongan) AS pegawai3,
    JSON_OBJECT('id', pegawai4.id, 'nama', pegawai4.nama, 'NIP', pegawai4.NIP, 'jabatan', pegawai4.jabatan, 'golongan', pegawai4.golongan) AS pegawai4,
    JSON_OBJECT('id', puskesmas.id, 'nama', puskesmas.nama, 'honorDis', puskesmas.honorDis, 'honorMon', puskesmas.honorMon) AS puskesmasId
    FROM keberangkatans
    LEFT JOIN pegawais AS pegawai1 ON keberangkatans.pegawai1Id = pegawai1.id
    LEFT JOIN pegawais AS pegawai2 ON keberangkatans.pegawai2Id = pegawai2.id
    LEFT JOIN pegawais AS pegawai3 ON keberangkatans.pegawai3Id = pegawai3.id
    LEFT JOIN pegawais AS pegawai4 ON keberangkatans.pegawai4Id = pegawai4.id
    LEFT JOIN puskesmas ON keberangkatans.puskesmasId = puskesmas.id
    ${whereClause}
    ORDER BY keberangkatans.keberangkatan DESC`;

    db.query(sql, [pegawai, pegawai, pegawai, pegawai], (err, result) => {
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
  printKwitansi: async (req, res) => {
    const calculateDaysDifference = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const millisecondsPerDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
      const difference = Math.abs(end - start);
      return Math.round(difference / millisecondsPerDay) + 1; // Adding 1 to include both start and end dates
    };

    const generateTahun = (tahun) => {
      const date = new Date(tahun);
      const year = date.getFullYear().toString();
      return year;
    };
    const {
      nomorSuratSPD,
      pegawai1Nama,
      pegawai1NIP,
      pegawai2Nama,
      pegawai2NIP,
      pegawai3Nama,
      pegawai4NIP,
      pegawai4Nama,
      pegawai3NIP,
      puskesmas,
      tipe,
      keberangkatan,
      pulang,
    } = req.body;

    console.log(req.body);
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", options);
    };
    try {
      const sourceFilePath = path.join(
        __dirname,
        "..",
        "assets",
        tipe == 1 ? "KWITANSI DIS.xlsx" : "KWITANSI MON.xlsx"
      );
      const daysDifference = calculateDaysDifference(keberangkatan, pulang);
      const downloadPath = app.getPath("downloads");
      const newFileName = `${
        tipe == 1 ? "KWITANSI_DISTRIBUSI" : "KWITANSI_MONITORING"
      }${Date.now()}.xlsx`;
      const newFilePath = path.join(downloadPath, newFileName);
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(sourceFilePath);

      const worksheet1 = workbook.getWorksheet("RINCIAN BPD");
      const worksheet2 = workbook.getWorksheet("RINCIAN BPD (2)");
      const worksheet3 = workbook.getWorksheet("RINCIAN BPD (3)");
      if (tipe == 2) {
        const worksheet4 = workbook.getWorksheet("RINCIAN BPD (4)");
        worksheet4.getCell("I27").value = pegawai4Nama;
        worksheet4.getCell("I28").value = pegawai4NIP;
        worksheet1.getCell("A1").value = daysDifference;
        console.log("YAAAAAAAAAAAA");
      }
      const worksheetKwit = workbook.getWorksheet("KWIT GLOBAL");
      worksheetKwit.getCell("I2").value = generateTahun(keberangkatan);
      worksheet1.getCell("G11").value =
        tipe == 1 ? puskesmas.honorDis : puskesmas.honorMon;
      worksheet1.getCell("D11").value = daysDifference;
      worksheet1.getCell("F6").value = formatDate(keberangkatan);
      worksheet1.getCell("F5").value = nomorSuratSPD;
      worksheet1.getCell("I27").value = pegawai1Nama;
      worksheet1.getCell("I28").value = pegawai1NIP;
      worksheet2.getCell("I27").value = pegawai2Nama;
      worksheet2.getCell("I28").value = pegawai2NIP;
      worksheet3.getCell("I27").value = pegawai3Nama;
      worksheet3.getCell("I28").value = pegawai3NIP;
      worksheetKwit.getCell(
        "D17"
      ).value = `Pembayaran Perjalanan dinas Dalam Kota, Dalam Rangka Distribusi Obat Ke ${puskesmas.nama}. Sub Kegiatan Distribusi Alat Kesehatan, Obat, Bahan Habis Pakai, Bahan Medis Habis Pakai, Vaksin, Makanan, Minuman ke fasilitas Kesehatan, pada UPTD Perbekalan Obat dan Alkes Kab.Paser. Sesuai Surat Tugas dan SPPD Terlampir.`;

      // Simpan perubahan ke file baru
      await workbook.xlsx.writeFile(newFilePath);
      return res.status(200).send("Data berhasil di cetak");
    } catch (error) {
      console.error("Error handling post request:", error);
      res.status(500).send("Terjadi kesalahan saat menangani permintaan.");
    }
  },

  editNomorSurat: async (req, res) => {
    console.log(req.body, `editSURATTTTTTTTTTTT`);
    const { nomorSuratTugas, nomorSuratNotaDinas, nomorSuratSPD, id } =
      req.body;
    const sql = `UPDATE keberangkatans SET nomorSuratNotaDinas = ?, nomorSuratSPD = ?, nomorSuratTugas = ? WHERE id = ?`;
    db.query(
      sql,
      [nomorSuratNotaDinas, nomorSuratSPD, nomorSuratTugas, id],
      (err, result) => {
        if (err) {
          console.error("Error updating data in database:", err);
          return res
            .status(500)
            .send("Terjadi kesalahan saat mengupdate data di database.");
        }
        res.status(200).send("Data berhasil diupdate di database.");
      }
    );
  },

  editTujuan: (req, res) => {
    const { puskesmasId, id } = req.body;
    console.log(req.body);

    const sql = `UPDATE keberangkatans SET puskesmasId = ? WHERE id = ?`;

    db.query(sql, [puskesmasId, id], (err, result) => {
      if (err) {
        console.error("Error mengganti puskesmas");
        return res
          .status(500)
          .send("terjadi kesalahan saat merubah data di database");
      }
      res.status(200).send("Data berhasil diupdate di database");
    });
  },
};
