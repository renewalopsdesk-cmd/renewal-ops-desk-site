/* Renewal Ops Desk — Site interactions */

document.addEventListener("DOMContentLoaded", () => {
  /* NAV HIDE / SHOW ON SCROLL */
  const nav = document.querySelector(".nav");

  if (nav) {
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
  }

  /* MOBILE MENU */
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav-cta");

  if (nav && menuToggle) {
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
  }

  /* REPORT CAROUSEL */
  const carousel = document.getElementById("reportCarousel");
  const prevBtn = document.querySelector(".report-prev");
  const nextBtn = document.querySelector(".report-next");

  if (carousel && prevBtn && nextBtn) {
    function getScrollAmount() {
      const firstCard = carousel.querySelector(".finding-card");
      if (!firstCard) return carousel.clientWidth;

      const gap =
        parseFloat(window.getComputedStyle(carousel).columnGap) || 0;

      return firstCard.offsetWidth + gap;
    }

    function updateArrows() {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;

      prevBtn.style.opacity = carousel.scrollLeft <= 1 ? "0.3" : "1";
      prevBtn.style.pointerEvents =
        carousel.scrollLeft <= 1 ? "none" : "auto";

      nextBtn.style.opacity =
        carousel.scrollLeft >= maxScroll - 1 ? "0.3" : "1";
      nextBtn.style.pointerEvents =
        carousel.scrollLeft >= maxScroll - 1 ? "none" : "auto";
    }

    prevBtn.addEventListener("click", () => {
      carousel.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    });

    nextBtn.addEventListener("click", () => {
      carousel.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    });

    carousel.addEventListener("scroll", updateArrows, { passive: true });
    updateArrows();
  }

  /* PRICING TABS */
  const tabs = document.querySelectorAll("[data-pricing-tab]");
  const panels = document.querySelectorAll("[data-pricing-panel]");

  if (tabs.length && panels.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.pricingTab;

        tabs.forEach((item) => item.classList.remove("active"));
        panels.forEach((panel) => panel.classList.remove("active"));

        tab.classList.add("active");

        const activePanel = document.querySelector(
          `[data-pricing-panel="${target}"]`
        );

        if (activePanel) activePanel.classList.add("active");
      });
    });
  }

  /* SAMPLE REPORT MODAL */
  const sampleModal = document.getElementById("sampleModal");
  const modalTriggers = document.querySelectorAll(".sample-modal-trigger");
  const modalClose = document.querySelector(".sample-modal-close");
  const modalBackdrop = document.querySelector(".sample-modal-backdrop");

  if (sampleModal && modalTriggers.length && modalClose && modalBackdrop) {
    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        sampleModal.classList.add("active");
        document.body.classList.add("modal-open");
      });
    });

    function closeSampleModal() {
      sampleModal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }

    modalClose.addEventListener("click", closeSampleModal);
    modalBackdrop.addEventListener("click", closeSampleModal);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && sampleModal.classList.contains("active")) {
        closeSampleModal();
      }
    });
  }
});
