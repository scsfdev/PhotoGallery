import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/PGBff",
});

export default api;
