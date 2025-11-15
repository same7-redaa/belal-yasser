// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBSNx8oquhaJSklgZqhVfCKlKpEoXjzK4E",
  authDomain: "belal-7634b.firebaseapp.com",
  projectId: "belal-7634b",
  storageBucket: "belal-7634b.firebasestorage.app",
  messagingSenderId: "839591851278",
  appId: "1:839591851278:web:e4d96a222d45e7a387535f",
  measurementId: "G-J91TM9N89S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, signInWithEmailAndPassword, onAuthStateChanged, signOut };
