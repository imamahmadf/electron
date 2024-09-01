import React, { useState, useEffect } from "react";
import Api from "../helpers/api";
import { Card, Button, Modal, Dropdown, Table } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Tambahkan ini

const RekapSurat = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPrintKwitansi, setShowPrintKwitansi] = useState(false);
  const [printKwitansiData, setPrintKwitansiData] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [jenisSPPD, setJenisSPPD] = useState(null);
  const [pegawaiList, setPegawaiList] = useState([]);
  const [tanggalPulang, setTanggalPulang] = useState("");
  const [tanggalKeberangkatan, setTanggalKeberangkatan] = useState("");
  const [editTujuanData, setEditTujuanData] = useState(null);
  const [editTujuanMode, setEditTujuanMode] = useState(false);

  const history = useHistory(); // Tambahkan ini
  const getRekap = () => {
    // Reverse the order of data before sending to the API
    const reversedData = [...data].reverse();

    axios
      .post(`rekap/get`, reversedData)
      .then((res) => {})
      .catch((err) => {
        console.error(err.message);
      });
    console.log("REKAP!!!");
  };

  const handleTanggalKeberangkatanChange = (e) => {
    const selectedDate = e.target.value;
    setTanggalKeberangkatan(selectedDate);
    if (tanggalPulang === "") {
      setTanggalPulang(selectedDate);
    }
  };

  const hapusAll = () => {
    axios
      .post(`/rekap/delete/all`)
      .then((res) => {
        setShowDeleteModal(true); // Menampilkan modal konfirmasi hapus semua data
        setTimeout(() => {
          history.push("/"); // Redirect ke halaman awal setelah beberapa detik
        }, 3000); // Misalnya, tunggu 3 detik sebelum redirect
      })
      .catch((err) => {
        console.log("Gagal menghapus semua perjalanan");
      });
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

  const handlePrintKwitansi = async (data) => {
    setPrintKwitansiData(data);
    setShowPrintKwitansi(true);
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

  const printKwitansi = async () => {
    console.log("SSSSS");
    try {
      const dataToSend = {
        nomorSuratSPD: printKwitansiData.nomorSuratSPD,
        pegawai1Nama: JSON.parse(printKwitansiData.pegawai1).nama,
        pegawai1NIP: JSON.parse(printKwitansiData.pegawai1).NIP,
        pegawai2Nama: JSON.parse(printKwitansiData.pegawai2).nama,
        pegawai2NIP: JSON.parse(printKwitansiData.pegawai2).NIP,
        pegawai3Nama: JSON.parse(printKwitansiData.pegawai3).nama,
        pegawai3NIP: JSON.parse(printKwitansiData.pegawai3).NIP,
        puskesmas: JSON.parse(printKwitansiData.puskesmasId),
      };

      // Send data to the backend API for printing kwitansi
      await Api.printKwitansi(dataToSend).then((res) => {
        setShowPrintKwitansi(false);
        console.log("Kwitansi printed successfully!");
      });

      // Optionally show a success message or perform any other actions
    } catch (error) {
      console.error("Error printing kwitansi: ", error);
    }
  };

  const handleEdit = (item) => {
    setEditedData(item);
    setEditMode(true);
  };

  const editTujuan = (item) => {
    setEditTujuanData(item);
    setEditTujuanMode(true);
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
        alert("Data updated successfully!");
        // Close the edit modal
        setEditMode(false);
      })
      .catch((error) => {
        alert("Failed to update data. Please try again.");
      });
  };

  const loadPuskesmasOptions = async (inputValue) => {
    const response = await Api.getPuskesmas(); // Ambil data puskesmas dari API
    const filteredOptions = response.data.filter((puskesmas) =>
      puskesmas.nama.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filteredOptions.map((puskesmas) => ({
      value: puskesmas.id,
      label: puskesmas.nama,
    }));
  };

  const sendTujuanData = () => {
    console.log(editTujuanData, "WWWWW");
    Api.gantiTujuanPuskesmas({
      id: editTujuanData.id,
      puskesmasId: editTujuanData.puskesmasId,
    })
      .then((response) => {
        fetchData();
        setEditTujuanMode(false);
      })
      .catch((error) => {
        alert("Failed to update data. Please try again.");
      });
  };
  async function fetchData() {
    await axios
      .get(
        `surat/get?pegawai=${pegawaiList[0]?.value}&tipe=${jenisSPPD?.value}&keberangkatan=${tanggalKeberangkatan}&pulang=${tanggalPulang}`
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
  useEffect(() => {
    fetchData();
  }, [pegawaiList, jenisSPPD, tanggalKeberangkatan, tanggalPulang]);

  return (
    <div className="mt-5">
      <div className="p-5 mt-5">
        <div className="container mb-5">
          <div className="row mt-5">
            <div className="col">
              <label>Pegawai </label>
              <AsyncSelect
                cacheOptions
                loadOptions={loadPegawaiOptions}
                defaultOptions
                onChange={(selectedOption) =>
                  handleSelectPegawai(selectedOption, 0)
                } // Pegawai 1
                placeholder="Cari Pegawai "
              />
            </div>
            <div className="col">
              <label>Jenis SPPD</label>
              <AsyncSelect
                cacheOptions
                loadOptions={loadJenisSPPDOptions}
                defaultOptions
                onChange={setJenisSPPD} // Simpan puskesmas yang dipilih
                placeholder="jenis SPPD"
              />
            </div>
            <div className="col">
              <label>Tanggal Keberangkatan</label>
              <input
                onChange={handleTanggalKeberangkatanChange}
                type="date"
                value={tanggalKeberangkatan}
              />
            </div>
            <div className="col">
              <label>Tanggal Pulang</label>
              <input
                onChange={(e) => setTanggalPulang(e.target.value)}
                type="date"
                value={tanggalPulang}
              />
            </div>
            <div>
              {jenisSPPD?.value === 1 ? (
                <>
                  <Button variant="secondary" onClick={() => getRekap()}>
                    REKAP
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => getRekap()}
                    disabled
                  >
                    REKAP
                  </Button>
                </>
              )}
              <Button variant="danger" onClick={() => hapusAll()}>
                Hapus SPPD
              </Button>
            </div>
          </div>
        </div>{" "}
        {data.length == 0 ? (
          <>
            <h1>tidak ada perjalanan Dinas</h1>
          </>
        ) : (
          <Card className="p-3">
            <Card.Title className="text-center mb-3">
              Daftar{" "}
              {jenisSPPD?.value == 1
                ? "Distribusi"
                : jenisSPPD?.value == 2
                ? "Monitoring"
                : "Distribusi dan Monitoring"}
            </Card.Title>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Puskesmas</th>
                  <th>Keberangkatan</th>
                  <th>Pegawai 1</th>
                  <th>Pegawai 2</th>
                  <th>Pegawai 3</th>
                  {jenisSPPD?.value == 1 ? null : <th>Pegawai 4</th>}
                  <th>Nomor Surat</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td>{JSON.parse(item.puskesmasId).nama}</td>
                    <td>{formatDate(item.keberangkatan)}</td>
                    <td>{JSON.parse(item.pegawai1).nama}</td>
                    <td>{JSON.parse(item.pegawai2).nama}</td>
                    <td>{JSON.parse(item.pegawai3).nama}</td>
                    {jenisSPPD?.value == 1 ? null : (
                      <td>{JSON.parse(item.pegawai4)?.nama}</td>
                    )}
                    <td>
                      {item.nomorSuratNotaDinas}
                      <br />
                      {item.nomorSuratTugas}
                      <br />
                      {item.nomorSuratSPD}
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="secondary"
                          id="dropdown-basic"
                        >
                          <i className="fas fa-ellipsis-v"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleEdit(item)}>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(item.id)}>
                            Hapus
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handlePrintKwitansi(item)}
                          >
                            Print Kwitansi
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => editTujuan(item)}>
                            Edit Tujuan
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
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
        <Modal
          show={showPrintKwitansi}
          onHide={() => setShowPrintKwitansi(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Konfirmasi Print Kwitansi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Apakah Anda yakin ingin mencetak kwitansi</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={printKwitansi}>
              Print
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowPrintKwitansi(false)}
            >
              Batal
            </Button>
          </Modal.Footer>
        </Modal>
        {/* edit nomor */}
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
        {/* edit pkm */}
        <Modal show={editTujuanMode} onHide={() => setEditTujuanMode(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editTujuanData && (
              <>
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadPuskesmasOptions}
                  defaultOptions
                  onChange={(selectedOption) =>
                    setEditTujuanData({
                      ...editTujuanData,
                      puskesmasId: selectedOption.value,
                    })
                  }
                />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setEditTujuanMode(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={sendTujuanData}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default RekapSurat;
