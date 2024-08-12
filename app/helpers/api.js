import Axios from "axios";

const Api = {
  getThing: () => Axios.get(`/exel/post`),
  getPegawai: () => Axios.get(`/pegawai/get`),
  getPuskesmas: () => Axios.get(`/puskesmas/get`),
  buatSurat: (data) => Axios.post(`/surat/post`, data),
  rekapSurat: () => Axios.get(`/surat/get`),
  hapusSurat: (id) => Axios.delete(`surat/delete/${id}`),
  printKwitansi: (data) => Axios.post(`/surat/kwitansi`, data),
  hapusPegawai: (id) => Axios.post(`pegawai/delete/${id}`),
};

export default Api;
