import { atom } from "recoil";

export const currUserState = atom({
  key: "currUserState",
  default: "",
});

export const signupDetailsState = atom({
  key: "signupDetailsState",
  default: {
    signupEmailState: "",
    signupPasswordState: "",
  },
});

export const loginDetailsState = atom({
  key: "loginEmailState",
  default: {
    loginEmailState: "",
    loginPasswordState: "",
  },
});
