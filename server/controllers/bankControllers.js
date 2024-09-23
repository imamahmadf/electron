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
          const worksheetDistribusiSPD = workbookDistribusi.getWorksheet("SPD");
          const worksheetDistribusiSPD2 =
            workbookDistribusi.getWorksheet("SPD (2)");
          const worksheetDistribusiSPD3 =
            workbookDistribusi.getWorksheet("SPD (3)");

          worksheetDistribusi.getCell("H42").value = rekening;
          worksheetDistribusi.getCell("T42").value = rekening;
          worksheetDistribusiSPD.getCell("E30").value = rekening;
          worksheetDistribusiSPD.getCell("P30").value = rekening;

          worksheetDistribusiSPD2.getCell("E30").value = rekening;
          worksheetDistribusiSPD2.getCell("P30").value = rekening;

          worksheetDistribusiSPD3.getCell("E30").value = rekening;
          worksheetDistribusiSPD3.getCell("P30").value = rekening;

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
          const worksheetKwitansiDis2 =
            workbookKwitansiDis.getWorksheet("KWIT GLOBAL (2)");
          const worksheetKwitansiDis3 =
            workbookKwitansiDis.getWorksheet("KWIT GLOBAL (3)");

          worksheetKwitansiDis.getCell("I3").value = rekening;
          worksheetKwitansiDis.getCell("V3").value = rekening;

          worksheetKwitansiDis2.getCell("I3").value = rekening;
          worksheetKwitansiDis2.getCell("V3").value = rekening;

          worksheetKwitansiDis3.getCell("I3").value = rekening;
          worksheetKwitansiDis3.getCell("V3").value = rekening;

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
          const worksheetMonevSPD = workbookMonev.getWorksheet("SPD");
          const worksheetMonevSPD2 = workbookMonev.getWorksheet("SPD (2)");
          const worksheetMonevSPD3 = workbookMonev.getWorksheet("SPD (3)");
          const worksheetMonevSPD4 = workbookMonev.getWorksheet("SPD (4)");

          worksheetMonev.getCell("H42").value = rekening;
          worksheetMonev.getCell("T42").value = rekening;

          worksheetMonevSPD.getCell("E30").value = rekening;
          worksheetMonevSPD.getCell("P30").value = rekening;

          worksheetMonevSPD2.getCell("E30").value = rekening;
          worksheetMonevSPD2.getCell("P30").value = rekening;

          worksheetMonevSPD3.getCell("E30").value = rekening;
          worksheetMonevSPD3.getCell("P30").value = rekening;

          worksheetMonevSPD4.getCell("E30").value = rekening;
          worksheetMonevSPD4.getCell("P30").value = rekening;

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
