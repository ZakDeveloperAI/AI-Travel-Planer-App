// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA-s4j8S0OCsUwTlh1qOFIBfaIIM27RuDk",
    authDomain: "react-native-project-41168.firebaseapp.com",
    projectId: "react-native-project-41168",
    storageBucket: "react-native-project-41168.firebasestorage.app",
    messagingSenderId: "396186233271",
    appId: "1:396186233271:web:5d0b03fc6bc6085fb02032",
    measurementId: "G-3J0RR43660"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);