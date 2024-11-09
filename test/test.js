// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDPUwZY...",
  authDomain: "community-f4809.firebaseapp.com",
  projectId: "community-f4809",
  storageBucket: "community-f4809.appspot.com",
  messagingSenderId: "187824225426",
  appId: "1:187824225426:web:ab220ed4726e4996eafa4b",
  measurementId: "G-9WS3EKB2NE"
};

// Initialize Firebase app, auth, and Firestore
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exporting auth and db for use in other files
export { auth, db };

// Function to add a thread
export async function addThread(threadName) {
  try {
    const threadRef = doc(collection(db, "Threads")); // Auto-generate thread ID

    // Set document data
    await setDoc(threadRef, {
      thread_name: threadName,
    });

    console.log("Thread added successfully with ID:", threadRef.id);
  } catch (error) {
    console.error("Error adding thread:", error);
  }
}

// Test the addThread function
addThread("Test thread");
