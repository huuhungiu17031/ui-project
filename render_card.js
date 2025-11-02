const products = [
  {
    name: "OCEAN EYES",
    price: "399,000đ",
    mainImg: "./note_1.jpg",
    hoverImg: "./note_2.jpg",
  },
  {
    name: "SUNRISE",
    price: "399,000đ",
    mainImg: "./note_4.jpg",
    hoverImg: "./note_3.jpg",
  },
  {
    name: "TEA",
    price: "399,000đ",
    mainImg: "./note_5.jpg",
    hoverImg: "./note_6.jpg",
  },
  {
    name: "Postcard “Finding myself again”",
    price: "35,000đ",
    mainImg: "./note_7.png",
    hoverImg: "./note_8.png",
  },
  {
    name: "Combo Ocean Eyes + Rose",
    price: "726,000₫",
    mainImg: "./note_9.jpg",
    hoverImg: "./note_10.png",
  },
];

const container = document.getElementById("product-list");

products.forEach((p) => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <div class="image-container" data-main="${p.mainImg}" data-hover="${p.hoverImg}">
      <img src="${p.mainImg}" alt="${p.name}" class="product-img img-fluid" />
    </div>
    <h6 class="mt-2">${p.name}</h6>
    <p class="text-muted">${p.price}</p>
  `;
  container.appendChild(card);
});

document.querySelectorAll(".product-card").forEach((card) => {
  const img = card.querySelector(".product-img");
  const container = card.querySelector(".image-container");
  const mainSrc = container.dataset.main;
  const hoverSrc = container.dataset.hover;

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
});
