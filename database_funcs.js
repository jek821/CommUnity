// database_funcs.js
import { db } from './firebase-config.js';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  increment,
  getDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Function to add a new thread
export async function addThread(threadName, zipCode, city) {
  try {
    const threadRef = await addDoc(collection(db, "Threads"), {
      thread_name: threadName,
      city: city,
      zip_code: zipCode
    });
    console.log("Thread added successfully with ID:", threadRef.id);
  } catch (error) {
    console.error("Error adding thread:", error);
  }
}

// Modified function to get all threads (renamed to getThreadIdByText)
export async function getThreadIdByText() {
  try {
    const threadsRef = collection(db, 'Threads');
    const snapshot = await getDocs(threadsRef);

    const threads = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      threads.push({
        id: doc.id,
        thread_name: data.thread_name,
        city: data.city,
        zip_code: data.zip_code
      });
    });

    return threads;
  } catch (error) {
    console.error('Error fetching threads:', error);
    throw new Error('Failed to retrieve threads');
  }
}

// Function to add comment to thread
export async function addCommentToThread(threadId, commentText) {
  try {
    const commentsRef = await addDoc(collection(db, "Threads", threadId, "Comments"), {
      text: commentText,
      upvotes: 0
    });
    console.log("Comment added successfully with ID:", commentsRef.id);
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}

// Increment comment upvote count function
export async function incrementUpvote(threadId, commentId) {
  try {
    const commentRef = doc(db, "Threads", threadId, "Comments", commentId);
    await updateDoc(commentRef, {
      upvotes: increment(1)
    });
    console.log("Upvote incremented successfully for comment ID:", commentId);
  } catch (error) {
    console.error("Error incrementing upvote:", error);
  }
}

// Decrement comment upvote count function
export async function decrementUpvote(threadId, commentId) {
  try {
    const commentRef = doc(db, "Threads", threadId, "Comments", commentId);
    await updateDoc(commentRef, {
      upvotes: increment(-1)
    });
    console.log("Upvote decremented successfully for comment ID:", commentId);
  } catch (error) {
    console.error("Error decrementing upvote:", error);
  }
}

// Function to get comments with upvotes
export async function getCommentsWithUpvotes(threadId) {
  try {
    const threadDocRef = doc(db, "Threads", threadId);
    const threadDoc = await getDoc(threadDocRef);

    if (!threadDoc.exists()) {
      throw new Error("Thread does not exist");
    }

    const threadName = threadDoc.data().thread_name;
    const threadZip = threadDoc.data().zip_code;
    const threadCity = threadDoc.data().city;

    const commentsRef = collection(db, "Threads", threadId, "Comments");
    const snapshot = await getDocs(commentsRef);

    const comments = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      comments.push({
        id: doc.id,
        text: data.text,
        upvotes: data.upvotes || 0
      });
    });

    return {
      thread_name: threadName,
      thread_zip: threadZip,
      thread_city: threadCity,
      comments: comments
    };
  } catch (error) {
    console.error("Error fetching comments with upvotes:", error);
    throw new Error("Failed to retrieve comments and thread name");
  }
}
