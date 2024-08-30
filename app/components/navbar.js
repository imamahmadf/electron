import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

const Navbar = () => (
  <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <Image src="assets/logo.png" height={"5%"} width={"5%"} />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/rekap">
              Rekap
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pengaturan">
              Pengaturan
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
