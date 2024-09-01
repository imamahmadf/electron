const { db } = require("../database");
const Excel = require("exceljs");
const path = require("path");
module.exports = {
  getAll: (req, res) => {
    let sqlGet = `select * from banks`;

    db.query(sqlGet, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },
  editBank: (req, res) => {
    console.log(req.body, "BANKKKKKK");
    const { id, nama, rekening, tipe } = req.body;

    if (tipe === 1) {
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
      const workbookDistribusi = new Excel.Workbook();
      const workbookKwitansiDis = new Excel.Workbook();

      workbookDistribusi.xlsx
        .readFile(sourceFilePathDistribusi)
        .then(() => {
          const worksheetDistribusi =
            workbookDistribusi.getWorksheet("NOTA DINAS");

          worksheetDistribusi.getCell("H42").value = rekening;

          return workbookDistribusi.xlsx.writeFile(sourceFilePathDistribusi);
        })
        .then(() => {
          console.log("Data successfully updated in DISTRIBUSI.xlsx.");
        })
        .catch((error) => {
          console.error("Error updating data in DISTRIBUSI.xlsx:", error);
        });
      // ////////////////////////////////
      workbookKwitansiDis.xlsx
        .readFile(sourceFilePathKwitansiDis)
        .then(() => {
          const worksheetKwitansiDis =
            workbookKwitansiDis.getWorksheet("KWIT GLOBAL");

          worksheetKwitansiDis.getCell("I3").value = rekening;

          return workbookKwitansiDis.xlsx.writeFile(sourceFilePathKwitansiDis);
        })
        .then(() => {
          console.log("Data successfully updated in REKAP.xlsx.");
        })
        .catch((error) => {
          console.error("Error updating data in REKAP.xlsx:", error);
        });
    }

    // //////////////////////////

    if (tipe === 2) {
      const sourceFilePathMonev = path.join(
        __dirname,
        "..",
        "assets",
        "MONITORING.xlsx"
      );

      const workbookMonev = new Excel.Workbook();

      workbookMonev.xlsx
        .readFile(sourceFilePathMonev)
        .then(() => {
          const worksheetMonev = workbookMonev.getWorksheet("NOTA DINAS");

          worksheetMonev.getCell("H42").value = rekening;

          return workbookMonev.xlsx.writeFile(sourceFilePathMonev);
        })
        .then(() => {
          console.log("Data successfully updated in MONITORING.xlsx.");
        })
        .catch((error) => {
          console.error("Error updating data in MONITORING.xlsx:", error);
        });
    }

    const sql = `UPDATE banks SET nama = ?, rekening = ? WHERE id = ?`;
    db.query(sql, [nama, rekening, id], (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send("terjadi kesalahan saat mengupdate data di database.");
      }
      res.status(200).send("Data berhasil diupdate di database.");
    });
  },
};
