const { db } = require("../database");

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
