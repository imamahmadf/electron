import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Dropdown, Modal, Button } from "react-bootstrap";
import Api from "../helpers/api";
import { useHistory } from "react-router-dom";

const Struktur = () => {
  const [struktur, setStruktur] = useState([]);
  const [editData, setEditData] = useState({
    nama: "",
    NIP: "",
  });
  const [editStrukturData, setEditStrukturData] = useState({});
  const [showEditStrukturModal, setShowEditStrukturModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const history = useHistory();

  const simpanPerubahanData = () => {
    Api.editStruktur(editStrukturData)
      .then((response) => {
        console.log("Data Struktur berhasil diubah");
        setShowSuccessModal(true); // Tambahkan state untuk menampilkan modal sukses
        setShowEditStrukturModal(false);
        fetchDataStruktur();
      })
      .catch((error) => {
        console.error("Error updating data pegawai:", error);
      });
  };

  const handleEditStrukturData = (struktur) => {
    setEditStrukturData(struktur);
    setShowEditStrukturModal(true);
  };

  const handleCloseEditStrukturModal = () => {
    setShowEditStrukturModal(false);
  };
  const fetchDataStruktur = async () => {
    try {
      const response = await Api.getStruktur();
      setStruktur(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataStruktur();
  }, []);

  return (
    <>
      <div>
        <h1>PENGATURAN STRUKTUR</h1>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>NIP</th>
              <th>Jabatan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {struktur.map((val, index) => (
              <tr key={val.id}>
                <td>{index + 1}</td>
                <td>{val.nama}</td>
                <td>{val.NIP}</td>
                <td>{val.jabatan}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      <i className="fas fa-ellipsis-v"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleEditStrukturData(val)}
                      >
                        Edit
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showEditStrukturModal} onHide={handleCloseEditStrukturModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data {editStrukturData.jabatan}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              className="form-control"
              value={editStrukturData.nama}
              onChange={(e) =>
                setEditStrukturData({
                  ...editStrukturData,
                  nama: e.target.value,
                })
              }
            />

            <label>NIP</label>
            <input
              type="text"
              className="form-control"
              value={editStrukturData.NIP}
              onChange={(e) =>
                setEditStrukturData({
                  ...editStrukturData,
                  NIP: e.target.value,
                })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditStrukturModal}>
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
    </>
  );
};

export default Struktur;
