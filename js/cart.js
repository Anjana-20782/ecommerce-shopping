const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
  cartItems.innerHTML = "<p>Your cart is empty 😢</p>";
  totalPrice.textContent = "";
} else {
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-info">
        <h4>${item.title}</h4>
        <p>₹${(item.price * 83).toLocaleString()}</p>
      </div>
      <div class="cart-actions">
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price * 83, 0);
  totalPrice.textContent = `Total: ₹${total.toLocaleString()}`;
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
