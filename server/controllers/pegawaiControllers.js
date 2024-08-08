const { db } = require("../database");

module.exports = {
  getAll: (req, res) => {
    let sqlGet = `SELECT nama, jabatan, NIP, golongan FROM pegawais`;

    db.query(sqlGet, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },
};
