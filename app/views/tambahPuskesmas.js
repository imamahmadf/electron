import React, { useState, useEffect } from "react";
import Api from "../helpers/api";
import { Card, Table, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom"; // Tambahkan ini

const tambahPuskesmas = () => {
  const [nama, setNama] = useState("");
  const [honorDistribusi, setHonorDistribusi] = useState(0); // Tambahkan state honorDistribusi
  const [honorMonitoring, setHonorMonitoring] = useState(0); // Tambahkan state honorMonitoring
  const [honorTransport, setHonorTransport] = useState(0);

  const [showModal, setShowModal] = useState(false); // Tambahkan state modal
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory(); // Tambahkan ini

  useEffect(() => {
    if (nama !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [nama]);

  const sendDataToApi = async (dataToSend) => {
    try {
      console.log(dataToSend);
      const response = await Api.tambahPuskesmas(dataToSend); // Ganti dengan API yang sesuai
      console.log("Data berhasil dikirim:", response.data);
      setShowModal(true); // Tampilkan modal setelah berhasil mengirim data
      history.push("/"); // Tambahkan ini untuk berpindah ke halaman awal
    } catch (error) {
      console.error("Error mengirim data:", error);
      // Tambahkan logika untuk menangani error jika diperlukan
    }
  };

  return (
    <>
      <div className="container my-5 pb-5 h-100vh">
        <h1 className="mt-5 pt-5">Tambah Puskesmas</h1>
        <div className="row mt-3">
          <div className="col">
            <label>Nama Puskesmas</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>

          <div className="col">
            <label>uang harian Distribusi</label>
            <input
              type="number"
              className="form-control"
              placeholder="Number 1"
              value={honorDistribusi}
              onChange={(e) => setHonorDistribusi(parseInt(e.target.value))}
            />
          </div>

          <div className="col">
            <label>Uang Harian Monev</label>
            <input
              type="number"
              className="form-control"
              placeholder="Number 2"
              value={honorMonitoring}
              onChange={(e) => setHonorMonitoring(parseInt(e.target.value))}
            />
          </div>
          <div className="col">
            <label>Uang transport</label>
            <input
              type="number"
              className="form-control"
              placeholder="Number 2"
              value={honorMonitoring}
              onChange={(e) => setHonorTransport(parseInt(e.target.value))}
            />
          </div>

          <div className="col">
            <button
              className="btn btn-primary mt-3"
              onClick={() =>
                sendDataToApi({
                  nama,
                  honorDistribusi,
                  honorMonitoring,
                  honorTransport,
                })
              } // Tambahkan number1 dan number2 ke dalam objek
              disabled={isDisabled}
            >
              Tambah
            </button>
          </div>
        </div>

        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
            history.push("/pengaturan");
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Informasi</Modal.Title>
          </Modal.Header>
          <Modal.Body>data puskesmas baru berhasil ditambahkan!!!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                history.push("/");
              }}
            >
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default tambahPuskesmas;
