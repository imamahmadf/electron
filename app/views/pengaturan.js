import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Dropdown, Modal, Button } from "react-bootstrap";
import Api from "../helpers/api";

const Pengaturan = () => {
  const [pegawaiData, setPegawaiData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.getPegawai();
        setPegawaiData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const hapusDataPegawai = (id) => {
    Api.hapusPegawai(id)
      .then((response) => {
        console.log("Data pegawai berhasil dihapus");
        // Optionally, you can update the state or perform any other actions after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting data pegawai:", error);
      });
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  return (
    <>
      <div>
        <h1>PENGATURAN</h1>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>NIP</th>
              <th>Golongan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pegawaiData.map((pegawai) => (
              <tr key={pegawai.id}>
                <td>{pegawai.nama}</td>
                <td>{pegawai.jabatan}</td>
                <td>{pegawai.NIP}</td>
                <td>{pegawai.golongan}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      <i className="fas fa-ellipsis-v"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEdit(pegawai.id)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDeleteConfirmation(pegawai.id)}
                      >
                        Hapus
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus data pegawai?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              hapusDataPegawai(deleteId);
              setShowModal(false);
            }}
          >
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Pengaturan;
