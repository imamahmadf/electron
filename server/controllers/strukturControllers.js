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
    // /////BENDAHARA ////////////
    if (id === 3) {
      workbookKwitansiDis.xlsx
        .readFile(sourceFilePathKwitansiDis)
        .then(() => {
          // BENDAHARA KWITANSI DISTRIBUSI //////////////

          const worksheetKwitansiDisGlo =
            workbookKwitansiDis.getWorksheet("KWIT GLOBAL");
          const worksheetKwitansiDisGlo2 =
            workbookKwitansiDis.getWorksheet("KWIT GLOBAL (2)");
          const worksheetKwitansiDisGlo3 =
            workbookKwitansiDis.getWorksheet("KWIT GLOBAL (3)");

          worksheetKwitansiDisGlo.getCell("G37").value = nama;
          worksheetKwitansiDisGlo.getCell("G38").value = "NIP." + NIP;
          worksheetKwitansiDisGlo.getCell("T37").value = nama;
          worksheetKwitansiDisGlo.getCell("T38").value = "NIP." + NIP;

          worksheetKwitansiDisGlo.getCell("G101").value = nama;
          worksheetKwitansiDisGlo.getCell("G102").value = "NIP." + NIP;
          worksheetKwitansiDisGlo.getCell("T101").value = nama;
          worksheetKwitansiDisGlo.getCell("T102").value = "NIP." + NIP;

          worksheetKwitansiDisGlo2.getCell("G37").value = nama;
          worksheetKwitansiDisGlo2.getCell("G38").value = "NIP." + NIP;
          worksheetKwitansiDisGlo2.getCell("T37").value = nama;
          worksheetKwitansiDisGlo2.getCell("T38").value = "NIP." + NIP;

          worksheetKwitansiDisGlo2.getCell("G101").value = nama;
          worksheetKwitansiDisGlo2.getCell("G102").value = "NIP." + NIP;
          worksheetKwitansiDisGlo2.getCell("T101").value = nama;
          worksheetKwitansiDisGlo2.getCell("T102").value = "NIP." + NIP;

          worksheetKwitansiDisGlo3.getCell("G37").value = nama;
          worksheetKwitansiDisGlo3.getCell("G38").value = "NIP." + NIP;
          worksheetKwitansiDisGlo3.getCell("T37").value = nama;
          worksheetKwitansiDisGlo3.getCell("T38").value = "NIP." + NIP;

          worksheetKwitansiDisGlo3.getCell("G101").value = nama;
          worksheetKwitansiDisGlo3.getCell("G102").value = "NIP." + NIP;
          worksheetKwitansiDisGlo3.getCell("T101").value = nama;
          worksheetKwitansiDisGlo3.getCell("T102").value = "NIP." + NIP;

          worksheetKwitansiDisGlo.getCell("AB27").value = nama;
          worksheetKwitansiDisGlo.getCell("AB28").value = "NIP." + NIP;
          worksheetKwitansiDisGlo.getCell("AB91").value = nama;
          worksheetKwitansiDisGlo.getCell("AB92").value = "NIP." + NIP;

          worksheetKwitansiDisGlo2.getCell("AB27").value = nama;
          worksheetKwitansiDisGlo2.getCell("AB28").value = "NIP." + NIP;
          worksheetKwitansiDisGlo2.getCell("AB91").value = nama;
          worksheetKwitansiDisGlo2.getCell("AB92").value = "NIP." + NIP;

          worksheetKwitansiDisGlo3.getCell("AB27").value = nama;
          worksheetKwitansiDisGlo3.getCell("AB28").value = "NIP." + NIP;
          worksheetKwitansiDisGlo3.getCell("AB91").value = nama;
          worksheetKwitansiDisGlo3.getCell("AB92").value = "NIP." + NIP;

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
      // BENDAHARA KWITANSI DISTRIBUSI //////////////
      // BENDAHARA KWITANSI MONEV //////////////
      workbookKwitansiMon.xlsx
        .readFile(sourceFilePathKwitansiMon)
        .then(() => {
          const worksheetKwitansiMonGlo =
            workbookKwitansiMon.getWorksheet("KWIT GLOBAL");
          const worksheetKwitansiMonGlo4 =
            workbookKwitansiMon.getWorksheet("KWIT GLOBAL (4)");
          const worksheetKwitansiMonGlo2 =
            workbookKwitansiMon.getWorksheet("KWIT GLOBAL (2)");
          const worksheetKwitansiMonGlo3 =
            workbookKwitansiMon.getWorksheet("KWIT GLOBAL (3)");

          worksheetKwitansiMonGlo.getCell("G37").value = nama;
          worksheetKwitansiMonGlo.getCell("G38").value = "NIP. " + NIP;
          worksheetKwitansiMonGlo.getCell("T37").value = nama;
          worksheetKwitansiMonGlo.getCell("T38").value = "NIP. " + NIP;
          worksheetKwitansiMonGlo.getCell("G101").value = nama;
          worksheetKwitansiMonGlo.getCell("G102").value = "NIP. " + NIP;
          worksheetKwitansiMonGlo.getCell("T101").value = nama;
          worksheetKwitansiMonGlo.getCell("T102").value = "NIP. " + NIP;

          worksheetKwitansiMonGlo2.getCell("G37").value = nama;
          worksheetKwitansiMonGlo2.getCell("G38").value = "NIP. " + NIP;
          worksheetKwitansiMonGlo2.getCell("T37").value = nama;
          worksheetKwitansiMonGlo2.getCell("T38").value = "NIP. " + NIP;
          worksheetKwitansiMonGlo2.getCell("G101").value = nama;
          worksheetKwitansiMonGlo2.getCell("G102").value = "NIP. " + NIP;
          worksheetKwitansiMonGlo2.getCell("T101").value = nama;
          worksheetKwitansiMonGlo2.getCell("T102").value = "NIP. " + NIP;

          worksheetKwitansiMonGlo3.getCell("G37").value = nama;
          worksheetKwitansiMonGlo3.getCell("G38").value = "NIP. " + NIP;
          worksheetKwitansiMonGlo3.getCell("T37").value = nama;
          worksheetKwitansiMonGlo3.getCell("T38").value = "NIP. " + NIP;
          worksheetKwitansiMonGlo3.getCell("G101").value = nama;
          worksheetKwitansiMonGlo3.getCell("G102").value = "NIP. " + NIP;
          worksheetKwitansiMonGlo3.getCell("T101").value = nama;
          worksheetKwitansiMonGlo3.getCell("T102").value = "NIP. " + NIP;

          worksheetKwitansiMonGlo4.getCell("G37").value = nama;
          worksheetKwitansiMonGlo4.getCell("G38").value = "NIP. " + NIP;
          worksheetKwitansiMonGlo4.getCell("T37").value = nama;
          worksheetKwitansiMonGlo4.getCell("T38").value = "NIP. " + NIP;
          worksheetKwitansiMonGlo4.getCell("G101").value = nama;
          worksheetKwitansiMonGlo4.getCell("G102").value = "NIP. " + NIP;
          worksheetKwitansiMonGlo4.getCell("T101").value = nama;
          worksheetKwitansiMonGlo4.getCell("T102").value = "NIP. " + NIP;
          worksheetKwitansiMonGlo.getCell("AB27").value = nama;
          worksheetKwitansiMonGlo.getCell("AB28").value = "NIP." + NIP;
          worksheetKwitansiMonGlo.getCell("AB91").value = nama;
          worksheetKwitansiMonGlo.getCell("AB92").value = "NIP." + NIP;

          worksheetKwitansiMonGlo2.getCell("AB27").value = nama;
          worksheetKwitansiMonGlo2.getCell("AB28").value = "NIP." + NIP;
          worksheetKwitansiMonGlo2.getCell("AB91").value = nama;
          worksheetKwitansiMonGlo2.getCell("AB92").value = "NIP." + NIP;

          worksheetKwitansiMonGlo3.getCell("AB27").value = nama;
          worksheetKwitansiMonGlo3.getCell("AB28").value = "NIP." + NIP;
          worksheetKwitansiMonGlo3.getCell("AB91").value = nama;
          worksheetKwitansiMonGlo3.getCell("AB92").value = "NIP." + NIP;

          worksheetKwitansiMonGlo4.getCell("AB27").value = nama;
          worksheetKwitansiMonGlo4.getCell("AB28").value = "NIP." + NIP;
          worksheetKwitansiMonGlo4.getCell("AB91").value = nama;
          worksheetKwitansiMonGlo4.getCell("AB92").value = "NIP." + NIP;

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
      // BENDAHARA KWITANSI MONEV //////////////
    }
    // /////BENDAHARA ////////////
    // /////KTU ////////////
    if (id === 2) {
      workbookMonev.xlsx
        .readFile(sourceFilePathMonev)
        .then(() => {
          // /////KTU MONEV ////////////
          const worksheetMonev = workbookMonev.getWorksheet("NOTA DINAS");

          worksheetMonev.getCell("H53").value = nama;
          worksheetMonev.getCell("H54").value = "NIP." + NIP;
          worksheetMonev.getCell("T53").value = nama;
          worksheetMonev.getCell("T54").value = "NIP." + NIP;

          return workbookMonev.xlsx.writeFile(sourceFilePathMonev);
        })
        .then(() => {
          console.log("Data successfully updated in MONITORING.xlsx.");
        })
        .catch((error) => {
          console.error("Error updating data in MONITORING.xlsx:", error);
        });
      // /////KTU MONEV ////////////
      // /////KTU DISTRIBUSI ////////////
      workbookDistribusi.xlsx
        .readFile(sourceFilePathDistribusi)
        .then(() => {
          const worksheetDistribusi =
            workbookDistribusi.getWorksheet("NOTA DINAS");

          // Assuming you have the updated data in variables nama, NIP
          worksheetDistribusi.getCell("H55").value = nama;
          worksheetDistribusi.getCell("H56").value = "NIP." + NIP;
          worksheetDistribusi.getCell("T55").value = nama;
          worksheetDistribusi.getCell("T56").value = "NIP." + NIP;

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

          const worksheetKwitansiDis2 =
            workbookKwitansiDis.getWorksheet("KWIT GLOBAL (2)");
          const worksheetKwitansiDis3 =
            workbookKwitansiDis.getWorksheet("KWIT GLOBAL (3)");

          worksheetKwitansiDis.getCell("A28").value = nama;
          worksheetKwitansiDis.getCell("A29").value = "NIP." + NIP;
          worksheetKwitansiDis.getCell("N28").value = nama;
          worksheetKwitansiDis.getCell("N29").value = "NIP." + NIP;

          worksheetKwitansiDis.getCell("A92").value = nama;
          worksheetKwitansiDis.getCell("A93").value = "NIP." + NIP;
          worksheetKwitansiDis.getCell("N92").value = nama;
          worksheetKwitansiDis.getCell("N93").value = "NIP." + NIP;

          worksheetKwitansiDis2.getCell("A28").value = nama;
          worksheetKwitansiDis2.getCell("A29").value = "NIP." + NIP;
          worksheetKwitansiDis2.getCell("N28").value = nama;
          worksheetKwitansiDis2.getCell("N29").value = "NIP." + NIP;

          worksheetKwitansiDis2.getCell("A92").value = nama;
          worksheetKwitansiDis2.getCell("A93").value = "NIP." + NIP;
          worksheetKwitansiDis2.getCell("N92").value = nama;
          worksheetKwitansiDis2.getCell("N93").value = "NIP." + NIP;

          worksheetKwitansiDis3.getCell("A28").value = nama;
          worksheetKwitansiDis3.getCell("A29").value = "NIP." + NIP;
          worksheetKwitansiDis3.getCell("N28").value = nama;
          worksheetKwitansiDis3.getCell("N29").value = "NIP." + NIP;

          worksheetKwitansiDis3.getCell("A92").value = nama;
          worksheetKwitansiDis3.getCell("A93").value = "NIP." + NIP;
          worksheetKwitansiDis3.getCell("N92").value = nama;
          worksheetKwitansiDis3.getCell("N93").value = "NIP." + NIP;

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
          const worksheetKwitansiMon2 =
            workbookKwitansiMon.getWorksheet("KWIT GLOBAL (2)");
          const worksheetKwitansiMon3 =
            workbookKwitansiMon.getWorksheet("KWIT GLOBAL (3)");
          const worksheetKwitansiMon4 =
            workbookKwitansiMon.getWorksheet("KWIT GLOBAL (4)");

          worksheetKwitansiMon.getCell("AN33").value = nama;
          worksheetKwitansiMon.getCell("AN34").value = "NIP." + NIP;
          worksheetKwitansiMon.getCell("AN97").value = nama;
          worksheetKwitansiMon.getCell("AN98").value = "NIP." + NIP;

          worksheetKwitansiMon2.getCell("AN33").value = nama;
          worksheetKwitansiMon2.getCell("AN34").value = "NIP." + NIP;
          worksheetKwitansiMon2.getCell("AN97").value = nama;
          worksheetKwitansiMon2.getCell("AN98").value = "NIP." + NIP;

          worksheetKwitansiMon3.getCell("AN33").value = nama;
          worksheetKwitansiMon3.getCell("AN34").value = "NIP." + NIP;
          worksheetKwitansiMon3.getCell("AN97").value = nama;
          worksheetKwitansiMon3.getCell("AN98").value = "NIP." + NIP;

          worksheetKwitansiMon4.getCell("AN33").value = nama;
          worksheetKwitansiMon4.getCell("AN34").value = "NIP." + NIP;
          worksheetKwitansiMon4.getCell("AN97").value = nama;
          worksheetKwitansiMon4.getCell("AN98").value = "NIP." + NIP;

          worksheetKwitansiMon.getCell("A28").value = nama;
          worksheetKwitansiMon.getCell("A29").value = "NIP." + NIP;
          worksheetKwitansiMon.getCell("N28").value = nama;
          worksheetKwitansiMon.getCell("N29").value = "NIP." + NIP;

          worksheetKwitansiMon.getCell("A92").value = nama;
          worksheetKwitansiMon.getCell("A93").value = "NIP." + NIP;
          worksheetKwitansiMon.getCell("N92").value = nama;
          worksheetKwitansiMon.getCell("N93").value = "NIP." + NIP;

          worksheetKwitansiMon2.getCell("A28").value = nama;
          worksheetKwitansiMon2.getCell("A29").value = "NIP." + NIP;
          worksheetKwitansiMon2.getCell("N28").value = nama;
          worksheetKwitansiMon2.getCell("N29").value = "NIP." + NIP;

          worksheetKwitansiMon2.getCell("A92").value = nama;
          worksheetKwitansiMon2.getCell("A93").value = "NIP." + NIP;
          worksheetKwitansiMon2.getCell("N92").value = nama;
          worksheetKwitansiMon2.getCell("N93").value = "NIP." + NIP;

          worksheetKwitansiMon3.getCell("A28").value = nama;
          worksheetKwitansiMon3.getCell("A29").value = "NIP." + NIP;
          worksheetKwitansiMon3.getCell("N28").value = nama;
          worksheetKwitansiMon3.getCell("N29").value = "NIP." + NIP;

          worksheetKwitansiMon3.getCell("A92").value = nama;
          worksheetKwitansiMon3.getCell("A93").value = "NIP." + NIP;
          worksheetKwitansiMon3.getCell("N92").value = nama;
          worksheetKwitansiMon3.getCell("N93").value = "NIP." + NIP;

          worksheetKwitansiMon4.getCell("A28").value = nama;
          worksheetKwitansiMon4.getCell("A29").value = "NIP." + NIP;
          worksheetKwitansiMon4.getCell("N28").value = nama;
          worksheetKwitansiMon4.getCell("N29").value = "NIP." + NIP;

          worksheetKwitansiMon4.getCell("A92").value = nama;
          worksheetKwitansiMon4.getCell("A93").value = "NIP." + NIP;
          worksheetKwitansiMon4.getCell("N92").value = nama;
          worksheetKwitansiMon4.getCell("N93").value = "NIP." + NIP;

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
    // /////KTU ////////////
    // /////KA GUDANG ////////////
    if (id === 1) {
      workbookMonev.xlsx
        .readFile(sourceFilePathMonev)
        .then(() => {
          const worksheetMonev = workbookMonev.getWorksheet("SURTUG");
          const worksheetMonevVisum = workbookMonev.getWorksheet("visum");
          const worksheetMonevSPD = workbookMonev.getWorksheet("SPD");
          const worksheetMonevSPD2 = workbookMonev.getWorksheet("SPD (2)");
          const worksheetMonevSPD3 = workbookMonev.getWorksheet("SPD (3)");
          const worksheetMonevSPD4 = workbookMonev.getWorksheet("SPD (4)");

          const worksheetMonevLap = workbookMonev.getWorksheet("Lap");

          worksheetMonev.getCell("G53").value = nama;
          worksheetMonev.getCell("G54").value = "NIP." + NIP;

          worksheetMonev.getCell("R53").value = nama;
          worksheetMonev.getCell("R54").value = "NIP." + NIP;

          worksheetMonevVisum.getCell("E35").value = nama;
          worksheetMonevVisum.getCell("E36").value = "NIP." + NIP;

          worksheetMonevVisum.getCell("R35").value = nama;
          worksheetMonevVisum.getCell("R36").value = "NIP." + NIP;

          worksheetMonevVisum.getCell("AE35").value = nama;
          worksheetMonevVisum.getCell("AE36").value = "NIP." + NIP;

          worksheetMonevVisum.getCell("E79").value = nama;
          worksheetMonevVisum.getCell("E80").value = "NIP." + NIP;

          worksheetMonevVisum.getCell("R79").value = nama;
          worksheetMonevVisum.getCell("R80").value = "NIP." + NIP;

          worksheetMonevVisum.getCell("AE79").value = nama;
          worksheetMonevVisum.getCell("AE80").value = "NIP." + NIP;

          worksheetMonevVisum.getCell("E123").value = nama;
          worksheetMonevVisum.getCell("E124").value = "NIP." + NIP;

          worksheetMonevVisum.getCell("R123").value = nama;
          worksheetMonevVisum.getCell("R124").value = "NIP." + NIP;

          worksheetMonevSPD.getCell("E40").value = nama;
          worksheetMonevSPD.getCell("E41").value = "NIP." + NIP;
          worksheetMonevSPD.getCell("P40").value = nama;
          worksheetMonevSPD.getCell("P41").value = "NIP." + NIP;

          worksheetMonevSPD2.getCell("E40").value = nama;
          worksheetMonevSPD2.getCell("E41").value = "NIP." + NIP;
          worksheetMonevSPD2.getCell("P40").value = nama;
          worksheetMonevSPD2.getCell("P41").value = "NIP." + NIP;

          worksheetMonevSPD3.getCell("E40").value = nama;
          worksheetMonevSPD3.getCell("E41").value = "NIP." + NIP;
          worksheetMonevSPD3.getCell("P40").value = nama;
          worksheetMonevSPD3.getCell("P41").value = "NIP." + NIP;

          worksheetMonevSPD4.getCell("E40").value = nama;
          worksheetMonevSPD4.getCell("E41").value = "NIP." + NIP;
          worksheetMonevSPD4.getCell("P40").value = nama;
          worksheetMonevSPD4.getCell("P41").value = "NIP." + NIP;

          worksheetMonevLap.getCell("B48").value = nama;
          worksheetMonevLap.getCell("B49").value = "NIP." + NIP;
          worksheetMonevLap.getCell("N48").value = nama;
          worksheetMonevLap.getCell("N49").value = "NIP." + NIP;

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
          const worksheetKwitansiDisGlo =
            workbookKwitansiDis.getWorksheet("KWIT GLOBAL");
          const worksheetKwitansiDisGlo2 =
            workbookKwitansiDis.getWorksheet("KWIT GLOBAL (2)");
          const worksheetKwitansiDisGlo3 =
            workbookKwitansiDis.getWorksheet("KWIT GLOBAL (3)");

          worksheetKwitansiDisGlo.getCell("AA39").value = nama;
          worksheetKwitansiDisGlo.getCell("AA40").value = "NIP." + NIP;
          worksheetKwitansiDisGlo.getCell("AA103").value = nama;
          worksheetKwitansiDisGlo.getCell("AA104").value = "NIP." + NIP;

          worksheetKwitansiDisGlo2.getCell("AA39").value = nama;
          worksheetKwitansiDisGlo2.getCell("AA40").value = "NIP." + NIP;
          worksheetKwitansiDisGlo2.getCell("AA103").value = nama;
          worksheetKwitansiDisGlo2.getCell("AA104").value = "NIP." + NIP;

          worksheetKwitansiDisGlo3.getCell("AA39").value = nama;
          worksheetKwitansiDisGlo3.getCell("AA40").value = "NIP." + NIP;
          worksheetKwitansiDisGlo3.getCell("AA103").value = nama;
          worksheetKwitansiDisGlo3.getCell("AA104").value = "NIP." + NIP;

          worksheetKwitansiDisGlo.getCell("A37").value = nama;
          worksheetKwitansiDisGlo.getCell("A38").value = "NIP." + NIP;
          worksheetKwitansiDisGlo.getCell("N37").value = nama;
          worksheetKwitansiDisGlo.getCell("N38").value = "NIP." + NIP;

          worksheetKwitansiDisGlo.getCell("A101").value = nama;
          worksheetKwitansiDisGlo.getCell("A102").value = "NIP." + NIP;
          worksheetKwitansiDisGlo.getCell("N101").value = nama;
          worksheetKwitansiDisGlo.getCell("N102").value = "NIP." + NIP;

          worksheetKwitansiDisGlo2.getCell("A37").value = nama;
          worksheetKwitansiDisGlo2.getCell("A38").value = "NIP." + NIP;
          worksheetKwitansiDisGlo2.getCell("N37").value = nama;
          worksheetKwitansiDisGlo2.getCell("N38").value = "NIP." + NIP;

          worksheetKwitansiDisGlo2.getCell("A101").value = nama;
          worksheetKwitansiDisGlo2.getCell("A102").value = "NIP." + NIP;
          worksheetKwitansiDisGlo2.getCell("N101").value = nama;
          worksheetKwitansiDisGlo2.getCell("N102").value = "NIP." + NIP;

          worksheetKwitansiDisGlo3.getCell("A37").value = nama;
          worksheetKwitansiDisGlo3.getCell("A38").value = "NIP." + NIP;
          worksheetKwitansiDisGlo3.getCell("N37").value = nama;
          worksheetKwitansiDisGlo3.getCell("N38").value = "NIP." + NIP;

          worksheetKwitansiDisGlo3.getCell("A101").value = nama;
          worksheetKwitansiDisGlo3.getCell("A102").value = "NIP." + NIP;
          worksheetKwitansiDisGlo3.getCell("N101").value = nama;
          worksheetKwitansiDisGlo3.getCell("N102").value = "NIP." + NIP;

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
          const worksheetKwitansiMon2 =
            workbookKwitansiMon.getWorksheet("RINCIAN BPD (2)");
          const worksheetKwitansiMon3 =
            workbookKwitansiMon.getWorksheet("RINCIAN BPD (3)");
          const worksheetKwitansiMon4 =
            workbookKwitansiMon.getWorksheet("RINCIAN BPD (4)");

          const worksheetKwitansiMonGlo =
            workbookKwitansiMon.getWorksheet("KWIT GLOBAL");
          const worksheetKwitansiMonGlo2 =
            workbookKwitansiMon.getWorksheet("KWIT GLOBAL (2)");
          const worksheetKwitansiMonGlo3 =
            workbookKwitansiMon.getWorksheet("KWIT GLOBAL (3)");
          const worksheetKwitansiMonGlo4 =
            workbookKwitansiMon.getWorksheet("KWIT GLOBAL (4)");

          worksheetKwitansiMonGlo.getCell("AA39").value = nama;
          worksheetKwitansiMonGlo.getCell("AA40").value = "NIP." + NIP;
          worksheetKwitansiMonGlo.getCell("AA103").value = nama;
          worksheetKwitansiMonGlo.getCell("AA104").value = "NIP." + NIP;

          worksheetKwitansiMonGlo2.getCell("AA39").value = nama;
          worksheetKwitansiMonGlo2.getCell("AA40").value = "NIP." + NIP;
          worksheetKwitansiMonGlo2.getCell("AA103").value = nama;
          worksheetKwitansiMonGlo2.getCell("AA104").value = "NIP." + NIP;

          worksheetKwitansiMonGlo3.getCell("AA39").value = nama;
          worksheetKwitansiMonGlo3.getCell("AA40").value = "NIP." + NIP;
          worksheetKwitansiMonGlo3.getCell("AA103").value = nama;
          worksheetKwitansiMonGlo3.getCell("AA104").value = "NIP." + NIP;

          worksheetKwitansiMonGlo4.getCell("AA39").value = nama;
          worksheetKwitansiMonGlo4.getCell("AA40").value = "NIP." + NIP;
          worksheetKwitansiMonGlo4.getCell("AA103").value = nama;
          worksheetKwitansiMonGlo4.getCell("AA104").value = "NIP." + NIP;

          worksheetKwitansiMonGlo.getCell("A37").value = nama;
          worksheetKwitansiMonGlo.getCell("A38").value = "NIP." + NIP;
          worksheetKwitansiMonGlo.getCell("N37").value = nama;
          worksheetKwitansiMonGlo.getCell("N38").value = "NIP." + NIP;

          worksheetKwitansiMonGlo.getCell("A101").value = nama;
          worksheetKwitansiMonGlo.getCell("A102").value = "NIP." + NIP;
          worksheetKwitansiMonGlo.getCell("N101").value = nama;
          worksheetKwitansiMonGlo.getCell("N102").value = "NIP." + NIP;

          worksheetKwitansiMonGlo2.getCell("A37").value = nama;
          worksheetKwitansiMonGlo2.getCell("A38").value = "NIP." + NIP;
          worksheetKwitansiMonGlo2.getCell("N37").value = nama;
          worksheetKwitansiMonGlo2.getCell("N38").value = "NIP." + NIP;

          worksheetKwitansiMonGlo2.getCell("A101").value = nama;
          worksheetKwitansiMonGlo2.getCell("A102").value = "NIP." + NIP;
          worksheetKwitansiMonGlo2.getCell("N101").value = nama;
          worksheetKwitansiMonGlo2.getCell("N102").value = "NIP." + NIP;

          worksheetKwitansiMonGlo3.getCell("A37").value = nama;
          worksheetKwitansiMonGlo3.getCell("A38").value = "NIP." + NIP;
          worksheetKwitansiMonGlo3.getCell("N37").value = nama;
          worksheetKwitansiMonGlo3.getCell("N38").value = "NIP." + NIP;

          worksheetKwitansiMonGlo3.getCell("A101").value = nama;
          worksheetKwitansiMonGlo3.getCell("A102").value = "NIP." + NIP;
          worksheetKwitansiMonGlo3.getCell("N101").value = nama;
          worksheetKwitansiMonGlo3.getCell("N102").value = "NIP." + NIP;

          worksheetKwitansiMonGlo4.getCell("A37").value = nama;
          worksheetKwitansiMonGlo4.getCell("A38").value = "NIP." + NIP;
          worksheetKwitansiMonGlo4.getCell("N37").value = nama;
          worksheetKwitansiMonGlo4.getCell("N38").value = "NIP." + NIP;

          worksheetKwitansiMonGlo4.getCell("A101").value = nama;
          worksheetKwitansiMonGlo4.getCell("A102").value = "NIP." + NIP;
          worksheetKwitansiMonGlo4.getCell("N101").value = nama;
          worksheetKwitansiMonGlo4.getCell("N102").value = "NIP." + NIP;

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
          const worksheetDistribusiVis =
            workbookDistribusi.getWorksheet("visum");
          const worksheetDistribusiSPD1 =
            workbookDistribusi.getWorksheet("SPD");
          const worksheetDistribusiSPD2 =
            workbookDistribusi.getWorksheet("SPD (2)");
          const worksheetDistribusiSPD3 =
            workbookDistribusi.getWorksheet("SPD (3)");
          const worksheetDistribusiLap = workbookDistribusi.getWorksheet("Lap");
          // Assuming you have the updated data in variables nama, NIP
          worksheetDistribusi.getCell("G50").value = nama;
          worksheetDistribusi.getCell("G51").value = "NIP." + NIP;
          worksheetDistribusi.getCell("R50").value = nama;
          worksheetDistribusi.getCell("R51").value = "NIP." + NIP;

          worksheetDistribusiVis.getCell("E35").value = nama;
          worksheetDistribusiVis.getCell("E36").value = "NIP." + NIP;

          worksheetDistribusiVis.getCell("R35").value = nama;
          worksheetDistribusiVis.getCell("R36").value = "NIP." + NIP;

          worksheetDistribusiVis.getCell("AE35").value = nama;
          worksheetDistribusiVis.getCell("AE36").value = "NIP." + NIP;

          worksheetDistribusiVis.getCell("E79").value = nama;
          worksheetDistribusiVis.getCell("E80").value = "NIP." + NIP;

          worksheetDistribusiVis.getCell("R79").value = nama;
          worksheetDistribusiVis.getCell("R80").value = "NIP." + NIP;

          worksheetDistribusiVis.getCell("AE79").value = nama;
          worksheetDistribusiVis.getCell("AE80").value = "NIP." + NIP;

          worksheetDistribusiSPD1.getCell("E40").value = nama;
          worksheetDistribusiSPD1.getCell("E41").value = "NIP." + NIP;

          worksheetDistribusiSPD1.getCell("P40").value = nama;
          worksheetDistribusiSPD1.getCell("P41").value = "NIP." + NIP;

          worksheetDistribusiSPD2.getCell("E40").value = nama;
          worksheetDistribusiSPD2.getCell("E41").value = "NIP." + NIP;
          worksheetDistribusiSPD2.getCell("P40").value = nama;
          worksheetDistribusiSPD2.getCell("P41").value = "NIP." + NIP;

          worksheetDistribusiSPD3.getCell("E40").value = nama;
          worksheetDistribusiSPD3.getCell("E41").value = "NIP." + NIP;
          worksheetDistribusiSPD3.getCell("P40").value = nama;
          worksheetDistribusiSPD3.getCell("P41").value = "NIP." + NIP;

          worksheetDistribusiLap.getCell("B44").value = nama;
          worksheetDistribusiLap.getCell("B45").value = "NIP." + NIP;
          worksheetDistribusiLap.getCell("N44").value = nama;
          worksheetDistribusiLap.getCell("N45").value = "NIP." + NIP;

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
  // /////KA GUDANG ////////////
};
