
import { app, db, auth } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

savedCart.forEach(item => {
  console.log("Loaded item:", item.name);
});

// step 1: Select elements
const button = document.querySelector('#clickBtn');
const message = document.querySelector('#message');
const productList = document.querySelector('#product-list');


// FUNCTION: Add to Cart
window.addToCart = (product) => {
  // Get existing cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Add new product
  cart.push(product);

  // Save back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  console.log("Cart:", cart);
};

// Function to display products

async function loadProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));

    productList.innerHTML = '';

    querySnapshot.forEach((doc) => {
        const product = doc.data();

        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
        `;

        productList.appendChild(productDiv);
    });
}

loadProducts();
