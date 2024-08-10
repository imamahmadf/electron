import Axios from "axios";

const Api = {
  getThing: () => Axios.get(`/exel/post`),
  getPegawai: () => Axios.get(`/pegawai/get`),
  getPuskesmas: () => Axios.get(`/puskesmas/get`),
  buatSurat: (data) => Axios.post(`/exel/post`, data),
};

export default Api;
