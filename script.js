let products = [];
let cart = [];

fetch('products.json')
.then(res => res.json())
.then(data => {
  products = data;
  showCategories();
  showProducts(products);
});

function showCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  const catDiv = document.getElementById('categories');
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.onclick = () => showProducts(products.filter(p => p.category === cat));
    catDiv.appendChild(btn);
  });
}

function showProducts(list) {
  const prodDiv = document.getElementById('products');
  prodDiv.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `<h3>${p.name}</h3><p>${p.price} ₽</p><button onclick="addToCart('${p.name}',${p.price})">В корзину</button>`;
    prodDiv.appendChild(div);
  });
}

function addToCart(name, price) {
  cart.push({name, price});
  renderCart();
}

function renderCart() {
  const ul = document.getElementById('cart-items');
  ul.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price} ₽`;
    ul.appendChild(li);
  });
}

document.getElementById('checkout').onclick = () => {
  alert('Заказ оформлен! Всего товаров: ' + cart.length);
  cart = [];
  renderCart();
};
