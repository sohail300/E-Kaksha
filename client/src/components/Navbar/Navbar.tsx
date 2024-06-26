import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../utils/config.js";
import { currUserState } from "../../store/atoms/admin.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
import StudentNavbar from "./StudentNavbar.js";
import OpenNavbar from "./OpenNavbar.js";

const Appbar = () => {
  const setCurrUser = useSetRecoilState(currUserState);
  const currUser = useRecoilValue(currUserState);

  const api = axios.create({
    baseURL,
  });

  async function call() {
    const response = await api.get("/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setCurrUser(response.data.role);
  }

  useEffect(() => {
    call();
    console.log(currUser);
  }, [currUser]);

  if (currUser == "user") {
    return <StudentNavbar />;
  } else {
    return <OpenNavbar />;
  }
};

export default Appbar;
