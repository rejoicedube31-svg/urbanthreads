
import { app, db, auth } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// step 1: Select elements
const button = document.querySelector('#clickBtn');
const message = document.querySelector('#message');
const productList = document.querySelector('#product-list');


// FUNCTION: Add to Cart
window.addToCart = (productName) => {
  console.log(productName + " added to cart");
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
            <button onclick="window.addToCart('${product.name}')">Add to Cart</button>
        `;

        productList.appendChild(productDiv);
    });
}

loadProducts();
