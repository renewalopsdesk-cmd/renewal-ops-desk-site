/* Renewal Ops Desk — Site interactions */

document.addEventListener("DOMContentLoaded", () => {

  /* ─── NAV HIDE / SHOW ON SCROLL ─── */

  const nav = document.querySelector(".nav");

  if (nav) {
    let lastScrollY = window.scrollY;

    window.addEventListener(
      "scroll",
      () => {
        // FIX: não esconder nav enquanto o menu mobile estiver aberto
        if (nav.classList.contains("nav-open")) return;

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

  /* ─── MOBILE MENU ─── */

  const menuToggle = document.querySelector(".mobile-menu-toggle");

  if (nav && menuToggle) {
    let scrollYBeforeLock = 0;

    menuToggle.addEventListener("click", () => {
      const isOpening = !nav.classList.contains("nav-open");

      if (isOpening) {
        scrollYBeforeLock = window.scrollY;
        document.body.style.top = `-${scrollYBeforeLock}px`;
        document.body.classList.add("menu-open");
        nav.classList.add("nav-open");
        nav.classList.remove("nav-hidden");
        menuToggle.setAttribute("aria-label", "Close menu");
      } else {
        closeMenu(scrollYBeforeLock);
      }
    });

    nav.addEventListener("click", (e) => {
      const isLink = e.target.closest(".nav-links a");
      const isCta  = e.target.closest(".mobile-nav-cta");

      if ((isLink || isCta) && nav.classList.contains("nav-open")) {
        closeMenu(scrollYBeforeLock);
      }
    });

    function closeMenu(restoreY) {
      nav.classList.remove("nav-open");
      document.body.classList.remove("menu-open");
      document.body.style.top = "";
      menuToggle.setAttribute("aria-label", "Open menu");

      if (restoreY !== undefined) {
        window.scrollTo({ top: restoreY, behavior: "instant" });
      }
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("nav-open")) {
        closeMenu(scrollYBeforeLock);
      }
    });
  }

  /* ─── PRICING TABS ─── */

  const pricingTabs   = document.querySelectorAll("[data-pricing-tab]");
  const pricingPanels = document.querySelectorAll("[data-pricing-panel]");

  if (pricingTabs.length && pricingPanels.length) {
    pricingTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.pricingTab;

        pricingTabs.forEach((item) => item.classList.remove("active"));
        pricingPanels.forEach((panel) => panel.classList.remove("active"));

        tab.classList.add("active");

        const activePanel = document.querySelector(
          `[data-pricing-panel="${target}"]`
        );

        if (activePanel) activePanel.classList.add("active");

        setTimeout(refreshAllMobileCarousels, 80);
        setTimeout(refreshAllMobileCarousels, 300);
      });
    });
  }

  /* ─── MOBILE CAROUSEL CONTROLS ───
     One system for all horizontal mobile sections:
     Client Findings, Fit, What We Find, Plan Models, Pricing Panels.
  */

  const mobileCarouselMedia = window.matchMedia("(max-width: 768px)");

  const mobileCarouselSelectors = [
    ".proof-grid",
    "#fit .fit-scroll-grid",
    "#findings .report-sample-scroll",
    ".plan-model-grid",
    ".pricing-panel"
  ];

  function isElementVisible(element) {
    if (!element) return false;

    const styles = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    return (
      styles.display !== "none" &&
      styles.visibility !== "hidden" &&
      rect.width > 0 &&
      rect.height > 0
    );
  }

  function getCarouselStep(track) {
    const firstCard = Array.from(track.children).find((child) => {
      return !child.classList.contains("mobile-carousel-arrow");
    });

    if (!firstCard) return track.clientWidth;

    const trackStyles = window.getComputedStyle(track);

    const gap =
      parseFloat(trackStyles.columnGap) ||
      parseFloat(trackStyles.gap) ||
      0;

    return firstCard.getBoundingClientRect().width + gap;
  }

  function setArrowState(track, prevButton, nextButton) {
    const shell = track.closest(".mobile-carousel-shell");
    const usable = mobileCarouselMedia.matches && isElementVisible(track);

    if (!usable) {
      prevButton.hidden = true;
      nextButton.hidden = true;
      if (shell) shell.classList.add("mobile-carousel-inactive");
      return;
    }

    prevButton.hidden = false;
    nextButton.hidden = false;

    if (shell) shell.classList.remove("mobile-carousel-inactive");

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const currentScroll = track.scrollLeft;

    const noScroll = maxScroll <= 2;
    const atStart = currentScroll <= 2;
    const atEnd = currentScroll >= maxScroll - 2;

    prevButton.classList.toggle("is-disabled", noScroll || atStart);
    nextButton.classList.toggle("is-disabled", noScroll || atEnd);

    prevButton.setAttribute(
      "aria-disabled",
      noScroll || atStart ? "true" : "false"
    );

    nextButton.setAttribute(
      "aria-disabled",
      noScroll || atEnd ? "true" : "false"
    );
  }

  function createCarouselArrow(direction) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = `mobile-carousel-arrow mobile-carousel-${direction}`;

    button.setAttribute(
      "aria-label",
      direction === "prev" ? "Previous card" : "Next card"
    );

    button.innerHTML = direction === "prev" ? "‹" : "›";

    return button;
  }

  function setupMobileCarousel(track) {
    if (!track || track.dataset.mobileCarouselReady === "true") return;

    const cards = Array.from(track.children).filter((child) => {
      return !child.classList.contains("mobile-carousel-arrow");
    });

    if (cards.length <= 1) return;

    track.dataset.mobileCarouselReady = "true";

    const shell = document.createElement("div");
    shell.className = "mobile-carousel-shell";

    track.parentNode.insertBefore(shell, track);
    shell.appendChild(track);

    const prevButton = createCarouselArrow("prev");
    const nextButton = createCarouselArrow("next");

    shell.appendChild(prevButton);
    shell.appendChild(nextButton);

    function refresh() {
      window.requestAnimationFrame(() => {
        setArrowState(track, prevButton, nextButton);
      });
    }

    prevButton.addEventListener("click", () => {
      if (prevButton.classList.contains("is-disabled")) return;

      track.scrollBy({
        left: -getCarouselStep(track),
        behavior: "smooth"
      });
    });

    nextButton.addEventListener("click", () => {
      if (nextButton.classList.contains("is-disabled")) return;

      track.scrollBy({
        left: getCarouselStep(track),
        behavior: "smooth"
      });
    });

    track.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);
    mobileCarouselMedia.addEventListener("change", refresh);

    setTimeout(refresh, 80);
    setTimeout(refresh, 350);
  }

  function initMobileCarousels() {
    if (!mobileCarouselMedia.matches) return;

    mobileCarouselSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach(setupMobileCarousel);
    });
  }

  function refreshAllMobileCarousels() {
    document.querySelectorAll(".mobile-carousel-shell").forEach((shell) => {
      const track = shell.querySelector(
        ".proof-grid, .fit-scroll-grid, .report-sample-scroll, .plan-model-grid, .pricing-panel"
      );

      const prevButton = shell.querySelector(".mobile-carousel-prev");
      const nextButton = shell.querySelector(".mobile-carousel-next");

      if (track && prevButton && nextButton) {
        setArrowState(track, prevButton, nextButton);
      }
    });
  }

  initMobileCarousels();

  window.addEventListener("load", () => {
    initMobileCarousels();
    refreshAllMobileCarousels();
  });

  mobileCarouselMedia.addEventListener("change", () => {
    initMobileCarousels();
    refreshAllMobileCarousels();
  });

  /* ─── SAMPLE REPORT MODAL ─── */

  const sampleModal    = document.getElementById("sampleModal");
  const modalClose     = document.querySelector(".sample-modal-close");
  const modalBackdrop  = document.querySelector(".sample-modal-backdrop");

  function openSampleModal(event) {
    if (event) event.preventDefault();
    if (!sampleModal) return;

    sampleModal.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeSampleModal() {
    if (!sampleModal) return;

    sampleModal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".sample-modal-trigger");
    if (trigger) openSampleModal(event);
  });

  if (modalClose) modalClose.addEventListener("click", closeSampleModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeSampleModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSampleModal();
  });

  /* ─── SAMPLE REPORT FORM → MAKE ─── */

  const MAKE_WEBHOOK_URL =
    "https://hook.eu1.make.com/gzkfzaliat85z58mf4bkmwha5xn5yep9";

  function connectSampleForm(formId, emailId, companyId) {
    const form    = document.getElementById(formId);
    const email   = document.getElementById(emailId);
    const company = document.getElementById(companyId);

    if (!form || !email || !company) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      try {
        await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.value,
            company: company.value,
            source: formId,
            page: window.location.href,
          }),
        });

        submitButton.textContent = "Sample report sent";
        form.reset();

        if (formId === "sampleLeadFormModal") {
          setTimeout(() => {
            closeSampleModal();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }, 700);
        } else {
          setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }, 1200);
        }
      } catch (error) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        alert("Something went wrong. Please try again.");
      }
    });
  }

  connectSampleForm(
    "sampleLeadFormInline",
    "sampleInlineEmail",
    "sampleInlineCompany"
  );

  connectSampleForm(
    "sampleLeadFormModal",
    "sampleModalEmail",
    "sampleModalCompany"
  );

});
