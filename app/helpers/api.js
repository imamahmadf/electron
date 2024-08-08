import Axios from "axios";

const Api = {
  getThing: () => Axios.get(`/exel/post`),
};

export default Api;
