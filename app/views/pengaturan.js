import React, { useState, useEffect } from "react";
import Axios from "axios";

const Pengaturan = () => {
  const [pegawaiData, setPegawaiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPegawai();
        setPegawaiData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getPegawai = () => Axios.get(`/pegawai/get`);

  return (
    <>
      <div>
        <h1>PENGATURAN</h1>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>NIP</th>
              <th>Golongan</th>
            </tr>
          </thead>
          <tbody>
            {pegawaiData.map((pegawai) => (
              <tr key={pegawai.id}>
                <td>{pegawai.nama}</td>
                <td>{pegawai.jabatan}</td>
                <td>{pegawai.NIP}</td>
                <td>{pegawai.golongan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Pengaturan;
