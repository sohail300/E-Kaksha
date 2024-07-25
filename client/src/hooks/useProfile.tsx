import { useState } from "react";
import { api } from "../utils/config";

export function useProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getProfile() {
    try {
      const response = await api.get("/student/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response) {
        setIsLoggedIn(true);
      }
      console.log(isLoggedIn);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  }

  return { isLoggedIn, getProfile };
}
