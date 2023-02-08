import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {

  apiKey: "AIzaSyC8L_PTT6a312oImajB0CODuIlTrxXh-ng",
  authDomain: "ponto-em-ponto.firebaseapp.com",
  projectId: "ponto-em-ponto",
  storageBucket: "ponto-em-ponto.appspot.com",
  messagingSenderId: "821715432810",
  appId: "1:821715432810:web:4e4779aaa6656e7ed9e113"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);