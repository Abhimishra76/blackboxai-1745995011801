// Sample product data
const products = [
  {
    id: 1,
    name: "Samsung Galaxy S22",
    category: "Mobiles",
    price: 65000,
    image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Latest Samsung flagship smartphone with powerful performance."
  },
  {
    id: 2,
    name: "Apple MacBook Pro 14\"",
    category: "Laptops",
    price: 220000,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Powerful laptop with M1 Pro chip for professionals."
  },
  {
    id: 3,
    name: "Men's Casual T-Shirt",
    category: "Fashion",
    price: 1200,
    image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Comfortable cotton casual t-shirt for men."
  },
  {
    id: 4,
    name: "Modern Sofa Set",
    category: "Home & Living",
    price: 45000,
    image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Stylish and comfortable sofa set for your living room."
  },
  {
    id: 5,
    name: "Children's Story Book",
    category: "Books",
    price: 350,
    image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Engaging story book for children aged 5-10."
  },
  {
    id: 6,
    name: "Baby Stroller",
    category: "Baby & Toys",
    price: 15000,
    image: "https://images.pexels.com/photos/3661476/pexels-photo-3661476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Lightweight and foldable baby stroller for easy travel."
  }
];

// Cart data stored in localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Render products on index.html
function renderProducts(productList) {
  const productListContainer = document.getElementById('product-list');
  productListContainer.innerHTML = '';
  productList.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'bg-white rounded shadow p-4 flex flex-col hover:shadow-lg transition cursor-pointer';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="h-48 w-full object-cover rounded mb-4" />
      <h3 class="font-semibold text-lg mb-1">${product.name}</h3>
      <p class="text-red-600 font-bold mb-2">Rs. ${product.price.toLocaleString()}</p>
      <p class="text-gray-600 text-sm flex-grow">${product.description}</p>
      <button class="mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;
    productListContainer.appendChild(productCard);
  });

  // Add event listeners to add to cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt(e.target.getAttribute('data-id'));
      addToCart(productId);
    });
  });
}

// Add product to cart
function addToCart(productId) {
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    alert('Please login or signup to add products to cart.');
    window.location.href = 'login.html';
    return;
  }
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart.`);
}

// Search products
function searchProducts(query) {
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );
  renderProducts(filtered);
}

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}

// Initialize app
function init() {
  renderProducts(products);
  updateCartCount();

  // Search form submit
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value.trim();
    if (query) {
      searchProducts(query);
    } else {
      renderProducts(products);
    }
  });

  // Mobile menu button
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

document.addEventListener('DOMContentLoaded', init);
