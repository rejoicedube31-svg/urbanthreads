import { app, db, auth } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🧠 Load saved cart (optional debug)
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
savedCart.forEach(item => {
  console.log("Loaded item:", item.name);
});

// 🧱 DOM ELEMENTS
const button = document.querySelector('#clickBtn');
const message = document.querySelector('#message');
const productList = document.querySelector('#product-list');


// 🔥 ADD TO CART (FIXED VERSION)
window.addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  console.log("Cart updated:", cart);
};


// 🧾 LOAD PRODUCTS FROM FIREBASE
async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));

  productList.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const product = doc.data();

    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
    `;

    const button = document.createElement("button");
    button.textContent = "Add to Cart";

    // SAFE event binding (NO JSON stringify issues)
    button.onclick = () => addToCart(product);

    productDiv.appendChild(button);
    productList.appendChild(productDiv);
  });
}

// 🚀 INIT PRODUCTS
loadProducts();