/*====================================
    PHASE 5 — TESTIMONIALS
=====================================*/

(() => {

    const cards = document.querySelectorAll(".testimonial-card");

    if (!cards.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;


    /*====================================
        ENTRANCE (staggered)
    =====================================*/

    if (!reducedMotion && window.gsap && window.ScrollTrigger) {

        gsap.utils.toArray(".testimonial-card").forEach((card, i) => {

            gsap.fromTo(
                card,
                { opacity: 0, y: 50, rotateX: 6, scale: 0.94 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: (i % 3) * 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        toggleActions: "play none none none",
                        once: true
                    },
                    clearProps: "transform"
                }
            );

        });

    }


    /*====================================
        POINTER TILT (desktop only)
    =====================================*/

    if (!isMobile && !reducedMotion) {

        cards.forEach((card) => {

            let cachedRect = null;
            let isHovering = false;

            function applyTilt(clientX, clientY) {

                const rect = cachedRect;
                if (!rect || !rect.width || !rect.height) return;

                let x = (clientX - rect.left) / rect.width - 0.5;
                let y = (clientY - rect.top) / rect.height - 0.5;

                x = Math.max(-0.5, Math.min(0.5, x));
                y = Math.max(-0.5, Math.min(0.5, y));

                card.style.transform = `
                    perspective(1000px)
                    rotateX(${(-y * 6).toFixed(2)}deg)
                    rotateY(${(x * 8).toFixed(2)}deg)
                    translateY(-8px)
                `;

            }

            function isInsideCachedRect(clientX, clientY) {

                if (!cachedRect) return false;

                return (
                    clientX >= cachedRect.left &&
                    clientX <= cachedRect.right &&
                    clientY >= cachedRect.top &&
                    clientY <= cachedRect.bottom
                );

            }

            function onDocPointerMove(e) {

                if (isInsideCachedRect(e.clientX, e.clientY)) {
                    applyTilt(e.clientX, e.clientY);
                } else {
                    endHover();
                }

            }

            function startHover(clientX, clientY) {

                if (isHovering) return;
                isHovering = true;

                card.classList.add("is-tilting");

                // Measure once, while the card is still flat -
                // a rotated card's real rendered shape can drift
                // from this rect near its edges/corners, which is
                // what previously let the browser's native
                // pointerleave fire mid-hover.
                cachedRect = card.getBoundingClientRect();

                document.addEventListener("pointermove", onDocPointerMove, { passive: true });

                applyTilt(clientX, clientY);

            }

            function endHover() {

                if (!isHovering) return;
                isHovering = false;
                cachedRect = null;

                card.classList.remove("is-tilting");

                document.removeEventListener("pointermove", onDocPointerMove);

                card.style.transform = "";

            }

            card.addEventListener("pointerenter", (e) => {

                startHover(e.clientX, e.clientY);

            });

            card.addEventListener("pointerleave", (e) => {

                // Hint, not an order - only really end the hover
                // if the cursor has geometrically left the card's
                // flat bounds.
                if (!isInsideCachedRect(e.clientX, e.clientY)) {
                    endHover();
                }

            });

        });

    }

})();
