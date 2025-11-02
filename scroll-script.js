window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".header-menu-mobile");
  const menuIcon = mobileMenuToggle?.querySelector("i");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      if (menuIcon) {
        if (mobileMenu.classList.contains("active")) {
          menuIcon.classList.remove("bi-list");
          menuIcon.classList.add("bi-x");
        } else {
          menuIcon.classList.remove("bi-x");
          menuIcon.classList.add("bi-list");
        }
      }
    });

    // Close menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        if (menuIcon) {
          menuIcon.classList.remove("bi-x");
          menuIcon.classList.add("bi-list");
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !mobileMenu.contains(event.target) &&
        !mobileMenuToggle.contains(event.target)
      ) {
        mobileMenu.classList.remove("active");
        if (menuIcon) {
          menuIcon.classList.remove("bi-x");
          menuIcon.classList.add("bi-list");
        }
      }
    });
  }
});
