const { db } = require("../database");

module.exports = {
  getAll: (req, res) => {
    let sqlGet = `SELECT id, nama, jabatan, NIP, golongan FROM pegawais ORDER BY nama ASC`;

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

  addPegawai: (req, res) => {
    const { nama, NIP, golongan, jabatan } = req.body;
    console.log(req.body);
    let sqlAdd = `INSERT INTO pegawais (nama, NIP, golongan, jabatan) VALUES (?, ?, ?, ?)`;
    db.query(sqlAdd, [nama, NIP, golongan, jabatan], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("terjadi kesalahan");
      }
      res.status(200).send("Data pegawai berhasil ditambahakan ke database");
    });
  },

  editPegawai: (req, res) => {
    console.log(req.body);
    const { nama, jabatan, NIP, golongan, id } = req.body;

    const sql = `UPDATE pegawais SET nama = ?, jabatan = ?, NIP = ?, golongan = ? WHERE id = ?`;

    db.query(sql, [nama, jabatan, NIP, golongan, id], (err, result) => {
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
