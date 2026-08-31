/*====================================
    PHASE 3 — PREMIUM 3D PROJECTS
    Uses the actual .project class
=====================================*/

(() => {

    const projects =
        document.querySelectorAll(
            "#projects .project"
        );


    if (!projects.length) {
        console.warn(
            "Phase 3: No .project elements found."
        );
        return;
    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const isMobile =
        window.matchMedia(
            "(max-width: 768px)"
        ).matches;


    /*====================================
        PROJECT TILT
    =====================================*/

    if (!reducedMotion && !isMobile) {

        projects.forEach(
            (card) => {

                const image =
                    card.querySelector("img");

                const demoBtn =
                    card.querySelector(".btn-demo");


                let cachedRect = null;
                let cachedBtnRect = null;
                let isHovering = false;


                function isOverButtonZone(clientX, clientY) {

                    if (!demoBtn || !cachedBtnRect) return false;

                    // A generous pad around the button's real
                    // box - this is the zone where the card
                    // holds still, so the button is guaranteed
                    // to be exactly where the pointer expects it.
                    const pad = 16;

                    return (
                        clientX >= cachedBtnRect.left - pad &&
                        clientX <= cachedBtnRect.right + pad &&
                        clientY >= cachedBtnRect.top - pad &&
                        clientY <= cachedBtnRect.bottom + pad
                    );

                }


                function applyTilt(clientX, clientY) {

                    const rect = cachedRect;

                    if (!rect || !rect.width || !rect.height) return;


                    if (isOverButtonZone(clientX, clientY)) {

                        // Hold the card flat (no rotation) right
                        // over the demo button - a rotated card's
                        // rendered position and its real hit-testable
                        // position aren't pixel-identical, which is
                        // enough to make a small button unreliable
                        // to click. Keeping this one zone flat
                        // guarantees it's always exactly where it
                        // looks.
                        card.style.transform =
                            "perspective(1800px) translateZ(4px)";

                        return;

                    }


                    let x =
                        (clientX - rect.left)
                        / rect.width
                        - 0.5;


                    let y =
                        (clientY - rect.top)
                        / rect.height
                        - 0.5;


                    x = Math.max(-0.5, Math.min(0.5, x));
                    y = Math.max(-0.5, Math.min(0.5, y));


                    const rotateX = -y * 5;
                    const rotateY = x * 6;


                    card.style.setProperty(
                        "--project-x",
                        `${(x + 0.5) * 100}%`
                    );

                    card.style.setProperty(
                        "--project-y",
                        `${(y + 0.5) * 100}%`
                    );

                    card.style.transform = `
                        perspective(1800px)
                        rotateX(${rotateX.toFixed(2)}deg)
                        rotateY(${rotateY.toFixed(2)}deg)
                        translateZ(10px)
                    `;

                    if (image) {

                        image.style.transform = `
                            translate3d(
                                ${(x * 10).toFixed(2)}px,
                                ${(y * 6).toFixed(2)}px,
                                16px
                            )
                            scale(1.03)
                        `;

                    }

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


                function onDocPointerMove(event) {

                    if (isInsideCachedRect(event.clientX, event.clientY)) {

                        applyTilt(event.clientX, event.clientY);

                    } else {

                        endHover();

                    }

                }


                function startHover(clientX, clientY) {

                    if (isHovering) return;

                    isHovering = true;

                    card.classList.add("is-tilting");

                    // Measure once, while the card is still
                    // flat (untransformed) - this is the
                    // stable reference frame for the whole
                    // hover session. A rotated card's real
                    // rendered shape can drift away from this
                    // rect near its own edges/corners, which
                    // is what previously caused the browser's
                    // native pointerleave to fire mid-hover.
                    cachedRect = card.getBoundingClientRect();

                    cachedBtnRect =
                        demoBtn
                            ? demoBtn.getBoundingClientRect()
                            : null;

                    document.addEventListener(
                        "pointermove",
                        onDocPointerMove,
                        { passive: true }
                    );

                    applyTilt(clientX, clientY);

                }


                function endHover() {

                    if (!isHovering) return;

                    isHovering = false;
                    cachedRect = null;
                    cachedBtnRect = null;

                    card.classList.remove("is-tilting");

                    document.removeEventListener(
                        "pointermove",
                        onDocPointerMove
                    );

                    card.style.transform = "";

                    if (image) {
                        image.style.transform = "";
                    }

                }


                card.addEventListener(
                    "pointerenter",
                    (event) => {

                        startHover(event.clientX, event.clientY);

                    }
                );


                card.addEventListener(
                    "pointerleave",
                    (event) => {

                        // Treat this as a hint, not an order:
                        // only actually end the hover if the
                        // cursor has really, geometrically left
                        // the card's flat bounds. The document-
                        // level listener above is what normally
                        // ends the hover once that happens.
                        if (!isInsideCachedRect(event.clientX, event.clientY)) {
                            endHover();
                        }

                    }
                );

            }
        );

    }


    /*====================================
        PROJECT IMAGE PARALLAX
        This works alongside the existing
        animation.js scroll reveal.
    =====================================*/

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined" &&
        !reducedMotion
    ) {

        gsap.registerPlugin(
            ScrollTrigger
        );


        projects.forEach(
            (card) => {

                const image =
                    card.querySelector("img");


                if (!image) return;


                gsap.fromTo(

                    image,

                    {
                        y: 24,
                        scale: 1.06
                    },

                    {
                        y: -24,
                        scale: 1,

                        ease: "none",

                        scrollTrigger: {

                            trigger: card,

                            start: "top bottom",

                            end: "bottom top",

                            scrub: 1.2,

                            invalidateOnRefresh: true

                        }

                    }

                );

            }
        );

    }


})();