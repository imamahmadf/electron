const { db } = require("../database");

module.exports = {
  getAll: (req, res) => {
    let sqlGet = `SELECT id, nama, jabatan, NIP, golongan FROM pegawais`;

    db.query(sqlGet, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },

  deletePegawai: (req, res) => {
    const { id } = req.params;
    let sqlDelete = `DELETE FROM pegawais WHERE id = ?`;

    db.query(sqlDelete, id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      res
        .status(200)
        .send(`Pegawai with ID: ${id} has been deleted successfully.`);
    });
  },
};