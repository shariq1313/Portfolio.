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

  // TECH STACK / SKILLS
  gsap.utils.toArray(".skill").forEach((card) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true
        },
        clearProps: "transform"
      }
    );
  });

  // SERVICES
  gsap.utils.toArray(".service").forEach((card) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true
        },
        clearProps: "transform"
      }
    );
  });

  // STATS
  gsap.utils.toArray(".stat-card").forEach((card) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );
  });

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