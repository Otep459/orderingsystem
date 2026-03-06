console.log("SCRIPT LOADED ✅");

// ================= PRODUCTS =================
const products = [
  { id: 1, name: "Burger", price: 109, image: "images/burger.jpg", category: "Food" },
  { id: 2, name: "Pizza", price: 245, image: "images/pizza.jpg", category: "Food" },
  { id: 3, name: "Pasta", price: 119, image: "images/pasta.jpg", category: "Food" },

  { id: 4, name: "Steak", price: 129, image: "images/steak.jpg", category: "Food" },
  { id: 5, name: "Onion Rings", price: 59, image: "images/onion-rings.jpg", category: "Food" },
  { id: 6, name: "Fries", price: 59, image: "images/frenchfries.jpg", category: "Food" },

  { id: 7, name: "Coke", price: 30, image: "images/Coke.webp", category: "Drinks" },
  { id: 8, name: "Water", price: 20, image: "images/water.png", category: "Drinks" },
  { id: 9, name: "Coffee", price: 69, image: "images/coffee.jpg", category: "Drinks" },
  { id: 10, name: "Milktea", price: 79, image: "images/milktea.jpg", category: "Drinks" },
  { id: 11, name: "Bubble Tea", price: 79, image: "images/bubble-tea.jpg", category: "Drinks" },

  { id: 12, name: "Cake", price: 499, image: "images/cake.jpg", category: "Dessert" },
  { id: 13, name: "Ice Cream", price: 99, image: "images/icecream.jpg", category: "Dessert" },
  { id: 14, name: "Maja Blanca", price: 129, image: "images/maja.jpg", category: "Dessert" },
  { id: 15, name: "Lecheflan", price: 129, image: "images/lecheflan.jpg", category: "Dessert" },
  { id: 16, name: "Halo-Halo", price: 79, image: "images/halo-halo.jpg", category: "Dessert" },
  { id: 17, name: "Graham", price: 119, image: "images/graham.jpg", category: "Dessert" }
];

// ================= ORDER ID COUNTER =================
let lastOrderId = localStorage.getItem("lastOrderId")
  ? Number(localStorage.getItem("lastOrderId"))
  : 0;

// ================= FILTER PRODUCTS =================
function filterCategory(category) {

  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  const filtered =
    category === "All"
      ? products
      : products.filter(p => p.category === category);

  filtered.forEach(product => {

    container.innerHTML += `
      <div class="card">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p> ₱${product.price}</p>
        <button onclick="addToCart(${product.id})">
          Add To Cart
        </button>
      </div>
    `;
  });
}

// ================= CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {

  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });

  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateBadge();
}

function renderCart() {

  const cartDiv = document.getElementById("cart");
  const totalDiv = document.getElementById("total");
  if (!cartDiv || !totalDiv) return;

  cartDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>🛒 Cart is empty</p>";
  }

  cart.forEach(item => {

    total += item.price * item.quantity;

    cartDiv.innerHTML += `
      <p>
        ${item.name} - ₱${item.price}
        <button onclick="decrease(${item.id})">-</button>
        ${item.quantity}
        <button onclick="increase(${item.id})">+</button>
        <button onclick="removeItem(${item.id})">❌</button>
      </p>
    `;
  });

  totalDiv.innerHTML = "Total: ₱" + total;

  const checkoutBtn = document.getElementById("checkoutBtn");
  checkoutBtn?.toggleAttribute("disabled", cart.length === 0);
}

function increase(id) {
  const item = cart.find(i => i.id === id);
  if (item) item.quantity++;
  saveCart();
  renderCart();
}

function decrease(id) {
  const item = cart.find(i => i.id === id);
  if (item && item.quantity > 1) item.quantity--;
  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function updateBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.innerText = count;
}

// ================= CHECKOUT =================
function checkout() {

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  const total = cart.reduce((sum, item) =>
    sum + item.price * item.quantity, 0);

  lastOrderId++;
  localStorage.setItem("lastOrderId", lastOrderId);

  const newOrder = {
    id: lastOrderId,
    items: cart,
    total: total,
    date: new Date().toLocaleString()
  };

  orders.push(newOrder);

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");

  cart = [];

  renderCart();
  updateBadge();

  document.getElementById("checkout-success").style.display = "flex";
}

// ================= RESET ORDER ID =================
function resetOrderId() {
  localStorage.setItem("lastOrderId", 0);
  lastOrderId = 0;
  alert("Order ID Reset ✅");
}

// ================= PAGE LOAD =================
window.addEventListener("DOMContentLoaded", () => {
  filterCategory("All");
  renderCart();
  updateBadge();
  initSnowTheme();
});

// ================= MODALS =================
function openCart() {
  document.getElementById("cart-modal")?.style.setProperty("display", "block");
}

function closeCart() {
  document.getElementById("cart-modal")?.style.setProperty("display", "none");
}

function goToOrders() {
  window.location.href = "order.html";
}

function closeSuccess() {
  document.getElementById("checkout-success")?.style.setProperty("display", "none");
}

// =====================================================
// 🌨️ COLOR SNOW THEME SYSTEM (INTEGRATED)
// =====================================================

// =====================================================
// 🌈 AUTO RAINBOW + BIG SNOW THEME SYSTEM
// =====================================================

const snowContainer = document.createElement("div");
snowContainer.classList.add("snow-container");
document.body.appendChild(snowContainer);

// 🎨 Theme Colors
const themeColors = [
  "#00ffff",
  "#ff00ff",
  "#00ff88",
  "#ff4d4d",
  "#ffd700",
  "#4da6ff"
];

let currentThemeColor = themeColors[0];
let rainbowInterval = null;

// ================= APPLY THEME =================
function applyThemeColor(color) {

  currentThemeColor = color;

  document.documentElement.style.setProperty("--theme-color", color);
  document.documentElement.style.setProperty("--hover-color", color);

  localStorage.setItem("themeColor", color);

  startRainbowMode(color);
}

// =====================================================
// 🌈 AUTO RAINBOW MODE (Smooth Transition)
// =====================================================
function startRainbowMode(baseColor) {

  if (rainbowInterval) clearInterval(rainbowInterval);

  let hue = 0;

  rainbowInterval = setInterval(() => {

    hue += 2;

    const rainbowColor = `hsl(${hue}, 100%, 60%)`;

    document.documentElement.style.setProperty("--theme-color", rainbowColor);
    document.documentElement.style.setProperty("--hover-color", rainbowColor);

  }, 50);
}

// =====================================================
// ❄️ CREATE ONE BIG SNOW PARTICLE
// =====================================================
function createBigSnow() {

  snowContainer.innerHTML = "";

  const snow = document.createElement("div");
  snow.classList.add("big-snow");

  const randomColor =
    themeColors[Math.floor(Math.random() * themeColors.length)];

  snow.style.background = randomColor;
  snow.style.left = "50%";
  snow.style.top = "40%";

  // ✅ Click Snow → Change Theme
  snow.addEventListener("click", () => {
    applyThemeColor(randomColor);
    snow.remove();
  });

  snowContainer.appendChild(snow);
}



// Load saved theme on refresh
window.addEventListener("DOMContentLoaded", () => {

  const savedColor = localStorage.getItem("themeColor");

  if (savedColor) {
    applyThemeColor(savedColor);
  }

});