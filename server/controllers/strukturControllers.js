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

    const sourceFilePathKwitansiMon = path.join(
      __dirname,
      "..",
      "assets",
      "KWITANSI MON.xlsx"
    );

    const sourceFilePathMonev = path.join(
      __dirname,
      "..",
      "assets",
      "MONITORING.xlsx"
    );

    const workbookDistribusi = new Excel.Workbook();
    const workbookKwitansiDis = new Excel.Workbook();
    const workbookKwitansiMon = new Excel.Workbook();
    const workbookMonev = new Excel.Workbook();

    if (id === 3) {
      workbookKwitansiDis.xlsx
        .readFile(sourceFilePathKwitansiDis)
        .then(() => {
          const worksheetKwitansiDis =
            workbookKwitansiDis.getWorksheet("RINCIAN BPD");

          worksheetKwitansiDis.getCell("B27").value = nama;
          worksheetKwitansiDis.getCell("B28").value = "NIP." + NIP;

          return workbookKwitansiDis.xlsx.writeFile(sourceFilePathKwitansiDis);
        })
        .then(() => {
          console.log("Data successfully updated in KWITANSI DISTRIBUSI.xlsx.");
        })
        .catch((error) => {
          console.error(
            "Error updating data in KWITANSI DISTIRBUSI.xlsx:",
            error
          );
        });

      workbookKwitansiMon.xlsx
        .readFile(sourceFilePathKwitansiMon)
        .then(() => {
          const worksheetKwitansiMon =
            workbookKwitansiMon.getWorksheet("RINCIAN BPD");

          worksheetKwitansiMon.getCell("B27").value = nama;
          worksheetKwitansiMon.getCell("B28").value = "NIP." + NIP;

          return workbookKwitansiMon.xlsx.writeFile(sourceFilePathKwitansiMon);
        })
        .then(() => {
          console.log("Data successfully updated in KWITANSI MONITORING.xlsx.");
        })
        .catch((error) => {
          console.error(
            "Error updating data in KWITANSI MONITORING.xlsx:",
            error
          );
        });
    }

    if (id === 2) {
      workbookMonev.xlsx
        .readFile(sourceFilePathMonev)
        .then(() => {
          const worksheetMonev = workbookMonev.getWorksheet("NOTA DINAS");

          worksheetMonev.getCell("H53").value = nama;
          worksheetMonev.getCell("H54").value = "NIP." + NIP;

          return workbookMonev.xlsx.writeFile(sourceFilePathMonev);
        })
        .then(() => {
          console.log("Data successfully updated in MONITORING.xlsx.");
        })
        .catch((error) => {
          console.error("Error updating data in MONITORING.xlsx:", error);
        });

      workbookDistribusi.xlsx
        .readFile(sourceFilePathDistribusi)
        .then(() => {
          const worksheetDistribusi =
            workbookDistribusi.getWorksheet("NOTA DINAS");

          // Assuming you have the updated data in variables nama, NIP
          worksheetDistribusi.getCell("H55").value = nama;
          worksheetDistribusi.getCell("H56").value = "NIP." + NIP;

          return workbookDistribusi.xlsx.writeFile(sourceFilePathDistribusi);
        })
        .then(() => {
          console.log("Data successfully updated in DISTRIBUSI.xlsx.");
        })
        .catch((error) => {
          console.error("Error updating data in DISTRIBUSI.xlsx:", error);
        });

      workbookKwitansiDis.xlsx
        .readFile(sourceFilePathKwitansiDis)
        .then(() => {
          const worksheetKwitansiDis =
            workbookKwitansiDis.getWorksheet("KWIT GLOBAL");

          worksheetKwitansiDis.getCell("A28").value = nama;
          worksheetKwitansiDis.getCell("A29").value = "NIP." + NIP;

          return workbookKwitansiDis.xlsx.writeFile(sourceFilePathKwitansiDis);
        })
        .then(() => {
          console.log("Data successfully updated in KWITANSI DISTRIBUSI.xlsx.");
        })
        .catch((error) => {
          console.error(
            "Error updating data in KWITANSI DISTIRBUSI.xlsx:",
            error
          );
        });

      workbookKwitansiMon.xlsx
        .readFile(sourceFilePathKwitansiMon)
        .then(() => {
          const worksheetKwitansiMon =
            workbookKwitansiMon.getWorksheet("KWIT GLOBAL");

          worksheetKwitansiMon.getCell("A28").value = nama;
          worksheetKwitansiMon.getCell("A29").value = "NIP." + NIP;

          return workbookKwitansiMon.xlsx.writeFile(sourceFilePathKwitansiMon);
        })
        .then(() => {
          console.log("Data successfully updated in KWITANSI MONITORING.xlsx.");
        })
        .catch((error) => {
          console.error(
            "Error updating data in KWITANSI MONITOIRNG.xlsx:",
            error
          );
        });
    }

    if (id === 1) {
      workbookMonev.xlsx
        .readFile(sourceFilePathMonev)
        .then(() => {
          const worksheetMonev = workbookMonev.getWorksheet("SURTUG");

          worksheetMonev.getCell("G53").value = nama;
          worksheetMonev.getCell("G54").value = "NIP." + NIP;

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
          worksheetKwitansiDis.getCell("A40").value = "NIP." + NIP;

          return workbookKwitansiDis.xlsx.writeFile(sourceFilePathKwitansiDis);
        })
        .then(() => {
          console.log("Data successfully updated in REKAP.xlsx.");
        })
        .catch((error) => {
          console.error("Error updating data in REKAP.xlsx:", error);
        });

      workbookKwitansiMon.xlsx
        .readFile(sourceFilePathKwitansiMon)
        .then(() => {
          const worksheetKwitansiMon =
            workbookKwitansiMon.getWorksheet("RINCIAN BPD");

          worksheetKwitansiMon.getCell("A39").value = nama;
          worksheetKwitansiMon.getCell("A40").value = "NIP." + NIP;

          return workbookKwitansiMon.xlsx.writeFile(sourceFilePathKwitansiMon);
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
          worksheetDistribusi.getCell("G51").value = "NIP." + NIP;

          return workbookDistribusi.xlsx.writeFile(sourceFilePathDistribusi);
        })
        .then(() => {
          console.log("Data successfully updated in DISTRIBUSI.xlsx.");
        })
        .catch((error) => {
          console.error("Error updating data in DISTRIBUSI.xlsx:", error);
        });
    }
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
