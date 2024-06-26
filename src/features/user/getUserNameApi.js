import axios from "axios";

const baseUrl = "http://localhost:5072/api/User/";

export const getUserName = async (id) => {
  return axios.get(`${baseUrl}GetUserNameById/?id=${id}`, {
    withCredentials: true,
  });
};
export const getUserId = async () => {
  return axios.get("http://localhost:5072/api/Home/GetUserId", {
    withCredentials: true,
  });
};
