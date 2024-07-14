import axios from "axios";

// const baseURL = "https://e-kaksha-9l1a.onrender.com";
export const baseURL = "http://localhost:3000";

export const api = axios.create({
  baseURL,
});
