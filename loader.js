/*====================================
        LOADER
====================================*/
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  setTimeout(() => {
    if (loader) {
      loader.classList.add("hide");
    }

    // Refresh GSAP ScrollTrigger AFTER loader disappears
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  }, 2500); // Triggers GSAP recalculation right when loader hides
});