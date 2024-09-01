import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Dropdown, Modal, Button } from "react-bootstrap";
import Api from "../helpers/api";
import { useHistory } from "react-router-dom";
import PengaturanPuskesmas from "../components/pengaturanPuskesmas";
import Struktur from "../components/struktur";
import Bank from "../components/bank";

const Pengaturan = () => {
  const [pegawaiData, setPegawaiData] = useState([]);
  const [puskesmas, setPuskesmas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [activeTab, setActiveTab] = useState("pegawai");
  const [editData, setEditData] = useState({
    nama: "",
    golongan: "",
    jabatan: "",
    NIP: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useState(false);
  const history = useHistory();
  const fetchData = async () => {
    try {
      const response = await Api.getPegawai();
      console.log(response, "AAAAAAAAAAAAAAA");
      setPegawaiData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
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

  const handleEditData = (pegawai) => {
    setEditData(pegawai);
    setShowEditModal(true);
  };

  const simpanPerubahanData = () => {
    Api.simpanPerubahanPegawai(editData)
      .then((response) => {
        console.log("Data pegawai berhasil diubah");
        setShowSuccessModal(true); // Tambahkan state untuk menampilkan modal sukses
        setShowEditModal(false);
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating data pegawai:", error);
      });
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="d-flex align-items-start mt-5">
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
            className={`nav-link ${activeTab === "bank" ? "active" : ""}`}
            onClick={() => handleTabChange("bank")}
            role="tab"
            aria-selected={activeTab === "bank"}
          >
            Bank
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
                              onClick={() => handleEditData(pegawai)}
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
            {/* disini */}
            <PengaturanPuskesmas />
          </div>

          <div
            className={`tab-pane fade ${
              activeTab === "bank" ? "show active" : ""
            }`}
            id="v-pills-lainnya"
            role="tabpanel"
            aria-labelledby="v-pills-lainnya-tab"
          >
            <Bank />
          </div>

          <div
            className={`tab-pane fade ${
              activeTab === "lainnya" ? "show active" : ""
            }`}
            id="v-pills-lainnya"
            role="tabpanel"
            aria-labelledby="v-pills-lainnya-tab"
          >
            <Struktur />
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
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Pegawai</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              className="form-control"
              value={editData.nama}
              onChange={(e) =>
                setEditData({ ...editData, nama: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Golongan</label>
            <input
              type="text"
              className="form-control"
              value={editData.golongan}
              onChange={(e) =>
                setEditData({ ...editData, golongan: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Jabatan</label>
            <input
              type="text"
              className="form-control"
              value={editData.jabatan}
              onChange={(e) =>
                setEditData({ ...editData, jabatan: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>NIP</label>
            <input
              type="text"
              className="form-control"
              value={editData.NIP}
              onChange={(e) =>
                setEditData({ ...editData, NIP: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={simpanPerubahanData}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sukses!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data pegawai berhasil diubah.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pengaturan;
