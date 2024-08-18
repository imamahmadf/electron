import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Dropdown, Modal, Button } from "react-bootstrap";
import Api from "../helpers/api";
import { useHistory } from "react-router-dom";

const Pengaturan = () => {
  const [pegawaiData, setPegawaiData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [activeTab, setActiveTab] = useState("pegawai");
  const history = useHistory();

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTambahPegawai = () => {
    history.push("/tambah-pegawai");
  };

  return (
    <div className="container">
      <div className="d-flex align-items-start">
        <div
          className="nav flex-column nav-pills me-3"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className={`nav-link ${activeTab === "pegawai" ? "active" : ""}`}
            onClick={() => handleTabChange("pegawai")}
            role="tab"
            aria-selected={activeTab === "pegawai"}
          >
            Pegawai
          </button>
          <button
            className={`nav-link ${activeTab === "puskesmas" ? "active" : ""}`}
            onClick={() => handleTabChange("puskesmas")}
            role="tab"
            aria-selected={activeTab === "puskesmas"}
          >
            Puskesmas
          </button>
          <button
            className={`nav-link ${activeTab === "lainnya" ? "active" : ""}`}
            onClick={() => handleTabChange("lainnya")}
            role="tab"
            aria-selected={activeTab === "lainnya"}
          >
            Lainnya
          </button>
        </div>
        <div className="tab-content" id="v-pills-tabContent">
          <div
            className={`tab-pane fade ${
              activeTab === "pegawai" ? "show active" : ""
            }`}
            id="v-pills-pegawai"
            role="tabpanel"
            aria-labelledby="v-pills-pegawai-tab"
          >
            <div>
              <h1>PENGATURAN</h1>

              <button
                className="btn btn-primary mb-3"
                onClick={handleTambahPegawai}
              >
                Tambah Pegawai
              </button>
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
                          <Dropdown.Toggle
                            variant="secondary"
                            id="dropdown-basic"
                          >
                            <i className="fas fa-ellipsis-v"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => handleEdit(pegawai.id)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleDeleteConfirmation(pegawai.id)
                              }
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
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "puskesmas" ? "show active" : ""
            }`}
            id="v-pills-puskesmas"
            role="tabpanel"
            aria-labelledby="v-pills-puskesmas-tab"
          >
            {/* Pengaturan list puskesmas */}
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "lainnya" ? "show active" : ""
            }`}
            id="v-pills-lainnya"
            role="tabpanel"
            aria-labelledby="v-pills-lainnya-tab"
          >
            {/* Pengaturan lainnya */}
          </div>
        </div>
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
    </div>
  );
};

export default Pengaturan;
