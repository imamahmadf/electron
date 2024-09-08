import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Dropdown, Modal, Button, Table } from "react-bootstrap";
import Api from "../helpers/api";
import { useHistory } from "react-router-dom";

const PengaturanPuskesmas = () => {
  const [puskesmas, setPuskesmas] = useState([]);
  const [editData, setEditData] = useState({
    nama: "",
    golongan: "",
    jabatan: "",
    NIP: "",
  });
  const [editPuskesmasData, setEditPuskesmasData] = useState({});
  const [showEditPuskesmasModal, setShowEditPuskesmasModal] = useState(false);
  const [deletePuskesmasId, setDeletePuskesmasId] = useState(null);
  const [showDeletePuskesmasModal, setShowDeletePuskesmasModal] =
    useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const history = useHistory();

  const fetchDataPuskesmas = async () => {
    try {
      const response = await Api.getPuskesmas();
      setPuskesmas(response.data);
      console.log(puskesmas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataPuskesmas();
  }, []);

  const hapusDataPuskesmas = (deletePuskesmasId) => {
    console.log(deletePuskesmasId, "HPUS PKM");
    Api.hapusPuskesmas(deletePuskesmasId)
      .then((response) => {
        console.log("Data pegawai berhasil dihapus");
        setShowDeletePuskesmasModal(false);
        fetchDataPuskesmas();
        // Optionally, you can update the state or perform any other actions after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting data puskesmas:", error);
      });
  };

  const handleEditPuskesmasData = (puskesmas) => {
    setEditPuskesmasData(puskesmas);
    setShowEditPuskesmasModal(true);
  };

  const handleCloseEditPuskesmasModal = () => {
    setShowEditPuskesmasModal(false);
  };

  const handleDeletePuskesmasConfirmation = (id) => {
    setDeletePuskesmasId(id);
    setShowDeletePuskesmasModal(true);
  };

  const handleCloseDeletePuskesmasModal = () => {
    setShowDeletePuskesmasModal(false);
  };

  const simpanPerubahanData = () => {
    Api.editPuskesmas(editPuskesmasData)
      .then((response) => {
        console.log("Data puskesmas berhasil diubah");
        setShowSuccessModal(true); // Tambahkan state untuk menampilkan modal sukses
        setShowEditPuskesmasModal(false);
        fetchDataPuskesmas();
      })
      .catch((error) => {
        console.error("Error updating data pegawai:", error);
      });
  };

  return (
    <>
      <div>
        <button
          className="btn btn-primary mb-3"
          onClick={() => {
            history.push("/tambah-puskesmas");
          }}
        >
          Tambah Puskesmas
        </button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Honor Distirbusi</th>
              <th>Honor Monitoring</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {puskesmas.map((val, index) => (
              <tr key={val.id}>
                <td>{index + 1}</td>
                <td>{val.nama}</td>
                <td>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(val.honorDis)}
                </td>
                <td>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(val.honorMon)}
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      <i className="fas fa-ellipsis-v"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleEditPuskesmasData(val)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleDeletePuskesmasConfirmation(val.id)
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
        </Table>
      </div>
      <Modal
        show={showEditPuskesmasModal}
        onHide={handleCloseEditPuskesmasModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Puskesmas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              className="form-control"
              value={editPuskesmasData.nama}
              onChange={(e) =>
                setEditPuskesmasData({
                  ...editPuskesmasData,
                  nama: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Honor Distribusi</label>
            <input
              type="number"
              className="form-control"
              value={editPuskesmasData.honorDis}
              onChange={(e) =>
                setEditPuskesmasData({
                  ...editPuskesmasData,
                  honorDis: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Honor Monitoring</label>
            <input
              type="number"
              className="form-control"
              value={editPuskesmasData.honorMon}
              onChange={(e) =>
                setEditPuskesmasData({
                  ...editPuskesmasData,
                  honorMon: e.target.value,
                })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditPuskesmasModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={simpanPerubahanData}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDeletePuskesmasModal}
        onHide={handleCloseDeletePuskesmasModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus Data Puskesmas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus data puskesmas ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeletePuskesmasModal}>
            Batal
          </Button>
          <Button
            variant="danger"
            onClick={() => hapusDataPuskesmas(deletePuskesmasId)}
          >
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sukses!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Nama Puskesmas berhasil diubah.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PengaturanPuskesmas;
