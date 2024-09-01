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
  tambahPegawai: (data) => Axios.post(`/pegawai/post`, data),
  editNomorSurat: (data) => Axios.post(`surat/edit`, data),
  simpanPerubahanPegawai: (data) => Axios.post(`pegawai/edit`, data),
  tambahPuskesmas: (data) => Axios.post(`/puskesmas/post`, data),
  hapusPuskesmas: (id) => Axios.post(`puskesmas/delete/${id}`),
  getStruktur: () => Axios.get(`/struktur/get`),
  editStruktur: (data) => Axios.post(`/struktur/edit-kepala`, data),
  gantiTujuanPuskesmas: (data) => Axios.post(`surat/edit-puskesmas`, data),
};

export default Api;
