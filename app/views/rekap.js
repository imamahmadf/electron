import React, { useState, useEffect } from "react";
import Api from "../helpers/api";
import { Card, Button, Modal, Dropdown } from "react-bootstrap";

const RekapSurat = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };
  const handleModal = (item) => {
    setSelectedData(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await Api.hapusSurat(deleteId);
      setData(data.filter((item) => item.id !== deleteId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  const printKwitansi = async (selectedData) => {
    try {
      const dataToSend = {
        nomorSuratSPD: selectedData.nomorSuratSPD,
        pegawai1Nama: JSON.parse(selectedData.pegawai1).nama,
        pegawai1NIP: JSON.parse(selectedData.pegawai1).NIP,
        pegawai2Nama: JSON.parse(selectedData.pegawai2).nama,
        pegawai2NIP: JSON.parse(selectedData.pegawai2).NIP,
        pegawai3Nama: JSON.parse(selectedData.pegawai3).nama,
        pegawai3NIP: JSON.parse(selectedData.pegawai3).NIP,
      };

      // Send data to the backend API for printing kwitansi
      await Api.printKwitansi(dataToSend);

      // Optionally show a success message or perform any other actions
      console.log("Kwitansi printed successfully!");
    } catch (error) {
      console.error("Error printing kwitansi: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.rekapSurat();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <Card
          key={item.id}
          style={{ width: "100%", marginBottom: "10px", position: "relative" }}
        >
          <Card.Body>
            <Card.Title>{JSON.parse(item.puskesmasId).nama}</Card.Title>
            <Card.Text>
              Keberangkatan: {formatDate(item.keberangkatan)}
            </Card.Text>

            <Dropdown
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <i className="fas fa-ellipsis-v"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleModal(item)}>
                  Detail
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDelete(item.id)}>
                  Hapus
                </Dropdown.Item>
                <Dropdown.Item onClick={() => printKwitansi(item)}>
                  Print Kwitansi
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData && (
            <div>
              <p>{JSON.parse(selectedData.puskesmasId).nama}</p>
              <p>Keberangkatan: {selectedData.keberangkatan}</p>
              <p>{selectedData.nomorSuratTugas}</p>
              <p>{selectedData.nomorSuratNotaDinas}</p>
              <p>{selectedData.nomorSuratSPD}</p>
              <p>{JSON.parse(selectedData.pegawai1).nama}</p>
              <p>{JSON.parse(selectedData.pegawai2).nama}</p>
              <p>{JSON.parse(selectedData.pegawai3).nama}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin menghapus data ini?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmDelete}>
            Hapus
          </Button>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RekapSurat;
