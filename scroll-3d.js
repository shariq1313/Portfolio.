/*====================================
    PHASE 2 — 3D SCROLL SYSTEM
    Built for the existing portfolio
=====================================*/

(() => {

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reducedMotion) return;


    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        console.warn(
            "Phase 2: GSAP or ScrollTrigger is unavailable."
        );
        return;
    }


    gsap.registerPlugin(ScrollTrigger);


    /*====================================
        ABOUT
        Uses the actual .glass-card
    =====================================*/

    const aboutCard =
        document.querySelector(
            "#about .glass-card"
        );


    if (aboutCard) {

        gsap.fromTo(
            aboutCard,

            {
                opacity: 0,
                y: 90,
                z: -100,
                rotateX: 7,
                scale: 0.94
            },

            {
                opacity: 1,
                y: 0,
                z: 0,
                rotateX: 0,
                scale: 1,

                duration: 1.1,

                ease: "power3.out",

                scrollTrigger: {

                    trigger: "#about",

                    start: "top 78%",

                    end: "top 48%",

                    scrub: 0.7,

                    invalidateOnRefresh: true

                }
            }
        );

    }


    /*====================================
        STATS
        Actual .stat-card elements
    =====================================*/

    const statCards =
        gsap.utils.toArray(
            "#stats .stat-card"
        );


    statCards.forEach(
        (card, index) => {

            gsap.fromTo(
                card,

                {
                    opacity: 0,
                    y: 70,
                    z: -100,
                    rotateY:
                        index % 2 === 0
                            ? -7
                            : 7,
                    scale: 0.92
                },

                {
                    opacity: 1,
                    y: 0,
                    z: 0,
                    rotateY: 0,
                    scale: 1,

                    duration: 0.9,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: card,

                        start: "top 88%",

                        end: "top 62%",

                        scrub: 0.6,

                        invalidateOnRefresh: true

                    }

                }
            );

        }
    );


    /*====================================
        SECTION TITLES
    =====================================*/

    const sectionTitles =
        gsap.utils.toArray(
            "main .section-title h2"
        );


    sectionTitles.forEach(
        (title) => {

            gsap.fromTo(
                title,

                {
                    opacity: 0,
                    x: -55,
                    z: -70,
                    rotateY: -8
                },

                {
                    opacity: 1,
                    x: 0,
                    z: 0,
                    rotateY: 0,

                    duration: 0.8,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: title,

                        start: "top 88%",

                        end: "top 68%",

                        scrub: 0.6,

                        invalidateOnRefresh: true

                    }

                }
            );

        }
    );


    /*====================================
        TIMELINE
        Actual .timeline-item elements
    =====================================*/

    const timelineItems =
        gsap.utils.toArray(
            ".timeline-item"
        );


    timelineItems.forEach(
        (item, index) => {

            gsap.fromTo(
                item,

                {
                    opacity: 0,

                    x:
                        index % 2 === 0
                            ? -80
                            : 80,

                    z: -90,

                    rotateY:
                        index % 2 === 0
                            ? -8
                            : 8
                },

                {
                    opacity: 1,

                    x: 0,

                    z: 0,

                    rotateY: 0,

                    duration: 0.9,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: item,

                        start: "top 88%",

                        end: "top 63%",

                        scrub: 0.7,

                        invalidateOnRefresh: true

                    }

                }
            );

        }
    );


    /*====================================
        CONTACT BOX
    =====================================*/

    const contactBox =
        document.querySelector(
            "#contact .contact-box"
        );


    if (contactBox) {

        gsap.fromTo(
            contactBox,

            {
                opacity: 0,

                y: 100,

                z: -140,

                rotateX: 7,

                scale: 0.94
            },

            {
                opacity: 1,

                y: 0,

                z: 0,

                rotateX: 0,

                scale: 1,

                duration: 1.1,

                ease: "power3.out",

                scrollTrigger: {

                    trigger: "#contact",

                    start: "top 82%",

                    end: "top 53%",

                    scrub: 0.7,

                    invalidateOnRefresh: true

                }

            }
        );

    }


    /*====================================
        SECTION PARALLAX
        Doesn't fight existing card
        entrance animations.
    =====================================*/

    const sections =
        gsap.utils.toArray(
            "main > .section"
        );


    sections.forEach(
        (section, index) => {

            gsap.to(
                section,

                {
                    backgroundPosition:
                        index % 2 === 0
                            ? "50% 8%"
                            : "50% -8%",

                    ease: "none",

                    scrollTrigger: {

                        trigger: section,

                        start: "top bottom",

                        end: "bottom top",

                        scrub: 1.5,

                        invalidateOnRefresh: true

                    }

                }
            );

        }
    );


    /*====================================
        REFRESH AFTER EVERYTHING LOADS
    =====================================*/

    window.addEventListener(
        "load",
        () => {

            setTimeout(
                () => {

                    ScrollTrigger.refresh();

                },
                2700
            );

        }
    );

})();