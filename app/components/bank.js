import React, { useState, useEffect } from "react";
import { Dropdown, Modal, Button } from "react-bootstrap";
import Api from "../helpers/api";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Bank = () => {
  const [bankData, setBankData] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEditBankModal, setShowEditBankModal] = useState(false);
  const [editBankData, setEditBankData] = useState({});

  const handleEditBankData = (struktur) => {
    setEditBankData(struktur);
    setShowEditBankModal(true);
  };
  const simpanPerubahanData = () => {
    axios
      .post(`bank/edit`, editBankData)
      .then((res) => {
        setShowSuccessModal(true);
        setShowEditBankModal(false);
        fetchDataBank();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCloseEditBankModal = () => {
    setShowEditBankModal(false);
  };

  async function fetchDataBank() {
    await axios
      .get(`bank/get`)
      .then((res) => {
        setBankData(res.data);

        console.log(res.data, "BANLKKKKKKK");
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  useEffect(() => {
    fetchDataBank();
  }, []);
  return (
    <>
      <div>
        <h1>Bank</h1>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Nomor Rekening</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bankData.map((val, index) => (
              <tr key={val.id}>
                <td>{index + 1}</td>
                <td>{val.nama}</td>
                <td>{val.rekening}</td>

                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      <i className="fas fa-ellipsis-v"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEditBankData(val)}>
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

      <Modal show={showEditBankModal} onHide={handleCloseEditBankModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data {editBankData.nama}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Nomor rekening</label>
            <input
              type="text"
              className="form-control"
              value={editBankData.rekening}
              onChange={(e) =>
                setEditBankData({
                  ...editBankData,
                  rekening: e.target.value,
                })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditBankModal}>
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

export default Bank;
