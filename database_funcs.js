// database_funcs.js
import { db } from './firebase-config.js';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  increment,
  getDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Add thread function
export async function addThread(threadName, zipCode, city) {
  try {
    const threadRef = doc(collection(db, "Threads")); // Auto-generate thread ID

    await setDoc(threadRef, {
      thread_name: threadName,
      city: city,
      zip_code: zipCode;
    });

    console.log("Thread added successfully with ID:", threadRef.id);
  } catch (error) {
    console.error("Error adding thread:", error);
  }
}

// Function to add new comment to a thread
export async function addCommentToThread(threadId, commentText) {
  try {
    const commentsRef = doc(collection(db, "Threads", threadId, "Comments")); // Auto-generate comment ID

    await setDoc(commentsRef, {
      text: commentText,
      upvotes: 0,
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

// Get comments with upvotes
export async function getCommentsWithUpvotes(threadId) {
  try {
    const threadDocRef = doc(db, "Threads", threadId);
    const threadDoc = await getDoc(threadDocRef);

    if (!threadDoc.exists()) {
      throw new Error("Thread does not exist");
    }

    const threadName = threadDoc.data().thread_name;
    const commentsRef = collection(db, "Threads", threadId, "Comments");
    const snapshot = await getDocs(commentsRef);
    const threadZip = threadDoc.data().zip_code;
    const threadCity = threadDoc.data().city;

    const commentsDict = { thread_name: threadName, thread_zip: threadZip, thread_city: threadCity };

    snapshot.forEach((doc) => {
      const data = doc.data();
      const commentText = data.text;
      const upvotes = data.upvotes || 0;
      commentsDict[commentText] = upvotes;
    });

    return JSON.stringify(commentsDict);
  } catch (error) {
    console.error("Error fetching comments with upvotes:", error);
    throw new Error("Failed to retrieve comments and thread name");
  }
}

// Function to get thread ID by text
export async function getThreadIdByText(threadText) {
  try {
    const threadsRef = collection(db, 'Threads');
    const q = query(threadsRef, where('thread_name', '==', threadText));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('No matching thread found.');
      return null;
    }

    let threadId = null;
    snapshot.forEach(doc => {
      threadId = doc.id;
    });

    return threadId;
  } catch (error) {
    console.error("Error fetching thread ID:", error);
    throw new Error("Failed to retrieve thread ID");
  }
}

// Function to get all threads
export async function getThreads() {
  try {
    const threadsRef = collection(db, 'Threads');
    const snapshot = await getDocs(threadsRef);

    const threads = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      threads.push({
        id: doc.id,
        thread_name: data.thread_name,
      });
    });

    return threads;
  } catch (error) {
    console.error("Error fetching threads:", error);
    throw new Error("Failed to retrieve threads");
  }
}
