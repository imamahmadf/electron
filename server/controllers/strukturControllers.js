const { db } = require("../database");
const Excel = require("exceljs");
const path = require("path");
module.exports = {
  getAll: (req, res) => {
    console.log(req.body);

    let sqlGet = `SELECT id, nama, jabatan, NIP FROM strukturs`;
    db.query(sqlGet, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },
  editStruktur: (req, res) => {
    console.log(req.body);
    const { nama, NIP, id } = req.body;

    const sourceFilePathDistribusi = path.join(
      __dirname,
      "..",
      "assets",
      "DISTRIBUSI.xlsx"
    );
    const sourceFilePathKwitansiDis = path.join(
      __dirname,
      "..",
      "assets",
      "KWITANSI DIS.xlsx"
    );

    const sourceFilePathMonev = path.join(
      __dirname,
      "..",
      "assets",
      "MONITORING.xlsx"
    );

    const workbookDistribusi = new Excel.Workbook();
    const workbookKwitansiDis = new Excel.Workbook();
    const workbookMonev = new Excel.Workbook();

    workbookMonev.xlsx
      .readFile(sourceFilePathMonev)
      .then(() => {
        const worksheetMonev = workbookMonev.getWorksheet("SURTUG");

        worksheetMonev.getCell("G53").value = nama;
        worksheetMonev.getCell("G54").value = NIP;

        return workbookMonev.xlsx.writeFile(sourceFilePathMonev);
      })
      .then(() => {
        console.log("Data successfully updated in REKAP.xlsx.");
      })
      .catch((error) => {
        console.error("Error updating data in REKAP.xlsx:", error);
      });

    workbookKwitansiDis.xlsx
      .readFile(sourceFilePathKwitansiDis)
      .then(() => {
        const worksheetKwitansiDis =
          workbookKwitansiDis.getWorksheet("RINCIAN BPD");

        worksheetKwitansiDis.getCell("A39").value = nama;
        worksheetKwitansiDis.getCell("A40").value = NIP;

        return workbookKwitansiDis.xlsx.writeFile(sourceFilePathKwitansiDis);
      })
      .then(() => {
        console.log("Data successfully updated in REKAP.xlsx.");
      })
      .catch((error) => {
        console.error("Error updating data in REKAP.xlsx:", error);
      });

    workbookDistribusi.xlsx
      .readFile(sourceFilePathDistribusi)
      .then(() => {
        const worksheetDistribusi = workbookDistribusi.getWorksheet("SURTUG");

        // Assuming you have the updated data in variables nama, NIP
        worksheetDistribusi.getCell("G50").value = nama;
        worksheetDistribusi.getCell("G51").value = NIP;

        return workbookDistribusi.xlsx.writeFile(sourceFilePathDistribusi);
      })
      .then(() => {
        console.log("Data successfully updated in DISTRIBUSI.xlsx.");
      })
      .catch((error) => {
        console.error("Error updating data in DISTRIBUSI.xlsx:", error);
      });
    const sql = `UPDATE strukturs SET nama = ?, NIP = ? WHERE id = ?`;

    db.query(sql, [nama, NIP, id], (err, result) => {
      if (err) {
        console.error("Error updating data in database:", err);
        return res
          .status(500)
          .send("Terjadi kesalahan saat mengupdate data di database.");
      }
      res.status(200).send("Data berhasil diupdate di database.");
    });
  },
};
