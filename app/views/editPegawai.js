import React, { useState, useEffect } from "react";
import axios from "axios";
import Api from "../helpers/api";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
const EditPegawai = (props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [NIP, setNip] = useState("");
  const [golongan, setGolongan] = useState("");

  //   const sendDataToApi = async (dataToSend) => {
  //     try {
  //       console.log(dataToSend);
  //       Axios.post(
  //         `pegawai/edit/${props.match.params.pegawaiId}`,
  //         dataToSend
  //       ).then((res) => {});
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`pegawai/get/11`)
        .then((res) => {
          setNama(res.data.nama);
          setJabatan(res.data.jabatan);
          setNip(res.data.NIP);
          setGolongan(res.data.golongan);

          console.log(res.data);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }

    if (nama !== "" && jabatan !== "" && NIP !== "" && golongan !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    fetchData();
  }, [nama, jabatan, NIP, golongan]);

  const history = useHistory(); // Add this line

  return (
    <>
      <div className="container">
        {/* <h1 className="mt-5">Tambah Pegawai</h1>
        <div className="row mt-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="jabatan"
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="NIP"
              value={NIP}
              onChange={(e) => setNip(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="golongan"
              value={golongan}
              onChange={(e) => setGolongan(e.target.value)}
            />
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => sendDataToApi({ nama, jabatan, NIP, golongan })}
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
            history.push("/");
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Informasi</Modal.Title>
          </Modal.Header>
          <Modal.Body>data pegawai baru berhasil ditambahkan!!!</Modal.Body>
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
        </Modal> */}
      </div>
    </>
  );
};

export default EditPegawai;
