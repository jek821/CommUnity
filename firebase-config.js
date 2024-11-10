// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDPUwZYkuKiwuUV-6e4WunUfxvgUL46pgw",
    authDomain: "community-f4809.firebaseapp.com",
    projectId: "community-f4809",
    storageBucket: "community-f4809.firebasestorage.app",
    messagingSenderId: "187824225426",
    appId: "1:187824225426:web:ab220ed4726e4996eafa4b",
    measurementId: "G-9WS3EKB2NE"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
