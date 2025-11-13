const cartItems = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ Ensure every item has qty
cart = cart.map(item => ({ ...item, qty: item.qty || 1 }));

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty 😢</p>";
    totalPriceEl.textContent = "";
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-info">
        <h4>${item.title}</h4>
        <p>₹${(item.price * 83).toLocaleString()}</p>

        <div class="quantity-controls">
          <button onclick="decreaseQty(${item.id})">−</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${item.id})">+</button>
        </div>
      </div>
      <div class="cart-actions">
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    </div>
  `).join("");

  updateTotal();
}

function increaseQty(id) {
  cart = cart.map(item => {
    if (item.id === id) {
      return { ...item, qty: item.qty + 1 };
    }
    return item;
  });
  saveAndRender();
}

function decreaseQty(id) {
  cart = cart.map(item => {
    if (item.id === id && item.qty > 1) {
      return { ...item, qty: item.qty - 1 };
    }
    return item;
  });
  saveAndRender();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveAndRender();
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + (item.price * 83 * item.qty), 0);
  totalPriceEl.textContent = `Total: ₹${total.toLocaleString()}`;
}

function saveAndRender() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
