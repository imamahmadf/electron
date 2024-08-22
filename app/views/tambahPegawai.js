import React, { useState, useEffect } from "react";
import Api from "../helpers/api";
import { Card, Table, Button, Modal } from "react-bootstrap";

const TambahPegawai = () => {
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [NIP, setNip] = useState("");
  const [golongan, setGolongan] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (nama !== "" && jabatan !== "" && NIP !== "" && golongan !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [nama, jabatan, NIP, golongan]);

  const sendDataToApi = async (dataToSend) => {
    try {
      console.log(dataToSend);
      const response = await Api.tambahPegawai(dataToSend); // Ganti dengan API yang sesuai
      console.log("Data berhasil dikirim:", response.data);
      setShowModal(true); // Tampilkan modal setelah berhasil mengirim data
    } catch (error) {
      console.error("Error mengirim data:", error);
      // Tambahkan logika untuk menangani error jika diperlukan
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="mt-5">Tambah Pegawai</h1>
        <div className="row mt-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="jabatan"
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="NIP"
              value={NIP}
              onChange={(e) => setNip(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="golongan"
              value={golongan}
              onChange={(e) => setGolongan(e.target.value)}
            />
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => sendDataToApi({ nama, jabatan, NIP, golongan })}
              disabled={isDisabled}
            >
              Tambah
            </button>
          </div>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Informasi</Modal.Title>
          </Modal.Header>
          <Modal.Body>data pegawai baru berhasil ditambahkan!!!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default TambahPegawai;
