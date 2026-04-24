import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");

const signupBtn = document.querySelector("#signupBtn");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const userInfo = document.querySelector("#userInfo");

const clearInputs = () => {
  email.value = "";
  password.value = "";
};



// 🔥 SIGN UP (AUTO LOGIN + REDIRECT)
signupBtn.addEventListener("click", async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    console.log("User signed up + logged in:", userCredential.user);

    clearInputs();

    // 🚀 AUTO REDIRECT AFTER SIGNUP
    window.location.href = "index.html";

  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
});



// 🔐 LOGIN
loginBtn.addEventListener("click", async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    console.log("User logged in:", userCredential.user);

    clearInputs();

    // 🚀 REDIRECT AFTER LOGIN
    window.location.href = "index.html";

  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
});



// 🚪 LOGOUT
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);

  console.log("User signed out");

  clearInputs();
});



// 👤 TRACK USER STATE
onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo.textContent = "Logged in as: " + user.email;
  } else {
    userInfo.textContent = "Not logged in";
  }
});