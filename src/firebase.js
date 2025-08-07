import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsEcX9nl1e9AMB44rYj_oE7HQi80f1-_0",
  authDomain: "invex-employee-portal.firebaseapp.com",
  projectId: "invex-employee-portal",
  storageBucket: "invex-employee-portal.appspot.com",
  messagingSenderId: "509534643431",
  appId: "1:509534643431:web:a7b4cabe6e3e812bc66e42",
  measurementId: "G-MDJXC96FKD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
