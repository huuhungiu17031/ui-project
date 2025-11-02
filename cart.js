// Update cart count in header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCountElements = document.querySelectorAll(
    ".cart-count, #cart-count-header"
  );
  cartCountElements.forEach((el) => {
    if (el) {
      el.textContent = totalItems;
      if (totalItems > 0) {
        el.style.display = "inline-block";
      } else {
        el.style.display = "none";
      }
    }
  });
}

// Format price
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

// Initialize cart page
function initCartPage() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const cartEmpty = document.getElementById("cart-empty");
  const cartContent = document.getElementById("cart-content");

  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.style.display = "block";
    if (cartContent) cartContent.style.display = "none";
    return;
  }

  if (cartEmpty) cartEmpty.style.display = "none";
  if (cartContent) cartContent.style.display = "block";
  if (cartItemsContainer) cartItemsContainer.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.mainImg}" alt="${item.name}" />
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p class="cart-item-price">${formatPrice(item.price)}</p>
        <div class="cart-item-quantity">
          <button class="btn-quantity" onclick="updateQuantity(${item.id}, -1)">
            <i class="bi bi-dash"></i>
          </button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="btn-quantity" onclick="updateQuantity(${item.id}, 1)">
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>
      <div class="cart-item-total">
        <p class="item-total-price">${formatPrice(itemTotal)}</p>
        <button class="btn-remove" onclick="removeFromCart(${item.id})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  updateCartSummary(subtotal);
}

// Update cart summary
function updateCartSummary(subtotal) {
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  const shippingEl = document.getElementById("shipping");

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);

  const shippingCost = subtotal >= 1000000 ? 0 : 50000;
  if (shippingEl) {
    shippingEl.textContent =
      shippingCost === 0 ? "Miễn phí" : formatPrice(shippingCost);
  }

  const total = subtotal + shippingCost;
  if (totalEl) totalEl.textContent = formatPrice(total);
}

// Update quantity
function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    initCartPage();
  }
}

// Remove from cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  initCartPage();
}

// Checkout
function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }
  alert("Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
  localStorage.removeItem("cart");
  updateCartCount();
  initCartPage();
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // Initialize cart page if on cart page
  if (document.getElementById("cart-items")) {
    initCartPage();

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", checkout);
    }
  }
});

// Export functions for use in HTML onclick
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.checkout = checkout;
