let cart = [];

const products = [
  { name: "Pastel Chocolate", price: 250, img: "assets/pastel.png" },
  { name: "Cupcake Vainilla", price: 50, img: "assets/cupcake.png" },
  { name: "Galletas", price: 80, img: "assets/galletas.png" }
];

// Navegación
function goToMenu() {
  show("menu");
  loadProducts();
}

function goHome() {
  show("home");
}

function openCart() {
  show("cart");
  renderCart();
}

function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Productos
function loadProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart('${p.name}', ${p.price})">Agregar</button>
      </div>
    `;
  });
}

// Carrito
function addToCart(name, price) {
  cart.push({ name, price });
  alert("Agregado");
}

function renderCart() {
  let html = "";
  let total = 0;

  cart.forEach(i => {
    html += `<p>${i.name} - $${i.price}</p>`;
    total += i.price;
  });

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("total").innerText = "Total: $" + total;
}

// Enviar pedido
function sendOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  let order = cart.map(i => i.name).join(", ");

  // 👉 CAMBIA ESTA URL POR TU APPS SCRIPT
  fetch("TU_URL_APPS_SCRIPT", {
    method: "POST",
    body: JSON.stringify({ name, phone, order })
  });

  // WhatsApp
  let msg = `Hola, soy ${name}. Quiero: ${order}`;
  window.open(`https://wa.me/52XXXXXXXXXX?text=${encodeURIComponent(msg)}`);

  alert("Pedido enviado");
  cart = [];
  goHome();
}
