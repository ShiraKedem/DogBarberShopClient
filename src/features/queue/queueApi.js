import axios from "axios";

const baseUrl = "http://localhost:5072/api/Queue/";

export const addQueue = async (date, time) => {
  const formattedDate = new Date(date).toISOString().split("T")[0]; // Format as YYYY-MM-DD

  return await axios.post(
    `${baseUrl}addQueue`,
    { Date: formattedDate, Hour: time },
    { withCredentials: true }
  );
};

export const getAllQueues = async () => {
  return axios.get(`${baseUrl}GetAllQueues`, { withCredentials: true });
};

export const deleteQueue = async (id) => {
  return axios.delete(`${baseUrl}DeleteQueue/${id}`, { withCredentials: true });
};
export const updateQueue = (id, date, hour) => {
  return axios.put(
    `${baseUrl}UpdateQueue/${id}`,
    { date, hour },
    { withCredentials: true }
  );
};
