console.log("ORDER JS LOADED ✅");

// ================= LOAD ORDERS =================
let allOrders = [];

function loadOrders() {
  allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  console.log("Orders from localStorage:", allOrders);
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
          <td>$${item.price}</td>
          <td>${item.quantity}</td>
          <td>$${subtotal}</td>
        </tr>
      `;
    });

    container.innerHTML += `
      <div class="order-card">
        <h3>🆔 Order #${order.id}</h3>
        <p><strong>Date:</strong> ${order.date}</p>

        <table border="1" width="100%" cellpadding="6">
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
          </tr>
          ${itemsHTML}
        </table>

        <h4>💰 Total: $${grandTotal.toFixed(2)}</h4>

        <button onclick="deleteOrder(${order.id})"
          style="margin-top:10px;background:red;color:white;padding:6px 12px;border:none;border-radius:6px;cursor:pointer;">
           Remove Order
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

  showToast("Order deleted successfully 🗑️", "success");
  loadOrders();
}

// ================= SEARCH + FILTER =================
function filterOrders() {

  const searchValue = document
    .getElementById("searchInput")
    ?.value.toLowerCase() || "";

  const dateValue = document
    .getElementById("dateFilter")
    ?.value || "";

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
function showToast(message, type = "success") {

  const toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ================= LOAD PAGE =================
window.addEventListener("DOMContentLoaded", loadOrders);

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