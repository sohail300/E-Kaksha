import axios from "axios";

export const baseURL = "https://backend-e-kaksha.heysohail.me";
// export const baseURL = "http://localhost:3000";

export const api = axios.create({
  baseURL,
});

export const placeholderImage =
  "https://firebasestorage.googleapis.com/v0/b/e-kaksha-2001.appspot.com/o/Portrait_Placeholder.png?alt=media&token=c73e56ba-6a59-45b5-b328-26cafc0d9a56";
