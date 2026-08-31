/*====================================
    PHASE 1 — PREMIUM UI 3D
=====================================*/

(() => {

    const hero =
        document.querySelector(".hero");

    if (!hero) return;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) return;


    /*====================================
        PROFILE TILT
    =====================================*/

    const profile =
        hero.querySelector(".profile-circle");


    if (profile) {

        profile.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    profile.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left)
                    / rect.width
                    - 0.5;

                const y =
                    (event.clientY - rect.top)
                    / rect.height
                    - 0.5;


                profile.style.transform = `
                    perspective(900px)
                    rotateX(${(-y * 15).toFixed(2)}deg)
                    rotateY(${(x * 15).toFixed(2)}deg)
                    translateZ(12px)
                    scale3d(1.025, 1.025, 1.025)
                `;

            },
            { passive: true }
        );


        profile.addEventListener(
            "pointerleave",
            () => {

                profile.style.transform = "";

            }
        );

    }


    /*====================================
        MAGNETIC BUTTONS
    =====================================*/

    const buttons =
        hero.querySelectorAll(
            ".btn, .btn-outline"
        );


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "pointermove",
                (event) => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        (event.clientX - rect.left)
                        / rect.width
                        - 0.5;

                    const y =
                        (event.clientY - rect.top)
                        / rect.height
                        - 0.5;


                    button.style.transform = `
                        perspective(700px)
                        rotateX(${(-y * 7).toFixed(2)}deg)
                        rotateY(${(x * 9).toFixed(2)}deg)
                        translate3d(${(x * 8).toFixed(2)}px,
                                    ${(y * 5).toFixed(2)}px,
                                    10px)
                    `;

                },
                { passive: true }
            );


            button.addEventListener(
                "pointerleave",
                () => {

                    button.style.transform = "";

                }
            );

        }
    );

    /*====================================
        HERO TEXT ENTRANCE
        Staggered fade+slide, timed to
        play right as the loader (2.5s)
        finishes.
    =====================================*/

    if (window.gsap) {

        const heroEls = hero.querySelectorAll(
            ".hero-left h4, .hero-left h1, .hero-left h3, .hero-left p, .hero-left .buttons"
        );

        if (heroEls.length) {

            gsap.set(heroEls, { opacity: 0, y: 26 });

            gsap.to(heroEls, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                delay: 2.5,
                ease: "power3.out",
                clearProps: "transform"
            });

        }

    }

})();