import StudentNavbar from "./StudentNavbar";
import OpenNavbar from "./OpenNavbar";
import { useEffect } from "react";
import { useProfile } from "../../hooks/useProfile";

const Appbar = () => {
  const { isLoggedIn, getProfile } = useProfile();

  useEffect(() => {
    getProfile();
  }, []);

  if (isLoggedIn) {
    return <StudentNavbar getProfile={getProfile} />;
  } else {
    return <OpenNavbar />;
  }
};

export default Appbar;
