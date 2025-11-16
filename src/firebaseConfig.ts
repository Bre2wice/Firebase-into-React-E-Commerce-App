import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBN9-Cep1MW4vbdmDhUvlm8LtrfCNOWx5M",
  authDomain: "ecommerce-app-9c9f3.firebaseapp.com",
  projectId: "ecommerce-app-9c9f3",
  storageBucket: "ecommerce-app-9c9f3.firebasestorage.app",
  messagingSenderId: "470553786455",
  appId: "1:470553786455:web:30db9a760c5dd266124b12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export { auth };

// Initialize Firestore
const db = getFirestore(app);

export { db };
