import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDRkl3RqFOZuL8bNf5oAvnQNymnsEbs598",
  authDomain: "composition-api-movieapp.firebaseapp.com",
  databaseURL:
    "https://composition-api-movieapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "composition-api-movieapp",
  storageBucket: "composition-api-movieapp.appspot.com",
  messagingSenderId: "202707246452",
  appId: "1:202707246452:web:e18152cbc596455e762021",
  measurementId: "G-RDNJQTJ29J",
};

const firebaseApp = initializeApp({ firebaseConfig });


const db = getFirestore();
