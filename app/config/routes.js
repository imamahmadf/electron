import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Home from "../views/home";
import About from "../views/about";
import Rekap from "../views/rekap";
import "../styles/main.css";

const history = createBrowserHistory();

const Routes = (
  <Router history={history}>
    <div>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/rekap" component={Rekap} />
      <Footer />
    </div>
  </Router>
);

export default Routes;
