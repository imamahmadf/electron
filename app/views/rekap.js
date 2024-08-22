import React, { useState, useEffect } from "react";
import Api from "../helpers/api";
import { Card, Button, Modal, Dropdown } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import axios from "axios";

const RekapSurat = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [jenisSPPD, setJenisSPPD] = useState(null);
  const [pegawaiList, setPegawaiList] = useState([]);

  const getRekap = () => {
    axios
      .post(`rekap/get`, data)
      .then((res) => {})
      .catch((err) => {
        console.error(err.message);
      });
    console.log("REKAP!!!");
  };

  const loadJenisSPPDOptions = async () => {
    return [
      { value: undefined, label: "Semua" },
      { value: 1, label: "Distribusi" },
      { value: 2, label: "Monitoring" },
    ];
  };

  const loadPegawaiOptions = async (inputValue) => {
    const response = await Api.getPegawai(); // Ambil data pegawai dari API

    const filteredOptions = response.data.filter((pegawai) =>
      pegawai.nama.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filteredOptions.map((pegawai) => ({
      value: pegawai.id,
      label: pegawai.nama,
    }));
  };

  const handleSelectPegawai = (selectedOption, pegawaiIndex) => {
    if (selectedOption) {
      const newPegawaiList = [...pegawaiList];
      newPegawaiList[pegawaiIndex] = selectedOption; // Simpan pegawai yang dipilih
      setPegawaiList(newPegawaiList);
    }
  };

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

  const handleEdit = (item) => {
    setEditedData(item);
    setEditMode(true);
  };

  const editData = () => {
    // Make API call to update the data
    Api.editNomorSurat({
      id: editedData.id,
      nomorSuratTugas: editedData.nomorSuratTugas,
      nomorSuratNotaDinas: editedData.nomorSuratNotaDinas,
      nomorSuratSPD: editedData.nomorSuratSPD,
    })
      .then((response) => {
        // Handle response from API
        // For example, show a success message

        alert("Data updated successfully!");
        // Close the edit modal
        setEditMode(false);
      })
      .catch((error) => {
        // Handle error from API
        // For example, show an error message
        alert("Failed to update data. Please try again.");
      });
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await Api.rekapSurat();
    //     setData(response.data);
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error("Error fetching data: ", error);
    //   }
    // };

    async function fetchData() {
      await axios
        .get(
          `surat/get?pegawai=${pegawaiList[0]?.value}&tipe=${jenisSPPD?.value}`
        )
        .then((res) => {
          setData(res.data);

          console.log(res.data);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
    console.log(jenisSPPD);
    fetchData();
  }, [pegawaiList, jenisSPPD]);

  return (
    <div>
      <div className="container">
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
            <label>Jenis SPPD</label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadJenisSPPDOptions}
              defaultOptions
              onChange={setJenisSPPD} // Simpan puskesmas yang dipilih
              placeholder="Cari Puskesmas"
            />
          </div>
        </div>
        {data.map((item) => (
          <Card
            key={item.id}
            style={{
              width: "100%",
              marginBottom: "10px",
              position: "relative",
            }}
          >
            <Card.Body>
              <Card.Title>
                {item.tipe == 1 ? "Distribusi ke PKM: " : "Monitoring ke PKM: "}
                {JSON.parse(item.puskesmasId).nama}
              </Card.Title>
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
                  {editMode && editedData && (
                    <Dropdown.Item onClick={() => handleEdit(item)}>
                      Edit
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>
        ))}
        {jenisSPPD?.value === 1 ? (
          <>
            <Button variant="secondary" onClick={() => getRekap()}>
              REKAP
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => getRekap()} disabled>
              REKAP
            </Button>
          </>
        )}
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
                <Button
                  variant="secondary"
                  onClick={() => handleEdit(selectedData)}
                >
                  Edit
                </Button>
                <p>{JSON.parse(selectedData.pegawai1).nama}</p>
                <p>{JSON.parse(selectedData.pegawai2).nama}</p>
                <p>{JSON.parse(selectedData.pegawai3).nama}</p>
                <p>{JSON.parse(selectedData?.pegawai4).nama}</p>
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
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Batal
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={editMode} onHide={() => setEditMode(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editedData && (
              <>
                <input
                  type="text"
                  value={editedData.nomorSuratTugas}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      nomorSuratTugas: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editedData.nomorSuratNotaDinas}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      nomorSuratNotaDinas: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editedData.nomorSuratSPD}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      nomorSuratSPD: e.target.value,
                    })
                  }
                />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={editData}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default RekapSurat;
