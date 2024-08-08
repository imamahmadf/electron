import React, { useState, useEffect } from "react";
import Api from "../helpers/api";
import { Button, Card, Dropdown, Table, ListGroup } from "react-bootstrap";

const Home = () => {
  const [pegawai1, setPegawai1] = useState("");
  const [pegawai2, setPegawai2] = useState("");
  const [pegawai3, setPegawai3] = useState("");
  const [puskesmas, setPuskesmas] = useState("");
  const [tanggalKeberangkatan, setTanggalKeberangkatan] = useState("");
  const [tanggalPulang, setTanggalPulang] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Fetch pegawai data when component mounts
    const fetchPegawai = async () => {
      const response = await Api.getPegawai();
      setSuggestions(response.data); // Simpan data pegawai
    };
    fetchPegawai();
  }, []);

  const filterSuggestions = (input) => {
    return suggestions.filter((pegawai) =>
      pegawai.nama.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div className="container text-center">
      <h2>Pencarian Pegawai</h2>

      <div className="row">
        <div className="col">
          <label>Pegawai 1</label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {pegawai1 || "Cari Pegawai 1"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {filterSuggestions(pegawai1).map((pegawai) => (
                <Dropdown.Item
                  key={pegawai.nip}
                  onClick={() => setPegawai1(pegawai.nama)}
                >
                  {pegawai.nama}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col">
          <label>Pegawai 2</label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {pegawai2 || "Cari Pegawai 2"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {filterSuggestions(pegawai2).map((pegawai) => (
                <Dropdown.Item
                  key={pegawai.nip}
                  onClick={() => setPegawai2(pegawai.nama)}
                >
                  {pegawai.nama}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col">
          <label>Pegawai 3</label>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {pegawai3 || "Cari Pegawai 3"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {filterSuggestions(pegawai3).map((pegawai) => (
                <Dropdown.Item
                  key={pegawai.nip}
                  onClick={() => setPegawai3(pegawai.nama)}
                >
                  {pegawai.nama}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Kolom Pencarian untuk Puskesmas dan Tanggal */}
      <div className="row mt-3">
        <div className="col">
          <label>Nama Puskesmas</label>
          <input
            onChange={(e) => setPuskesmas(e.target.value)}
            type="search"
            placeholder="Cari Puskesmas"
          />
        </div>
        <div className="col">
          <label>Tanggal Keberangkatan</label>
          <input
            onChange={(e) => setTanggalKeberangkatan(e.target.value)}
            type="date"
          />
        </div>
        <div className="col">
          <label>Tanggal Pulang</label>
          <input
            onChange={(e) => setTanggalPulang(e.target.value)}
            type="date"
          />
        </div>
      </div>

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Pegawai Distribusi</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>Golongan</th>
                <th>NIP</th>
              </tr>
            </thead>
            <tbody>{/* Data pegawai akan ditampilkan di sini */}</tbody>
          </Table>
        </Card.Body>
      </Card>

      <div className="bg-test" />
      <img src="assets/apple-icon.png" width="100" alt="Black box" />
      <h1>tessssss woooooiiiiii</h1>
    </div>
  );
};

export default Home;
