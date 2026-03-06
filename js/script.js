console.log("SCRIPT LOADED ✅");

// ================= PRODUCTS =================
const products = [
  { name: "Burger", price: 10, image: "images/burger.jpg", category: "Food" },
  { name: "Pizza", price: 15, image: "images/pizza.jpg", category: "Food" },
  { name: "Pasta", price: 8, image: "images/pasta.jpg", category: "Food" },

  { name: "Steak", price: 12, image: "images/steak.jpg", category: "Food" },
  { name: "Onion Rings", price: 5, image: "images/onion-rings.jpg", category: "Food" },
  { name: "Fries", price: 5, image: "images/frenchfries.jpg", category: "Food" },

  { name: "Coke", price: 3, image: "images/Coke.webp", category: "Drinks" },
  { name: "Water", price: 2, image: "images/water.png", category: "Drinks" },
  { name: "Coffee", price: 3, image: "images/coffee.jpg", category: "Drinks" },
  { name: "Milktea", price: 2, image: "images/milktea.jpg", category: "Drinks" },
  { name: "Bubble Tea", price: 3, image: "images/bubble-tea.jpg", category: "Drinks" },

  { name: "Cake", price: 6, image: "images/cake.jpg", category: "Dessert" },
  { name: "Ice Cream", price: 4, image: "images/icecream.png", category: "Dessert" },
  { name: "Maja Blanca", price: 6, image: "images/maja.jpg", category: "Dessert" },
  { name: "Lecheflan", price: 4, image: "images/lecheflan.jpg", category: "Dessert" },
  { name: "Halo-Halo", price: 6, image: "images/halo-halo.jpg", category: "Dessert" },
  { name: "Graham", price: 4, image: "images/graham.jpg", category: "Dessert" }
];

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
        <p>$${product.price}</p>
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

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

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
        ${item.name} - $${item.price}
        <button onclick="decrease(${item.id})">-</button>
        ${item.quantity}
        <button onclick="increase(${item.id})">+</button>
        <button onclick="removeItem(${item.id})">❌</button>
      </p>
    `;
  });

  totalDiv.innerHTML = "Total: $" + total;

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

  const newOrder = {
    id: Date.now(),
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

// ================= LOAD PAGE =================
window.addEventListener("DOMContentLoaded", () => {
  filterCategory("All");
  renderCart();
  updateBadge();
});

function openCart() {
  const modal = document.getElementById("cart-modal");
  if (modal) modal.style.display = "block";
}

function closeCart() {
  const modal = document.getElementById("cart-modal");
  if (modal) modal.style.display = "none";
}
// ================= GO TO ORDER PAGE =================
function goToOrders() {
  window.location.href = "order.html";
}

// ================= CLOSE SUCCESS MODAL =================
function closeSuccess() {
  const modal = document.getElementById("checkout-success");
  if (modal) {
    modal.style.display = "none";
  }
}

const particlesContainer = document.querySelector(".particles");

let mouseX = 0;
let mouseY = 0;

/* Track Mouse Movement */
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

/* Create Particles */
for(let i = 0; i < 80; i++){

  const particle = document.createElement("span");

  particle.style.left = Math.random() * 100 + "vw";
  particle.style.top = Math.random() * 100 + "vh";

  particle.style.animationDuration = (10 + Math.random() * 20) + "s";
  particle.style.animationDelay = Math.random() * 10 + "s";

  particlesContainer.appendChild(particle);
}

/* Mouse Attraction Effect */
setInterval(() => {

  const particles = document.querySelectorAll(".particles span");

  particles.forEach(p => {

    let rect = p.getBoundingClientRect();

    let dx = mouseX - (rect.left + rect.width / 2);
    let dy = mouseY - (rect.top + rect.height / 2);

    let dist = Math.sqrt(dx * dx + dy * dy);

    if(dist < 150){

      p.style.transform = `translate(${dx * 0.05}px, ${dy * 0.05}px)`;
      p.style.opacity = 1;

    } else {

      p.style.transform = "translate(0,0)";
    }

  });

}, 50);
