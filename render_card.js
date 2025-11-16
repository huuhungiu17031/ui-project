const products = [
  {
    id: 1,
    name: "OCEAN EYES",
    price: 399000,
    priceDisplay: "399,000đ",
    mainImg: "./note_1.jpg",
    hoverImg: "./note_2.jpg",
    isTopSelling: true,
  },
  {
    id: 2,
    name: "SUNRISE",
    price: 399000,
    priceDisplay: "399,000đ",
    mainImg: "./note_4.jpg",
    hoverImg: "./note_3.jpg",
    isTopSelling: true,
  },
  {
    id: 3,
    name: "TEA",
    price: 399000,
    priceDisplay: "399,000đ",
    mainImg: "./note_5.jpg",
    hoverImg: "./note_6.jpg",
    isTopSelling: false,
  },
  {
    id: 4,
    name: "Postcard Finding myself again",
    price: 35000,
    priceDisplay: "35,000đ",
    mainImg: "./note_7.png",
    hoverImg: "./note_8.png",
    isTopSelling: true,
  },
  {
    id: 5,
    name: "Combo Ocean Eyes + Rose",
    price: 726000,
    priceDisplay: "726,000₫",
    mainImg: "./note_9.jpg",
    hoverImg: "./note_10.png",
    isTopSelling: false,
  },
];

function createProductCard(product, containerElement) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <div class="image-container" data-main="${product.mainImg}" data-hover="${product.hoverImg}">
      <img src="${product.mainImg}" alt="${product.name}" class="product-img img-fluid" />
      <div class="product-overlay">
        <button class="btn-add-to-cart" data-product-id="${product.id}">
          <i class="bi bi-cart-plus"></i> Thêm vào giỏ
        </button>
      </div>
    </div>
    <h6 class="mt-2">${product.name}</h6>
    <p class="product-price">${product.priceDisplay}</p>
  `;
  containerElement.appendChild(card);

  // Add hover effect
  const img = card.querySelector(".product-img");
  const imageContainer = card.querySelector(".image-container");
  const mainSrc = imageContainer.dataset.main;
  const hoverSrc = imageContainer.dataset.hover;

  card.addEventListener("mouseenter", () => {
    img.classList.add("fade");
    setTimeout(() => {
      img.src = hoverSrc;
      img.classList.remove("fade");
    }, 100);
  });

  card.addEventListener("mouseleave", () => {
    img.classList.add("fade");
    setTimeout(() => {
      img.src = mainSrc;
      img.classList.remove("fade");
    }, 100);
  });

  // Add to cart button
  const addToCartBtn = card.querySelector(".btn-add-to-cart");
  addToCartBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    addToCart(product);
  });
}

// Render all products
const container = document.getElementById("product-list");
if (container) {
  products.forEach((p) => {
    createProductCard(p, container);
  });
}

// Render top selling products
const topSellingContainer = document.getElementById("top-selling-list");
if (topSellingContainer) {
  const topSellingProducts = products.filter((p) => p.isTopSelling);
  topSellingProducts.forEach((p) => {
    createProductCard(p, topSellingContainer);
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  // Show notification
  showNotification("Đã thêm sản phẩm vào giỏ hàng!");
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}
