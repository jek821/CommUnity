// Endpoint URL of your deployed Flask API
const endpoint = "https://ltz8klakk4.execute-api.us-east-1.amazonaws.com/dev/generate-email";


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



// Function to make the POST request and return the unpacked email content
async function sendPostRequest(data) {
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


async function saveEmailToFirestore(text, thread_id) {
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
