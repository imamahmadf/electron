import React, { useState, useEffect } from "react";
import Api from "../helpers/api";
import AsyncSelect from "react-select/async";
import {
  Card,
  Table,
  Button,
  Modal,
  Jumbotron,
  Container,
  Box,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Welcome = () => {
  const history = useHistory(); // Tambahkan ini

  return (
    <>
      <div
        className="mt-5 d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Card className="bg-dark text-white">
          <Card.Img
            src="assets/desktop.png"
            alt="Card image"
            style={{
              filter: "brightness(50%)",
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
          <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center">
            <h1>SIKAMPRET</h1>
            <h6 className="text-center">
              selamat datang di SIKAMPRET (Sistem Informasi Kegiatan
              Administrasi Perjalanan Resmi dan Eksekutif Terpadu)
            </h6>

            <Button
              variant="success"
              onClick={() => {
                history.push("/home");
              }}
            >
              Home
            </Button>
          </Card.ImgOverlay>
        </Card>
      </div>
    </>
  );
};

export default Welcome;
