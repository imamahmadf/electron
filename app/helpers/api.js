import Axios from "axios";

const Api = {
  getThing: () => Axios.get(`/exel/post`),
  getPegawai: () => Axios.get(`/pegawai/get`),
};

export default Api;
