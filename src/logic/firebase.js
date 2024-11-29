import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRNgTs5hvPCsGOaf6LDtsCEId6bhJZ5LI",
  authDomain: "hmm-site-e198a.firebaseapp.com",
  projectId: "hmm-site-e198a",
  storageBucket: "hmm-site-e198a.firebasestorage.app",
  messagingSenderId: "297473133250",
  appId: "1:297473133250:web:7325620690aa21d932495b",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// export const storage = getStorage();
export const db = getFirestore();
