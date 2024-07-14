import { useRecoilValue } from "recoil";
import StudentNavbar from "./StudentNavbar.js";
import OpenNavbar from "./OpenNavbar.js";
import { isUserLoggedInState } from "../../store/atoms/user.js";

const Appbar = () => {
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);

  console.log(isUserLoggedIn);

  if (isUserLoggedIn) {
    return <StudentNavbar />;
  } else {
    return <OpenNavbar />;
  }
};

export default Appbar;
