const { db } = require("../database");

module.exports = {
  getAllPuskesmas: (req, res) => {
    let sqlGet = `SELECT id, nama, honorDis, honorMon, honorMonTran FROM puskesmas ORDER BY nama ASC`;

    db.query(sqlGet, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },
  deletePuskesmas: (req, res) => {
    const { id } = req.params;
    let sqlDelete = `DELETE FROM puskesmas WHERE id = ?`;

    db.query(sqlDelete, id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      res
        .status(200)
        .send(`Puskesmas dengan ID: ${id} has been deleted successfully.`);
    });
  },

  editPuskesmas: (req, res) => {
    console.log(req.body);
    const { nama, id, honorDis, honorMon, honorMonTran } = req.body;

    const sql = `UPDATE puskesmas SET nama = ?, honorDis = ?, honorMon = ?, honorMonTran = ? WHERE id = ?`;

    db.query(
      sql,
      [nama, honorDis, honorMon, honorMonTran, id],
      (err, result) => {
        if (err) {
          console.error("Error updating data in database:", err);
          return res
            .status(500)
            .send("Terjadi kesalahan saat mengupdate data di database.");
        }
        res
          .status(200)
          .send(`Data berhasil diupdate di database. ${nama} ${id}`);
      }
    );
  },

  postPuskesmas: (req, res) => {
    const { nama, honorDistribusi, honorMonitoring, honorTransport } = req.body;
    console.log(req.body, "NAMAA");
    let sqlAdd = `INSERT INTO puskesmas (nama, honorDis, honorMon, honorMonTran) VALUES (?, ?, ?, ?)`;
    db.query(
      sqlAdd,
      [nama, honorDistribusi, honorMonitoring, honorTransport],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("terjadi kesalahan");
        }
        res
          .status(200)
          .send("Data puskesmas berhasil ditambahakan ke database");
      }
    );
  },
};
