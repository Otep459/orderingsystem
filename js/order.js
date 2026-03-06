console.log("ORDER JS LOADED ✅");

// ================= LOAD ORDERS =================
let allOrders = [];

function loadOrders() {
  allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  displayOrders(allOrders);
}

// ================= DISPLAY ORDERS =================
function displayOrders(orders) {

  const container = document.getElementById("orders");
  if (!container) return;

  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>No orders found.</p>";
    return;
  }

  orders.forEach(order => {

    let itemsHTML = "";
    let grandTotal = 0;

    order.items.forEach(item => {

      const subtotal = item.price * item.quantity;
      grandTotal += subtotal;

      itemsHTML += `
        <tr>
          <td>${item.name}</td>
          <td>₱${item.price}</td>
          <td>${item.quantity}</td>
          <td>₱${subtotal}</td>
        </tr>
      `;
    });

    container.innerHTML += `
      <div class="order-card">
        <h3>🆔 Order #${order.id}</h3>
        <p><strong>Date:</strong> ${order.date}</p>

        <table>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
          </tr>
          ${itemsHTML}
        </table>

        <h4>💰 Total: ₱${grandTotal.toFixed(2)}</h4>

        <button class="delete-btn" onclick="deleteOrder(${order.id})">
          🗑 Remove Order
        </button>
      </div>
    `;
  });
}

// ================= DELETE ORDER =================
function deleteOrder(id) {

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders = orders.filter(order => order.id !== id);

  localStorage.setItem("orders", JSON.stringify(orders));

  showToast("Order deleted successfully 🗑️");
  loadOrders();
}

// ================= FILTER =================
function filterOrders() {

  const searchValue = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const dateValue = document.getElementById("dateFilter")?.value || "";

  let filtered = allOrders;

  if (searchValue) {
    filtered = filtered.filter(order =>
      String(order.id).includes(searchValue) ||
      order.date.toLowerCase().includes(searchValue)
    );
  }

  if (dateValue) {
    filtered = filtered.filter(order =>
      order.date.includes(dateValue)
    );
  }

  displayOrders(filtered);
}

// ================= TOAST =================
function showToast(message) {

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ================= PAGE LOAD =================
window.addEventListener("DOMContentLoaded", () => {

  loadOrders();
  initThemeFromStorage();
  initSnowTheme();

});


// =====================================================
// 🌈 THEME SYSTEM (FULL SYNC WITH MAIN SCRIPT)
// =====================================================

let rainbowInterval = null;

function initThemeFromStorage() {

  const savedColor = localStorage.getItem("themeColor");

  if (savedColor) {
    applyThemeColor(savedColor);
  }
}

// Apply theme
function applyThemeColor(color) {

  // Stop old rainbow if running
  if (rainbowInterval) {
    clearInterval(rainbowInterval);
  }

  document.documentElement.style.setProperty("--theme-color", color);
  document.documentElement.style.setProperty("--hover-color", color);

  localStorage.setItem("themeColor", color);

  // Start rainbow auto mode
  startRainbowMode();
}

// Rainbow animation
function startRainbowMode() {

  let hue = 0;

  rainbowInterval = setInterval(() => {

    hue += 2;

    const rainbowColor = `hsl(${hue}, 100%, 60%)`;

    document.documentElement.style.setProperty("--theme-color", rainbowColor);
    document.documentElement.style.setProperty("--hover-color", rainbowColor);

  }, 50);
}


// =====================================================
// ❄ BIG SNOW THEME SYSTEM
// =====================================================

const snowContainer = document.createElement("div");
snowContainer.classList.add("snow-container");
document.body.appendChild(snowContainer);

const themeColors = [
  "#00ffff",
  "#ff00ff",
  "#00ff88",
  "#ff4d4d",
  "#ffd700",
  "#4da6ff"
];

function initSnowTheme() {
  createBigSnow();
}

// Create one big snow
function createBigSnow() {

  snowContainer.innerHTML = "";

  const snow = document.createElement("div");
  snow.classList.add("big-snow");

  const randomColor =
    themeColors[Math.floor(Math.random() * themeColors.length)];

  snow.style.background = randomColor;
  snow.style.left = "50%";
  snow.style.top = "40%";

  snow.addEventListener("click", () => {

    applyThemeColor(randomColor);
    snow.remove();

  });

  snowContainer.appendChild(snow);
}