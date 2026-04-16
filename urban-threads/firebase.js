// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX33_8vYzkk-KSYuD9SBKftSYFsXySTnc",
  authDomain: "urbanthreadsstore-974c2.firebaseapp.com",
  projectId: "urbanthreadsstore-974c2",
  storageBucket: "urbanthreadsstore-974c2.firebasestorage.app",
  messagingSenderId: "236592292149",
  appId: "1:236592292149:web:c2c3be0e2d72cb4715ac7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const db = getFirestore(app);
const auth = getAuth(app);


// Export so other files can use them
export { db, auth, app };

console.log("🔥 Firebase connected (modern)");