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
