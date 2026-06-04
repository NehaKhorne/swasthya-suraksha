import axios from "axios";

export const submitPCOSTest = (data) => {
  return axios.post("http://localhost:5000/api/pcos/test", data);
};
