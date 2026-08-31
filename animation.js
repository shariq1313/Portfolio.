/*=========================================
    GSAP INITIAL CONFIGURATION
=========================================*/
gsap.registerPlugin(ScrollTrigger);

// Prevent browser from restoring scroll position mid-page on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

ScrollTrigger.config({ ignoreMobileResize: true });

function setupScrollAnimations() {
  
  // PROJECTS
  gsap.utils.toArray(".project").forEach((card) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,         // Triggers individually for each card
          start: "top 90%",      // Animates as soon as top of card reaches 90% screen height
          toggleActions: "play none none none",
          once: true             // Ensures it stays visible once triggered
        },
        clearProps: "transform"  // Prevents CSS conflicts after animation finishes
      }
    );
  });

  // Note: .skill, .service and .stat-card entrances live in
  // skills-3d.js / scroll-3d.js instead of here. Those give each
  // one a fuller 3D reveal (rotation/depth, not just fade+slide) -
  // having both this file and those running on the same elements
  // meant two tweens fighting over the same opacity/y properties.

  // Force ScrollTrigger to recalculate exact pixel positions now
  ScrollTrigger.refresh();
}

/*=========================================
    TRIGGER AFTER LOADER & IMAGES FINISH
=========================================*/
window.addEventListener("load", () => {
  // Wait for loader overlay to fade out (from loader.js) before starting triggers
  setTimeout(() => {
    setupScrollAnimations();
  }, 2600);
});