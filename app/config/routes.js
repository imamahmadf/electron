import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Home from "../views/home";
import About from "../views/about";
import Rekap from "../views/rekap";
import Pengaturan from "../views/pengaturan";
import "../styles/main.css";
import TambahPegawai from "../views/tambahPegawai";

import tambahPuskesmas from "../views/tambahPuskesmas";
const history = createBrowserHistory();

const Routes = (
  <Router history={history}>
    <div>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/rekap" component={Rekap} />
      <Route path="/pengaturan" component={Pengaturan} />
      <Route path="/tambah-pegawai" component={TambahPegawai} />
      <Route path="/tambah-puskesmas" component={tambahPuskesmas} />
      <Footer />
    </div>
  </Router>
);

export default Routes;
