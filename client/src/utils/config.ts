import axios from "axios";

// export const baseURL = "https://backend-e-kaksha.heysohail.me";
export const baseURL = "http://localhost:3000";

export const api = axios.create({
  baseURL,
});
