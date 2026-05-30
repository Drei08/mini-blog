import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4K3ClSVd9erB4Nt9ZZO_uEVkYqHiOyJo",
  authDomain: "miniblog-d5342.firebaseapp.com",
  projectId: "miniblog-d5342",
  storageBucket: "miniblog-d5342.firebasestorage.app",
  messagingSenderId: "942034699043",
  appId: "1:942034699043:web:18ed6b8fe3b5678263c296"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, app};