/* Renewal Ops Desk — Navigation interactions
   This file can be expanded later for other shared site interactions.
*/

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");

  if (!nav) return;

  let lastScrollY = window.scrollY;

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        nav.classList.add("nav-hidden");
      } else {
        nav.classList.remove("nav-hidden");
      }

      lastScrollY = currentScrollY;
    },
    { passive: true }
  );
});

/* Renewal Ops Desk — Navigation interactions */

// ─── Navbar hide/show no scroll ───────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 120) {
      nav.classList.add("nav-hidden");
    } else {
      nav.classList.remove("nav-hidden");
    }
    lastScrollY = currentScrollY;
  }, { passive: true });
});

// ─── Report Carousel Arrows ───────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("reportCarousel");
  const prevBtn  = document.querySelector(".report-prev");
  const nextBtn  = document.querySelector(".report-next");

  if (!carousel || !prevBtn || !nextBtn) return;

  function getScrollAmount() {
    const firstCard = carousel.querySelector(".finding-card");
    if (!firstCard) return carousel.clientWidth;
    const gap = parseFloat(window.getComputedStyle(carousel).columnGap) || 0;
    return firstCard.offsetWidth + gap;
  }

  function updateArrows() {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    prevBtn.style.opacity = carousel.scrollLeft <= 1 ? "0.3" : "1";
    prevBtn.style.pointerEvents = carousel.scrollLeft <= 1 ? "none" : "auto";
    nextBtn.style.opacity = carousel.scrollLeft >= maxScroll - 1 ? "0.3" : "1";
    nextBtn.style.pointerEvents = carousel.scrollLeft >= maxScroll - 1 ? "none" : "auto";
  }

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });

  carousel.addEventListener("scroll", updateArrows, { passive: true });

  updateArrows();
});

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (!nav || !menuToggle) return;

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    document.body.classList.toggle("menu-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-open");
      document.body.classList.remove("menu-open");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll("[data-pricing-tab]");
  const panels = document.querySelectorAll("[data-pricing-panel]");

  if (!tabs.length || !panels.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const target = tab.dataset.pricingTab;

      tabs.forEach(function (item) {
        item.classList.remove("active");
      });

      panels.forEach(function (panel) {
        panel.classList.remove("active");
      });

      tab.classList.add("active");

      const activePanel = document.querySelector(
        `[data-pricing-panel="${target}"]`
      );

      if (activePanel) {
        activePanel.classList.add("active");
      }
    });
  });
});
