// import { useNavigate } from "react-router-dom";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { useState } from "react";
// import axios from "axios";
// import { baseURL } from "./config.js";

// const ChangePassword = () => {
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [cpassword, setCpassword] = useState("");
//   const api = axios.create({
//     baseURL,
//   });

//   return (
//     <div className="reg-container">
//       <h1 style={{ color: "#fff" }}>Change Password</h1>
//       <div className="card">
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <TextField
//             label="Password"
//             variant="outlined"
//             className="card-component"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="off"
//             size="small"
//             style={{ margin: "16px" }}
//           />
//         </div>

//         <div style={{ display: "flex", alignItems: "center" }}>
//           <TextField
//             label="Confirm Password"
//             variant="outlined"
//             className="card-component"
//             value={cpassword}
//             onChange={(e) => setCpassword(e.target.value)}
//             autoComplete="off"
//             size="small"
//             style={{ margin: "16px" }}
//           />
//         </div><Button
//         variant="contained"
//         style={{ marginLeft: "16px" }}
//         onClick={changePassword}
//       >
//         PROCEED
//       </Button>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;
