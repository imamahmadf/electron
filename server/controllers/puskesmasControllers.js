const { db } = require("../database");

module.exports = {
  getAllPuskesmas: (req, res) => {
    let sqlGet = `SELECT id, nama FROM puskesmas`;

    db.query(sqlGet, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },
};
