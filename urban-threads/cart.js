import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const cartContainer = document.querySelector("#cart-items");
const totalDisplay = document.querySelector("#total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartContainer.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    totalDisplay.textContent = "Total: $0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
      <button onclick="removeItem(${index})">Remove</button>
      <hr>
    `;

    cartContainer.appendChild(div);
  });

  totalDisplay.textContent = "Total: $" + total.toFixed(2);
}

window.removeItem = (index) => {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

// 🔐 AUTH GUARD (controls access)
const cartPage = document.querySelector("#cart-page");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Please log in to view your cart");
    window.location.href = "login.html";
  } else {
    cartPage.style.display = "block"; // ✅ show page ONLY now
    renderCart();
  }
});