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
    const sourceFilePath1 = path.join(__dirname, "..", "assets", "REKAP.xlsx");
    const sourceFilePath2 = path.join(
      __dirname,
      "..",
      "assets",
      "DISTRIBUSI.xlsx"
    );

    const workbook1 = new Excel.Workbook();
    const workbook2 = new Excel.Workbook();

    workbook1.xlsx
      .readFile(sourceFilePath1)
      .then(() => {
        const worksheet1 = workbook1.getWorksheet("Sheet1");

        // Assuming you have the updated data in variables nama, NIP
        worksheet1.getCell("A2").value = nama;
        worksheet1.getCell("B2").value = NIP;

        return workbook1.xlsx.writeFile(sourceFilePath1);
      })
      .then(() => {
        console.log("Data successfully updated in REKAP.xlsx.");
      })
      .catch((error) => {
        console.error("Error updating data in REKAP.xlsx:", error);
      });

    workbook2.xlsx
      .readFile(sourceFilePath2)
      .then(() => {
        const worksheet2 = workbook2.getWorksheet("Sheet1");

        // Assuming you have the updated data in variables nama, NIP
        worksheet2.getCell("A2").value = nama;
        worksheet2.getCell("B2").value = NIP;

        return workbook2.xlsx.writeFile(sourceFilePath2);
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
