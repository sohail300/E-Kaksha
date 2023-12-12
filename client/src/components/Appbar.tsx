import "./Appbar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "./config.js";
import { currUserState } from "../store/atoms/admin";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AdminNavbar from "./AdminNavbar.js";
import StudentNavbar from "./StudentNavbar.js";
import OpenNavbar from "./OpenNavbar.js";

const Appbar = () => {
  const setCurrUser = useSetRecoilState(currUserState);
  const currUser = useRecoilValue(currUserState);

  const api = axios.create({
    baseURL,
  });

  useEffect(() => {
    async function call() {
      const response = await api.get("/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.role == "admin") {
        setCurrUser("admin");
      } else if (response.data.role == "user") {
        setCurrUser("user");
      }
    }
    console.log(currUser)
    call();
  }, [currUser]);

  if (currUser == "admin") {
    return <AdminNavbar />;
  } else if (currUser == "user") {
    return (
      <StudentNavbar/>
    );
  } else {
    return (
   <OpenNavbar/>
    );
  }
};

export default Appbar;
