import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcKxfdGn6zlWBLNEN5LfaoVa9_hdQPIjU",
  authDomain: "e-kaksha-2001.firebaseapp.com",
  projectId: "e-kaksha-2001",
  storageBucket: "e-kaksha-2001.appspot.com",
  messagingSenderId: "196457869363",
  appId: "1:196457869363:web:4257266483cca5208cb346",
  measurementId: "G-VL1YZQ0X6Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;