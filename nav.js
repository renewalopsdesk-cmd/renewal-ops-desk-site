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

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Renewal Ops Desk | Contract Risk Intelligence</title>
  <meta name="description" content="Renewal Ops Desk helps B2B teams find renewal exposure, pricing escalations, notice windows, and money leaks hidden inside active vendor agreements." />

  <link rel="icon" href="/logo-mark.png" type="image/png" />
  <link rel="apple-touch-icon" href="/logo-mark.png" />
  <link rel="stylesheet" href="/styles.css" />
</head>

<body>
 <nav class="nav">
  <a href="/" class="brand" aria-label="Renewal Ops Desk home">
    <img class="brand-mark" src="/logo-mark.png" alt="Renewal Ops Desk logo" />
    <span>Renewal Ops Desk</span>
  </a>

  <button class="mobile-menu-toggle" type="button" aria-label="Open menu">
    <span></span>
    <span></span>
  </button>

  <div class="nav-links">
    <a href="#about">About</a>
    <a href="#results">Results</a>
    <a href="#findings">Findings</a>
    <a href="#fit">Fit</a>
    <a href="#pricing">Pricing</a>
    <a href="#faq">FAQ</a>
    <a class="mobile-nav-cta" href="#sample-report">Get Sample Report</a>
  </div>

  <a class="btn btn-primary nav-desktop-cta" href="#sample-report">Get Sample Report</a>
</nav>
  <main>

   document.addEventListener('DOMContentLoaded', function () {

  const MAKE_WEBHOOK = 'https://hook.eu1.make.com/SEU_WEBHOOK_DO_MAKE_AQUI';

  const modal     = document.getElementById('sampleModal');
  const closeBtn  = document.getElementById('sampleModalClose');
  const overlay   = document.querySelector('.sample-modal-overlay');
  const form      = document.getElementById('sampleLeadForm');
  const success   = document.getElementById('sampleSuccess');
  const triggers  = document.querySelectorAll('.sample-modal-trigger');

  // Abre o modal
  triggers.forEach(btn => {
    btn.addEventListener('click', () => modal.classList.add('active'));
  });

  // Fecha o modal
  function closeModal() {
    modal.classList.remove('active');
  }
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Fecha com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Submete para o Make
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const payload = {
      email:   document.getElementById('sampleEmail').value,
      company: document.getElementById('sampleCompany').value
    };

    try {
      await fetch(MAKE_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      form.style.display = 'none';
      success.classList.add('active');
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Get sample report →';
      alert('Something went wrong. Please try again.');
    }
  });

});



