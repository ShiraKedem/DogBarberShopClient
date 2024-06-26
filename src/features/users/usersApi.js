import axios from "axios";

const baseUrl = "http://localhost:5072/api/Users/";

export const login = (userName, password) => {
  return axios.post(
    `${baseUrl}Login`,
    { userName, password },
    { withCredentials: true }
  );
};

export const logout = () => {
  return axios.get(`${baseUrl}Logout`, { withCredentials: true });
};
