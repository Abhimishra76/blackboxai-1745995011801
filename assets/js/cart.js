// Cart page script to render cart items and handle quantity updates and removal

// Get cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  }
}

// Render cart items in cart.html
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElem = document.getElementById('cart-total');
  if (!cartItemsContainer || !cartTotalElem) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-center text-gray-600">Your cart is empty.</p>';
    cartTotalElem.textContent = 'Total: Rs. 0';
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = '';

  cart.forEach(item => {
    total += item.price * item.quantity;
    const itemElem = document.createElement('div');
    itemElem.className = 'flex items-center border-b border-gray-200 py-4';

    itemElem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded mr-4" />
      <div class="flex-grow">
        <h3 class="font-semibold text-lg">${item.name}</h3>
        <p class="text-red-600 font-bold">Rs. ${item.price.toLocaleString()}</p>
        <p class="text-gray-600">${item.description}</p>
      </div>
      <div class="flex items-center space-x-2">
        <button class="bg-gray-300 px-2 rounded hover:bg-gray-400" data-id="${item.id}" data-action="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="bg-gray-300 px-2 rounded hover:bg-gray-400" data-id="${item.id}" data-action="increase">+</button>
      </div>
      <button class="text-red-600 ml-4 hover:text-red-800" data-id="${item.id}" data-action="remove" title="Remove item">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;

    cartItemsContainer.appendChild(itemElem);
  });

  cartTotalElem.textContent = `Total: Rs. ${total.toLocaleString()}`;

  // Add event listeners for buttons
  cartItemsContainer.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = parseInt(button.getAttribute('data-id'));
      const action = button.getAttribute('data-action');
      if (action === 'increase') {
        changeQuantity(id, 1);
      } else if (action === 'decrease') {
        changeQuantity(id, -1);
      } else if (action === 'remove') {
        removeItem(id);
      }
    });
  });
}

// Change quantity of a cart item
function changeQuantity(productId, delta) {
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    alert('Please login or signup to modify your cart.');
    window.location.href = 'login.html';
    return;
  }
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity < 1) {
    removeItem(productId);
  } else {
    saveCart();
    renderCartItems();
    updateCartCount();
  }
}

// Remove item from cart
function removeItem(productId) {
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    alert('Please login or signup to modify your cart.');
    window.location.href = 'login.html';
    return;
  }
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  renderCartItems();
  updateCartCount();
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Initialize cart page
function initCartPage() {
  renderCartItems();
  updateCartCount();

  // Mobile menu toggle (reuse from app.js if needed)
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const menu = document.getElementById('mobile-menu');
      if (menu) menu.classList.toggle('hidden');
    });
  }
}

document.addEventListener('DOMContentLoaded', initCartPage);
