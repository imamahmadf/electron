import Axios from "axios";

const Api = {
  getThing: () => Axios.get(`/user/get`),
};

export default Api;
