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
