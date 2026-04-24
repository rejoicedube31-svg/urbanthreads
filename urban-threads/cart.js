import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🧱 DOM ELEMENTS
const cartContainer = document.querySelector("#cart-items");
const totalDisplay = document.querySelector("#total");
const cartPage = document.querySelector("#cart-page");
const checkoutBtn = document.querySelector("#checkout-btn");

// 🧠 LOAD CART FROM LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];



// 🧾 RENDER CART FUNCTION
function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  // ❌ EMPTY CART STATE
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    totalDisplay.textContent = "Total: R0";

    if (checkoutBtn) {
      checkoutBtn.style.display = "none";
    }

    return;
  }

  // 🛒 RENDER ITEMS
  cart.forEach((item, index) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity || 1);

    total += price * quantity;

    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>R${price}</p>
      <p>Qty: ${quantity}</p>

      <button onclick="increaseQty(${index})">+</button>
      <button onclick="decreaseQty(${index})">-</button>
      <button onclick="removeItem(${index})">Remove</button>

      <hr>
    `;

    cartContainer.appendChild(div);
  });

  // 💰 UPDATE TOTAL
  totalDisplay.textContent = "Total: R" + total.toFixed(2);

  // 🧾 SHOW CHECKOUT BUTTON
  if (checkoutBtn) {
    checkoutBtn.style.display = "block";
  }
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



// 🔐 AUTH GUARD (ONLY LOGGED-IN USERS)
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



// 🧾 CHECKOUT LOGIC
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // 💰 CALCULATE TOTAL
    let total = 0;
    cart.forEach(item => {
      total += Number(item.price) * (item.quantity || 1);
    });

    // 🎉 SUCCESS MESSAGE
    alert(
      "🎉 Order placed successfully!\n\n" +
      "Items: " + cart.length + "\n" +
      "Total: R" + total.toFixed(2)
    );

    // 🧹 CLEAR CART
    cart = [];
    localStorage.removeItem("cart");

    // 🔄 UPDATE UI BEFORE REDIRECT
    renderCart();

    // 🚀 REDIRECT TO SHOP
    setTimeout(() => {
      window.location.href = "shop.html";
    }, 500);
  });
}