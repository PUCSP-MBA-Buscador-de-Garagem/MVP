// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL-UYjdZy2vE1FwnjoUaCYaC2Gwp_ldbo",
  authDomain: "pucsp-mba-buscador-de-garagem.firebaseapp.com",
  projectId: "pucsp-mba-buscador-de-garagem",
  storageBucket: "pucsp-mba-buscador-de-garagem.appspot.com",
  messagingSenderId: "566931255212",
  appId: "1:566931255212:web:ff50f03e9e5ab056ac5409",
  measurementId: "G-YD8Q2SGRKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);