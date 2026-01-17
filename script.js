/* =======================
   GLOBAL STATE
======================= */
let cart = [];

/* =======================
   DOM SELECTORS
======================= */
const cartPlus = document.getElementById("cart-plus");
const cartPage = document.getElementById("cart-page");
const checkout = document.getElementById("checkout");
const tableBody = document.getElementById("table-body");
const totalItem = document.getElementById("total-item");
const totalPrice = document.getElementById("total-price");
const addAddress = document.getElementById("add-address");

/* =======================
   ADD TO CART
======================= */
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest("#item-card");

    const name = card.querySelector("#item-name").innerText;
    const priceText = card.querySelector("#item-price").innerText;
    const price = parseInt(priceText.replace(/\D/g, ""));
    const img = card.querySelector("img").src;

    let item = cart.find((i) => i.name === name);

    if (!item) {
      cart.push({
        name,
        price,
        img,
        qty: 1,
      });
      btn.classList.add("toggle-heart");
    }

    updateCart();
  });
});

/* =======================
   UPDATE CART UI
======================= */
function updateCart() {
  tableBody.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.img}"></td>
      <td>${item.name}</td>
      <td>
        <button onclick="decrease(${index})">-</button>
        <span>${item.qty}</span>
        <button onclick="increase(${index})">+</button>
      </td>
      <td>$${item.price * item.qty}</td>
    `;

    tableBody.appendChild(row);
  });

  cartPlus.innerText = ` ${cart.length} Items`;
  totalItem.innerText = `Total Item : ${cart.length}`;
  totalPrice.innerText = `Total Price : $ ${total}`;
}

/* =======================
   QUANTITY HANDLERS
======================= */
window.increase = function (index) {
  cart[index].qty++;
  updateCart();
};

window.decrease = function (index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
};

/* =======================
   CART TOGGLE
======================= */
cartPlus.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  cartPage.classList.toggle("cart-toggle");
  checkout.classList.toggle("cart-toggle");
});

/* =======================
   ADDRESS
======================= */
addAddress.addEventListener("click", () => {
  const address = prompt("Enter your delivery address");
  if (address) {
    addAddress.innerText = address;
  }
});
