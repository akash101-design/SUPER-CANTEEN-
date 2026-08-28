const foods = [

  {id:1,name:"Masala Dosa",price:45,cat:"Breakfast",emoji:"🥞",rating:4.8},
  {id:2,name:"Idli Sambar",price:35,cat:"Breakfast",emoji:"🍘",rating:4.7},
  {id:3,name:"Pongal",price:40,cat:"Breakfast",emoji:"🍚",rating:4.6},
  {id:4,name:"Poori Masala",price:50,cat:"Breakfast",emoji:"🥯",rating:4.7},
  {id:5,name:"Vada Sambar",price:30,cat:"Breakfast",emoji:"🍩",rating:4.6},
  {id:6,name:"Chapati Kurma",price:55,cat:"Breakfast",emoji:"🫓",rating:4.7},

  {id:7,name:"Veg Meals",price:80,cat:"Meals",emoji:"🍛",rating:4.8},
  {id:8,name:"Chicken Rice",price:100,cat:"Meals",emoji:"🍗",rating:4.9},
  {id:9,name:"Paneer Rice",price:90,cat:"Meals",emoji:"🍚",rating:4.7},
  {id:10,name:"Curd Rice",price:45,cat:"Meals",emoji:"🥣",rating:4.5},
  {id:11,name:"Sambar Rice",price:50,cat:"Meals",emoji:"🍲",rating:4.6},
  {id:12,name:"Lemon Rice",price:45,cat:"Meals",emoji:"🍋",rating:4.7},
  {id:13,name:"Tomato Rice",price:50,cat:"Meals",emoji:"🍅",rating:4.6},

  {id:14,name:"Classic Burger",price:90,cat:"Fast Food",emoji:"🍔",rating:4.9},
  {id:15,name:"Cheese Burger",price:110,cat:"Fast Food",emoji:"🍔",rating:4.8},
  {id:16,name:"Veg Pizza",price:120,cat:"Fast Food",emoji:"🍕",rating:4.7},
  {id:17,name:"Chicken Pizza",price:150,cat:"Fast Food",emoji:"🍕",rating:4.9},
  {id:18,name:"Veg Noodles",price:75,cat:"Fast Food",emoji:"🍜",rating:4.6},
  {id:19,name:"Chicken Noodles",price:100,cat:"Fast Food",emoji:"🍜",rating:4.8},
  {id:20,name:"Veg Sandwich",price:60,cat:"Fast Food",emoji:"🥪",rating:4.5},
  {id:21,name:"Chicken Roll",price:85,cat:"Fast Food",emoji:"🌯",rating:4.7},
  {id:22,name:"Paneer Roll",price:75,cat:"Fast Food",emoji:"🌯",rating:4.6},

  {id:23,name:"French Fries",price:55,cat:"Snacks",emoji:"🍟",rating:4.8},
  {id:24,name:"Samosa",price:20,cat:"Snacks",emoji:"🔺",rating:4.6},
  {id:25,name:"Veg Puff",price:25,cat:"Snacks",emoji:"🥐",rating:4.5},
  {id:26,name:"Chicken Puff",price:35,cat:"Snacks",emoji:"🥐",rating:4.7},
  {id:27,name:"Spring Roll",price:50,cat:"Snacks",emoji:"🥖",rating:4.6},
  {id:28,name:"Cutlet",price:30,cat:"Snacks",emoji:"🥔",rating:4.5},
  {id:29,name:"Bread Omelette",price:45,cat:"Snacks",emoji:"🍳",rating:4.7},

  {id:30,name:"Fresh Lime",price:30,cat:"Drinks",emoji:"🍋",rating:4.7},
  {id:31,name:"Mango Juice",price:45,cat:"Drinks",emoji:"🥭",rating:4.8},
  {id:32,name:"Orange Juice",price:45,cat:"Drinks",emoji:"🍊",rating:4.7},
  {id:33,name:"Cold Coffee",price:60,cat:"Drinks",emoji:"🥤",rating:4.9},
  {id:34,name:"Milkshake",price:70,cat:"Drinks",emoji:"🥛",rating:4.8},
  {id:35,name:"Tea",price:15,cat:"Drinks",emoji:"☕",rating:4.5},
  {id:36,name:"Filter Coffee",price:25,cat:"Drinks",emoji:"☕",rating:4.8},

  {id:37,name:"Chocolate Cake",price:60,cat:"Dessert",emoji:"🍰",rating:4.9},
  {id:38,name:"Ice Cream",price:50,cat:"Dessert",emoji:"🍦",rating:4.8},
  {id:39,name:"Gulab Jamun",price:40,cat:"Dessert",emoji:"🍮",rating:4.7},
  {id:40,name:"Brownie",price:65,cat:"Dessert",emoji:"🍫",rating:4.9},
  {id:41,name:"Fruit Salad",price:55,cat:"Dessert",emoji:"🍓",rating:4.6},
  {id:42,name:"Mango Ice Cream",price:60,cat:"Dessert",emoji:"🍨",rating:4.8}

];

let cart = JSON.parse(localStorage.getItem("sc_cart")) || [];

let favorites =
  JSON.parse(localStorage.getItem("sc_favorites")) || [];

let orders =
  JSON.parse(localStorage.getItem("sc_orders")) || [];

let category = "All";

/* FOOD DISPLAY */

function displayFoods(list = foods) {

  const grid = document.getElementById("foodGrid");

  grid.innerHTML = "";

  if (!list.length) {

    grid.innerHTML = `
      <div class="empty">
        🔍
        <h3>No food found</h3>
        <p>Try another search.</p>
      </div>
    `;

    return;
  }

  list.forEach(food => {

    const liked = favorites.includes(food.id);

    grid.innerHTML += `

      <div class="foodCard">

        <button
          class="fav"
          onclick="toggleFavorite(${food.id})">
          ${liked ? "❤️" : "🤍"}
        </button>

        <div class="foodImage">
          ${food.emoji}
        </div>

        <h3>${food.name}</h3>

        <span class="rating">
          ⭐ ${food.rating} • ${food.cat}
        </span>

        <div class="foodBottom">

          <span class="price">
            ₹${food.price}
          </span>

          <button
            class="add"
            onclick="addToCart(${food.id})">
            + Add
          </button>

        </div>

      </div>
    `;
  });
}

/* CART */

function addToCart(id) {

  const existing =
    cart.find(item => item.id === id);

  if (existing) {

    existing.qty++;

  } else {

    const food =
      foods.find(item => item.id === id);

    cart.push({
      ...food,
      qty: 1
    });

  }

  saveCart();
  updateCart();

  showToast("Added to cart 🛒");

}

function updateCart() {

  const count =
    cart.reduce((sum,item) => sum + item.qty,0);

  document.getElementById("cartCount")
    .innerText = count;

  const box =
    document.getElementById("cartItems");

  box.innerHTML = "";

  if (!cart.length) {

    box.innerHTML = `
      <div class="empty">
        🛒
        <h3>Your cart is empty</h3>
        <p>Add your favourite food.</p>
      </div>
    `;

  } else {

    cart.forEach(item => {

      box.innerHTML += `

        <div class="cartItem">

          <span class="cartEmoji">
            ${item.emoji}
          </span>

          <div class="cartDetails">

            <b>${item.name}</b>

            <p>
              ₹${item.price}
            </p>

          </div>

          <div class="qty">

            <button
              onclick="changeQty(${item.id},-1)">
              −
            </button>

            <b>${item.qty}</b>

            <button
              onclick="changeQty(${item.id},1)">
              +
            </button>

          </div>

        </div>
      `;

    });

  }

  calculateBill();

}

function changeQty(id,value) {

  const item =
    cart.find(x => x.id === id);

  if (!item) return;

  item.qty += value;

  if (item.qty <= 0) {

    cart =
      cart.filter(x => x.id !== id);

  }

  saveCart();
  updateCart();

}

function calculateBill() {

  const subtotal =
    cart.reduce(
      (sum,item) =>
      sum + item.price * item.qty,
      0
    );

  const discount =
    subtotal >= 300
      ? Math.round(subtotal * .10)
      : 0;

  const total =
    subtotal - discount;

  document.getElementById("subtotal")
    .innerText = subtotal;

  document.getElementById("discount")
    .innerText = discount;

  document.getElementById("total")
    .innerText = total;

}

/* CART UI */

function openCart() {

  document.getElementById("cart")
    .classList.add("show");

  document.getElementById("overlay")
    .classList.add("show");

}

function closeCart() {

  document.getElementById("cart")
    .classList.remove("show");

  document.getElementById("overlay")
    .classList.remove("show");

}

/* SEARCH */

function searchFood() {

  const text =
    document.getElementById("search")
    .value
    .toLowerCase();

  const result =
    foods.filter(food => {

      const name =
        food.name
          .toLowerCase()
          .includes(text);

      const cat =
        category === "All" ||
        food.cat === category;

      return name && cat;

    });

  displayFoods(result);

}

/* FILTER */

function filterFood(cat,button) {

  category = cat;

  document
    .querySelectorAll(".categories button")
    .forEach(btn =>
      btn.classList.remove("active")
    );

  button.classList.add("active");

  searchFood();

}

/* FAVORITES */

function toggleFavorite(id) {

  if (favorites.includes(id)) {

    favorites =
      favorites.filter(x => x !== id);

    showToast("Removed from favourites");

  } else {

    favorites.push(id);

    showToast("Added to favourites ❤️");

  }

  localStorage.setItem(
    "sc_favorites",
    JSON.stringify(favorites)
  );

  searchFood();

}

function showFavorites() {

  const list =
    foods.filter(food =>
      favorites.includes(food.id)
    );

  displayFoods(list);

  document
    .getElementById("menu")
    .scrollIntoView({
      behavior:"smooth"
    });

}

/* SMART RECOMMENDATION */

function smartCombo() {

  const combos = [

    "🍔 Classic Burger + 🍟 French Fries + 🥤 Cold Coffee",

    "🥞 Masala Dosa + ☕ Filter Coffee",

    "🍕 Chicken Pizza + 🥤 Mango Juice",

    "🍛 Veg Meals + 🍋 Fresh Lime",

    "🍜 Chicken Noodles + 🥤 Cold Coffee",

    "🌯 Chicken Roll + 🍟 French Fries"

  ];

  const random =
    combos[
      Math.floor(Math.random()*combos.length)
    ];

  document.getElementById("recommendation")
    .innerText = random;

  document.getElementById("recommendText")
    .innerText =
    "✨ Smart Combo generated for you!";

}

function smartRecommendation() {

  if (!orders.length) {

    document.getElementById("recommendation")
      .innerText =
      "🔥 Try Classic Burger + Cold Coffee";

    return;

  }

  const last =
    orders[orders.length - 1];

  const item =
    last.items[0];

  document.getElementById("recommendation")
    .innerText =
    "Because you ordered " +
    item.name +
    " before ❤️";

}

/* CHECKOUT */

function checkout() {

  if (!cart.length) {

    showToast("Your cart is empty 🛒");

    return;

  }

  const id =
    "SC" +
    Math.floor(
      100000 + Math.random()*900000
    );

  const subtotal =
    cart.reduce(
      (sum,item) =>
      sum + item.price * item.qty,
      0
    );

  const discount =
    subtotal >= 300
      ? Math.round(subtotal*.10)
      : 0;

  const order = {

    id:id,

    items:
      cart.map(item => ({
        name:item.name,
        price:item.price,
        qty:item.qty,
        emoji:item.emoji
      })),

    total:
      subtotal-discount,

    status:"Preparing",

    time:
      new Date().toLocaleString()

  };

  orders.push(order);

  localStorage.setItem(
    "sc_orders",
    JSON.stringify(orders)
  );

  document.getElementById("newOrderID")
    .innerText = id;

  cart = [];

  saveCart();
  updateCart();
  closeCart();

  document.getElementById("orderModal")
    .classList.add("show");

  displayOrders();

  smartRecommendation();

}

/* ORDER HISTORY */

function displayOrders() {

  const box =
    document.getElementById("orderHistory");

  if (!orders.length) {

    box.innerHTML = `
      <div class="empty">
        📦
        <h3>No orders yet</h3>
        <p>Your orders will appear here.</p>
      </div>
    `;

    return;

  }

  box.innerHTML = "";

  [...orders]
    .reverse()
    .forEach(order => {

      box.innerHTML += `

        <div class="orderHistoryCard">

          <div>

            <b>
              ${order.id}
            </b>

            <small>
              ${order.time}
            </small>

          </div>

          <div>

            <b>
              ₹${order.total}
            </b>

            <div class="status">
              🟠 ${order.status}
            </div>

          </div>

        </div>

      `;

    });

}

/* THEME */

function toggleTheme() {

  document.body.classList.toggle("dark");

  const dark =
    document.body.classList.contains("dark");

  localStorage.setItem(
    "sc_dark",
    dark
  );

}

/* TOAST */

function showToast(message) {

  const toast =
    document.getElementById("toast");

  toast.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  },2000);

}

/* ORDER MODAL */

function closeOrder() {

  document.getElementById("orderModal")
    .classList.remove("show");

}

/* NAVIGATION */

function goMenu() {

  document
    .getElementById("menu")
    .scrollIntoView({
      behavior:"smooth"
    });

}

/* STORAGE */

function saveCart() {

  localStorage.setItem(
    "sc_cart",
    JSON.stringify(cart)
  );

}

/* START */

if (
  localStorage.getItem("sc_dark") === "true"
) {

  document.body.classList.add("dark");

}

displayFoods();
updateCart();
displayOrders();
smartRecommendation();
