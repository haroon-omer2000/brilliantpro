import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCHl1UogYxhZ-7IQimNGGgO-1KFGc_WmGI",
  authDomain: "brilliantpro-ba228.firebaseapp.com",
  projectId: "brilliantpro-ba228",
  storageBucket: "brilliantpro-ba228.appspot.com",
  messagingSenderId: "238329931618",
  appId: "1:238329931618:web:766017febb60fb8e766e3b",
  measurementId: "G-PC422LMWWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
