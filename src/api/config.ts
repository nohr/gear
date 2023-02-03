// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAMaGvODrqXi1waqpvZkp4arEPD8FlUGks",
    authDomain: "gear-4327.firebaseapp.com",
    projectId: "gear-4327",
    storageBucket: "gear-4327.appspot.com",
    messagingSenderId: "726326453417",
    appId: "1:726326453417:web:f3681cea77d4544fe775b8",
    measurementId: "G-PXRPK2HKX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);