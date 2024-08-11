import React, { useState, useEffect } from "react";
import Api from "../helpers/api";
import AsyncSelect from "react-select/async";
import { Card, Table, Button, Modal } from "react-bootstrap";

const Home = () => {
  const [pegawaiList, setPegawaiList] = useState([]);
  const [puskesmas, setPuskesmas] = useState(null);
  const [tanggalKeberangkatan, setTanggalKeberangkatan] = useState("");
  const [tanggalPulang, setTanggalPulang] = useState("");
  const [showModal, setShowModal] = useState(false);

  const loadPegawaiOptions = async (inputValue) => {
    const response = await Api.getPegawai(); // Ambil data pegawai dari API
    const filteredOptions = response.data.filter((pegawai) =>
      pegawai.nama.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filteredOptions.map((pegawai) => ({
      value: pegawai.id,
      label: pegawai.nama,
      jabatan: pegawai.jabatan, // Asumsi ada field jabatan
      golongan: pegawai.golongan,
      NIP: pegawai.NIP, // Asumsi ada field golongan
    }));
  };

  const loadPuskesmasOptions = async (inputValue) => {
    const response = await Api.getPuskesmas(); // Ambil data puskesmas dari API
    const filteredOptions = response.data.filter((puskesmas) =>
      puskesmas.nama.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filteredOptions.map((puskesmas) => ({
      value: puskesmas.id, // Asumsi ada field id
      label: puskesmas.nama,
    }));
  };

  const handleSelectPegawai = (selectedOption, pegawaiIndex) => {
    if (selectedOption) {
      const newPegawaiList = [...pegawaiList];
      newPegawaiList[pegawaiIndex] = selectedOption; // Simpan pegawai yang dipilih
      setPegawaiList(newPegawaiList);
    }
  };

  const handleTanggalKeberangkatanChange = (e) => {
    const selectedDate = e.target.value;
    setTanggalKeberangkatan(selectedDate);
    setTanggalPulang(selectedDate); // Set tanggal pulang sama dengan tanggal keberangkatan
  };

  const handleSubmit = async () => {
    console.log(dataToSend);
    const dataToSend = {
      pegawai1: pegawaiList[0],
      pegawai2: pegawaiList[1],
      pegawai3: pegawaiList[2],
      puskesmas: puskesmas,
      keberangkatan: tanggalKeberangkatan,
      pulang: tanggalPulang,
    };

    try {
      console.log(dataToSend);
      const response = await Api.buatSurat(dataToSend); // Ganti dengan API yang sesuai
      console.log("Data berhasil dikirim:", response.data);
      setShowModal(true); // Tampilkan modal setelah berhasil mengirim data
    } catch (error) {
      console.error("Error mengirim data:", error);
      // Tambahkan logika untuk menangani error jika diperlukan
    }
  };

  return (
    <div className="container text-center">
      <h2>Pencarian Pegawai</h2>

      <div className="row">
        <div className="col">
          <label>Pegawai 1</label>
          <AsyncSelect
            cacheOptions
            loadOptions={loadPegawaiOptions}
            defaultOptions
            onChange={(selectedOption) =>
              handleSelectPegawai(selectedOption, 0)
            } // Pegawai 1
            placeholder="Cari Pegawai 1"
          />
        </div>
        <div className="col">
          <label>Pegawai 2</label>
          <AsyncSelect
            cacheOptions
            loadOptions={loadPegawaiOptions}
            defaultOptions
            onChange={(selectedOption) =>
              handleSelectPegawai(selectedOption, 1)
            } // Pegawai 2
            placeholder="Cari Pegawai 2"
          />
        </div>
        <div className="col">
          <label>Pegawai 3</label>
          <AsyncSelect
            cacheOptions
            loadOptions={loadPegawaiOptions}
            defaultOptions
            onChange={(selectedOption) =>
              handleSelectPegawai(selectedOption, 2)
            } // Pegawai 3
            placeholder="Cari Pegawai 3"
          />
        </div>
      </div>

      {/* Kolom Pencarian untuk Puskesmas */}
      <div className="row mt-3">
        <div className="col">
          <label>Nama Puskesmas</label>
          <AsyncSelect
            cacheOptions
            loadOptions={loadPuskesmasOptions}
            defaultOptions
            onChange={setPuskesmas} // Simpan puskesmas yang dipilih
            placeholder="Cari Puskesmas"
          />
        </div>
        <div className="col">
          <label>Tanggal Keberangkatan</label>
          <input
            onChange={handleTanggalKeberangkatanChange}
            type="date"
            value={tanggalKeberangkatan}
          />
        </div>
        <div className="col">
          <label>Tanggal Pulang</label>
          <input
            onChange={(e) => setTanggalPulang(e.target.value)}
            type="date"
            value={tanggalPulang}
          />
        </div>
      </div>

      <Button className="mt-3" onClick={handleSubmit}>
        Buat
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Informasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          File SPPD berhasil dibuat, silahkan periksa folder download yang ada
          di komputer anda.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

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
            <tbody>
              {pegawaiList.map((pegawai, index) => (
                <tr key={index}>
                  <td>{pegawai.label}</td>
                  <td>{pegawai.jabatan}</td>
                  <td>{pegawai.golongan}</td>
                  <td>{pegawai.NIP}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* ... existing code ... */}

      {/* ... existing code ... */}
    </div>
  );
};

export default Home;
