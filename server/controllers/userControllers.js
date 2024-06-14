const { db } = require("../database");

module.exports = {
  getUserAll: (req, res) => {
    let sqlGet = `select * from user`;

    db.query(sqlGet, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },
};
