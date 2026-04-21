import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🧱 DOM ELEMENTS
const cartContainer = document.querySelector("#cart-items");
const totalDisplay = document.querySelector("#total");
const cartPage = document.querySelector("#cart-page");

// 🧠 LOAD CART FROM STORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🧾 RENDER CART FUNCTION
function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    totalDisplay.textContent = "Total: $0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * (item.quantity || 1);

    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
      <p>Qty: ${item.quantity || 1}</p>

      <button onclick="increaseQty(${index})">+</button>
      <button onclick="decreaseQty(${index})">-</button>
      <button onclick="removeItem(${index})">Remove</button>

      <hr>
    `;

    cartContainer.appendChild(div);
  });

  totalDisplay.textContent = "Total: $" + total.toFixed(2);
}

// ❌ REMOVE ITEM
window.removeItem = (index) => {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

// ➕ INCREASE QUANTITY
window.increaseQty = (index) => {
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

// ➖ DECREASE QUANTITY
window.decreaseQty = (index) => {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

// 🔐 AUTH GUARD (controls access)
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Please log in to view your cart");
    window.location.href = "login.html";
  } else {
    if (cartPage) {
      cartPage.style.display = "block";
    }
    renderCart();
  }
});