import { app, db, auth } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// 🧠 Load saved cart (optional debug)
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
savedCart.forEach(item => {
  console.log("Loaded item:", item.name);
});

// 🧱 DOM ELEMENTS
const button = document.querySelector('#clickBtn');
const message = document.querySelector('#message');
const productList = document.querySelector('#product-list');
const shopMessage = document.querySelector("#shop-message");



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
    <img src="${product.imageURL}" alt="${product.name}" style="width:100%; height:150px; object-fit:cover; border-radius:8px;">
    <h3>${product.name}</h3>
    <p>R${product.price}</p>
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
onAuthStateChanged(auth, (user) => {

  if (!user) {
    shopMessage.textContent = "🔒 Please go to home and sign in to shop";
    productList.style.display = "none";
    return;
  }

  shopMessage.textContent = "Welcome to Urban Threads";
  productList.style.display = "block";

  loadProducts(); // your existing function
});;

onAuthStateChanged(auth, (user) => {
  const userDisplay = document.querySelector("#user-email");
  if (user && userDisplay) {
    userDisplay.textContent = user.email;
  }
});