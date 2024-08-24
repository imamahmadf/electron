import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Dropdown, Modal, Button } from "react-bootstrap";
import Api from "../helpers/api";
import { useHistory } from "react-router-dom";

const PengaturanPuskesmas = () => {
  const [puskesmas, setPuskesmas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [editPuskesmasData, setEditPuskesmasData] = useState({});
  const [showEditPuskesmasModal, setShowEditPuskesmasModal] = useState(false);
  const [deletePuskesmasId, setDeletePuskesmasId] = useState(null);
  const [showDeletePuskesmasModal, setShowDeletePuskesmasModal] =
    useState(false);

  const history = useHistory();

  useEffect(() => {
    const fetchDataPuskesmas = async () => {
      try {
        const response = await Api.getPuskesmas();
        setPuskesmas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataPuskesmas();
    fetchData();
  }, [puskesmas]);

  return (
    <>
      <div>
        <p>pengaturn PKM</p>
      </div>
    </>
  );
};

export default PengaturanPuskesmas;
