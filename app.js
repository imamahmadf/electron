const express = require("express");
const logger = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");

const {
  userRouters,
  suratRouters,
  pegawaiRouters,
  puskesmasRouters,
  rekapRouters,
  strukturRouters,
} = require("./server/routers");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/test", (req, res) => {
  res.send("Welcome to your express API");
});

app.use("/user", userRouters);
app.use("/surat", suratRouters);
app.use("/pegawai", pegawaiRouters);
app.use("/puskesmas", puskesmasRouters);
app.use("/rekap", rekapRouters);
app.use("/struktur", strukturRouters);

app.listen(5000, () => console.log("App running on port 5000 🔥"));
