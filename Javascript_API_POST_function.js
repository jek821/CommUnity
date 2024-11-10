// Javascript_API_POST_function.js
// Endpoint URL of your deployed Flask API
const endpoint = "https://ltz8klakk4.execute-api.us-east-1.amazonaws.com/dev/generate-email";

// Function to make the POST request and return the unpacked email content
export async function sendPostRequest(data) {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data  // Assuming data is already in JSON format
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        return result.generated_email;  // Unpacked email content
    } catch (error) {
        console.error("Error sending POST request:", error);
        return null;  // Return null if there was an error
    }
}

import { db } from './firebase-config.js';
// Import the necessary functions from Firebase Firestore
import { addDoc, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
// Function to save email to Firestore
export async function saveEmailToFirestore(text, thread_id) {
    try {
        const docRef = await addDoc(collection(db, "emails"), {
            text: text,
            thread_id: thread_id
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;  // Return the document ID if needed
    } catch (error) {
        console.error("Error adding document to Firebase:", error);
        return null;  // Return null if there was an error
    }
}


/**
 * Retrieves email details by Document ID.
 * @param {string} emailDocId - The Document ID of the email.
 * @returns {Object|null} - Returns an object containing thread_id and text if successful, otherwise null.
 */
export async function getEmailDetailsById(emailDocId) {
    try {
        const emailDocRef = doc(db, "emails", emailDocId); // Reference to the specific document
        const emailDoc = await getDoc(emailDocRef);

        if (!emailDoc.exists()) {
            throw new Error("Email document does not exist");
        }

        // Extract the data fields
        const data = emailDoc.data();
        const threadId = data.thread_id;
        const text = data.text;

        return { thread_id: threadId, text: text };
    } catch (error) {
        console.error("Error retrieving email details:", error);
        return null; // Return null if there was an error
    }
}

// Javascript_API_POST_function.js
import { getDocs } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

/**
 * Retrieves all email document IDs from Firestore.
 * @returns {Array} - An array of email document IDs.
 */
export async function getAllEmailIds() {
    try {
        const querySnapshot = await getDocs(collection(db, "emails"));
        const emailIds = [];
        querySnapshot.forEach(doc => {
            emailIds.push(doc.id);
        });
        return emailIds;
    } catch (error) {
        console.error("Error retrieving email IDs:", error);
        return [];
    }
}