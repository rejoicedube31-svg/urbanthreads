const cartContainer = document.querySelector("#cart-items");
const totalDisplay = document.querySelector("#total");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// FUNCTION: Render cart
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

  totalDisplay.textContent = "Total: R" + total.toFixed(2);
}

// FUNCTION: Remove item
window.removeItem = (index) => {
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
};

// Initial render
renderCart();