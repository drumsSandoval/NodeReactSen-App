import axios from "axios";

const Api = axios.create({
  baseURL: process.env.backendURL,
});

export default Api;
