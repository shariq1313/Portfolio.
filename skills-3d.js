/*====================================
    PHASE 4 — 3D SKILLS + SERVICES
=====================================*/

(() => {

   const skills =
    document.querySelectorAll(
        "#skills .skill"
    );

const services =
    document.querySelectorAll(
        "#services .service"
    );
    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const isMobile =
        window.matchMedia(
            "(max-width: 768px)"
        ).matches;


    if (reducedMotion) return;


    /*====================================
        SKILLS — FLOATING DEPTH
    =====================================*/

    skills.forEach((skill, index) => {

        const depth =
            isMobile
                ? 0
                : 8 + (index % 4) * 5;

        const direction =
            index % 2 === 0
                ? 1
                : -1;


        skill.style.transformStyle =
            "preserve-3d";

        skill.style.willChange =
            "transform";


        let currentX = 0;
        let currentY = 0;


        function float() {

            let phase = index * 0.7;

            function tick() {

                phase += 0.012;

                if (!skill.matches(":hover")) {

                    skill.style.transform = `
                        translate3d(
                            0,
                            ${(Math.sin(phase) * 3 * direction).toFixed(2)}px,
                            ${depth}px
                        )
                    `;

                }

                requestAnimationFrame(tick);

            }

            tick();

        }


        /*
            Entrance now lives here instead of animation.js -
            that way the fade/slide-in and the ongoing float
            share one owner and can be sequenced: float only
            starts once the entrance tween has actually finished,
            instead of both fighting over transform from load.
        */

        if (
            typeof gsap !== "undefined" &&
            typeof ScrollTrigger !== "undefined"
        ) {

            gsap.fromTo(
                skill,

                { opacity: 0, y: 30 },

                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: (index % 4) * 0.06,
                    ease: "power2.out",

                    scrollTrigger: {
                        trigger: skill,
                        start: "top 90%",
                        toggleActions: "play none none none",
                        once: true
                    },

                    clearProps: "transform",

                    onComplete: () => {

                        if (!isMobile) float();

                    }
                }
            );

        } else if (!isMobile) {

            float();

        }


        let cachedSkillRect = null;
        let isSkillHovering = false;


        function applySkillTilt(clientX, clientY) {

            const rect = cachedSkillRect;

            if (!rect || !rect.width || !rect.height) return;


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


            currentX = x;
            currentY = y;


            skill.style.transform = `
                perspective(1000px)
                rotateX(${(-y * 7).toFixed(2)}deg)
                rotateY(${(x * 9).toFixed(2)}deg)
                translateZ(${depth + 15}px)
            `;

        }


        function isInsideCachedSkillRect(clientX, clientY) {

            if (!cachedSkillRect) return false;

            return (
                clientX >= cachedSkillRect.left &&
                clientX <= cachedSkillRect.right &&
                clientY >= cachedSkillRect.top &&
                clientY <= cachedSkillRect.bottom
            );

        }


        function onSkillDocPointerMove(event) {

            if (isInsideCachedSkillRect(event.clientX, event.clientY)) {

                applySkillTilt(event.clientX, event.clientY);

            } else {

                endSkillHover();

            }

        }


        function startSkillHover(clientX, clientY) {

            if (isMobile || isSkillHovering) return;

            isSkillHovering = true;
            skill.classList.add("is-tilting");

            // Measure once, while the card is still flat -
            // a rotated element's real rendered shape can
            // drift from this rect near its edges/corners,
            // which is what previously let the browser's
            // native pointerleave fire mid-hover.
            cachedSkillRect = skill.getBoundingClientRect();

            document.addEventListener(
                "pointermove",
                onSkillDocPointerMove,
                { passive: true }
            );

            applySkillTilt(clientX, clientY);

        }


        function endSkillHover() {

            if (!isSkillHovering) return;

            isSkillHovering = false;
            cachedSkillRect = null;
            skill.classList.remove("is-tilting");

            document.removeEventListener(
                "pointermove",
                onSkillDocPointerMove
            );

            skill.style.transform = `
                translateZ(${depth}px)
                rotateY(0deg)
                rotateX(0deg)
            `;

        }


        skill.addEventListener(
            "pointerenter",
            (event) => {

                startSkillHover(event.clientX, event.clientY);

            }
        );


        skill.addEventListener(
            "pointerleave",
            (event) => {

                // Hint, not an order - only really end the
                // hover if the cursor has geometrically left
                // the skill card's flat bounds.
                if (!isInsideCachedSkillRect(event.clientX, event.clientY)) {
                    endSkillHover();
                }

            }
        );

    });


    /*====================================
        SERVICES — SCROLL DEPTH
    =====================================*/

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {

        gsap.registerPlugin(
            ScrollTrigger
        );


        services.forEach(
            (service, index) => {

                gsap.fromTo(
                    service,

                    {
                        opacity: 0,

                        y: 110,

                        z: -180,

                        rotateX: 12,

                        rotateY:
                            index % 2 === 0
                                ? -10
                                : 10,

                        scale: 0.84
                    },

                    {
                        opacity: 1,

                        y: 0,

                        z: 0,

                        rotateX: 0,

                        rotateY: 0,

                        scale: 1,

                        duration: 1.1,

                        ease: "power4.out",

                        scrollTrigger: {

                            trigger: service,

                            start: "top 90%",

                            end: "top 58%",

                            scrub: 0.8

                        }

                    }
                );


                /* Gentle floating while visible */

                gsap.to(
                    service,

                    {
                        y: index % 2 === 0
                            ? -10
                            : 10,

                        ease: "none",

                        scrollTrigger: {

                            trigger: service,

                            start: "top bottom",

                            end: "bottom top",

                            scrub: 1.5

                        }

                    }
                );

            }
        );

    }

})();