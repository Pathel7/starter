/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR-Ry7Ml-lxYSGoRmHY89jSG0JvOz_qzE",
  authDomain: "parent-ecole-fddf4.firebaseapp.com",
  projectId: "parent-ecole-fddf4",
  storageBucket: "parent-ecole-fddf4.firebasestorage.app",
  messagingSenderId: "642668548385",
  appId: "1:642668548385:web:459f1aafb1d77239beee60",
  measurementId: "G-B26JVKZYJT"
};

// Initialize Firebase
const app= initializeApp(firebaseConfig);
//@ts-ignore
const analytics = getAnalytics(app);
export default app;
export const db = getFirestore(app);