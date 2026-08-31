import * as THREE from "./three.module.min.js";

/*====================================
    PHASE 1 — PREMIUM 3D HERO
=====================================*/

(() => {

    const hero = document.querySelector(".hero");
    const mount = document.querySelector(".hero-right");

    if (!hero || !mount) return;

    const reducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile =
        window.matchMedia("(max-width: 768px)").matches;


    /*====================================
        CANVAS
    =====================================*/

    const canvas = document.createElement("canvas");

    canvas.className = "hero-3d-canvas";
    canvas.setAttribute("aria-hidden", "true");

    mount.appendChild(canvas);


    /*====================================
        RENDERER
    =====================================*/

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 1.75)
    );

    renderer.setClearColor(0x000000, 0);


    /*====================================
        SCENE
    =====================================*/

    const scene = new THREE.Scene();


    /*====================================
        CAMERA
    =====================================*/

    const camera = new THREE.PerspectiveCamera(
        32,
        1,
        0.1,
        100
    );

    camera.position.set(0, 0.2, 8.4);


    /*====================================
        MAIN ROOT
    =====================================*/

    const root = new THREE.Group();

    scene.add(root);


    /*====================================
        HERO LIGHTING
    =====================================*/

    const ambient =
        new THREE.HemisphereLight(
            0xbfdcff,
            0x03050b,
            1.5
        );

    scene.add(ambient);


    const purpleLight =
        new THREE.PointLight(
            0x7b61ff,
            48,
            18,
            2
        );

    purpleLight.position.set(
        3.5,
        2.4,
        4.5
    );

    scene.add(purpleLight);


    const cyanLight =
        new THREE.PointLight(
            0x00d4ff,
            34,
            17,
            2
        );

    cyanLight.position.set(
        -3.8,
        -1.5,
        3.8
    );

    scene.add(cyanLight);


    const rimLight =
        new THREE.PointLight(
            0xa47cff,
            20,
            13,
            2
        );

    rimLight.position.set(
        0,
        3.5,
        -2
    );

    scene.add(rimLight);


    /*====================================
        PLATFORM
    =====================================*/

    const platformGeometry =
        new THREE.CylinderGeometry(
            2.6,
            3.25,
            0.14,
            64
        );

    const platformMaterial =
        new THREE.MeshPhysicalMaterial({
            color: 0x0c1327,
            metalness: 0.72,
            roughness: 0.22,
            transparent: true,
            opacity: 0.8,
            emissive: 0x11183c,
            emissiveIntensity: 0.7
        });

    const platform =
        new THREE.Mesh(
            platformGeometry,
            platformMaterial
        );

    platform.position.y = -1.7;

    root.add(platform);


    /*====================================
        PLATFORM GLOW
    =====================================*/

    const glowGeometry =
        new THREE.CircleGeometry(2.85, 64);

    const glowMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x6c5cff,
            transparent: true,
            opacity: 0.07,
            side: THREE.DoubleSide
        });

    const platformGlow =
        new THREE.Mesh(
            glowGeometry,
            glowMaterial
        );

    platformGlow.rotation.x =
        -Math.PI / 2;

    platformGlow.position.y =
        -1.61;

    root.add(platformGlow);


    /*====================================
        OUTER RING
    =====================================*/

    const outerRing =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                2.22,
                0.02,
                12,
                128
            ),
            new THREE.MeshBasicMaterial({
                color: 0x00d4ff,
                transparent: true,
                opacity: 0.82
            })
        );

    outerRing.rotation.x =
        Math.PI / 2;

    outerRing.position.y =
        -1.55;

    root.add(outerRing);


    /*====================================
        SECOND RING
    =====================================*/

    const middleRing =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                1.72,
                0.014,
                12,
                128
            ),
            new THREE.MeshBasicMaterial({
                color: 0x7b61ff,
                transparent: true,
                opacity: 0.8
            })
        );

    middleRing.rotation.x =
        Math.PI / 2;

    middleRing.position.y =
        -1.57;

    root.add(middleRing);


    /*====================================
        THIRD RING
    =====================================*/

    const innerRing =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                1.28,
                0.009,
                12,
                128
            ),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.28
            })
        );

    innerRing.rotation.x =
        Math.PI / 2;

    innerRing.position.y =
        -1.58;

    root.add(innerRing);


    /*====================================
        LAPTOP
    =====================================*/

    const laptopImage =
        mount.querySelector("img");

    const laptopGroup =
        new THREE.Group();

    root.add(laptopGroup);


    let laptopTexture = null;

    if (laptopImage) {

        laptopTexture =
            new THREE.TextureLoader().load(
                laptopImage.src
            );

    }


    const laptopMaterial =
        laptopTexture

            ? new THREE.MeshPhysicalMaterial({
                map: laptopTexture,
                transparent: true,
                roughness: 0.2,
                metalness: 0.2,
                clearcoat: 1,
                clearcoatRoughness: 0.12,
                side: THREE.DoubleSide
            })

            : new THREE.MeshPhysicalMaterial({
                color: 0x17203b,
                metalness: 0.7,
                roughness: 0.22
            });


    const laptop =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                4.82,
                3.02
            ),
            laptopMaterial
        );

    laptopGroup.add(laptop);


    /*====================================
        LAPTOP BODY
    =====================================*/

    const laptopBody =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                4.85,
                3.05,
                0.075
            ),
            new THREE.MeshPhysicalMaterial({
                color: 0x0c1328,
                metalness: 0.86,
                roughness: 0.18,
                emissive: 0x101938,
                emissiveIntensity: 0.38
            })
        );

    laptopBody.position.z =
        -0.055;

    laptopGroup.add(laptopBody);


    /*====================================
        LAPTOP GLOW LAYER
    =====================================*/

    const laptopGlow =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                5.45,
                3.65
            ),
            new THREE.MeshBasicMaterial({
                color: 0x725bff,
                transparent: true,
                opacity: 0.065,
                side: THREE.DoubleSide
            })
        );

    laptopGlow.position.z =
        -0.19;

    laptopGroup.add(laptopGlow);


    /*====================================
        TECH BADGE SYSTEM
    =====================================*/

    const badgeGroup =
        new THREE.Group();

    root.add(badgeGroup);


    function createBadge(
        text,
        color,
        size = 96
    ) {

        const badgeCanvas =
            document.createElement("canvas");

        badgeCanvas.width = size * 2;
        badgeCanvas.height = size;

        const ctx =
            badgeCanvas.getContext("2d");

        ctx.clearRect(
            0,
            0,
            badgeCanvas.width,
            badgeCanvas.height
        );


        /* Background */

        const radius = 22;

        ctx.beginPath();

        ctx.roundRect(
            4,
            4,
            badgeCanvas.width - 8,
            badgeCanvas.height - 8,
            radius
        );

        ctx.fillStyle =
            "rgba(10, 18, 38, 0.88)";

        ctx.fill();


        /* Border */

        ctx.strokeStyle = color;

        ctx.lineWidth = 4;

        ctx.stroke();


        /* Text */

        ctx.font =
            "bold 34px Arial";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";

        ctx.fillStyle =
            "#ffffff";

        ctx.fillText(
            text,
            badgeCanvas.width / 2,
            badgeCanvas.height / 2
        );


        const texture =
            new THREE.CanvasTexture(
                badgeCanvas
            );

        texture.needsUpdate = true;


        const material =
            new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                depthTest: false
            });


        const sprite =
            new THREE.Sprite(material);


        sprite.scale.set(
            1.12,
            0.56,
            1
        );


        sprite.userData.baseScale =
            1.12;


        return sprite;

    }


    const badges = [

        {
            text: "HTML",
            color: "#ff7b35",
            position: [-2.75, 1.25, 0.35],
            speed: 0.85
        },

        {
            text: "CSS",
            color: "#4f9fff",
            position: [2.65, 1.05, 0.55],
            speed: 1.05
        },

        {
            text: "JS",
            color: "#f7d84b",
            position: [2.85, -0.55, 0.3],
            speed: 0.72
        },

        {
            text: "GSAP",
            color: "#6cf0a7",
            position: [-2.75, -0.65, 0.25],
            speed: 0.92
        },

        {
            text: "GIT",
            color: "#ff6f42",
            position: [0.35, 1.9, -0.4],
            speed: 0.7
        }

    ];


    badges.forEach(
        (item, index) => {

            const badge =
                createBadge(
                    item.text,
                    item.color
                );

            badge.position.set(
                item.position[0],
                item.position[1],
                item.position[2]
            );

            badge.userData = {

                baseX: item.position[0],

                baseY: item.position[1],

                baseZ: item.position[2],

                speed: item.speed,

                phase: index * 0.8

            };

            badgeGroup.add(badge);

        }
    );


    /*====================================
        PARTICLES
    =====================================*/

    const particleCount =
        isMobile ? 75 : 160;

    const positions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const i3 = i * 3;

        positions[i3] =
            (Math.random() - 0.5) * 9;

        positions[i3 + 1] =
            (Math.random() - 0.5) * 6;

        positions[i3 + 2] =
            (Math.random() - 0.5) * 5;

    }


    const particlesGeometry =
        new THREE.BufferGeometry();

    particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const particlesMaterial =
        new THREE.PointsMaterial({

            color: 0x7b61ff,

            size:
                isMobile
                    ? 0.028
                    : 0.037,

            transparent: true,

            opacity: 0.76,

            sizeAttenuation: true

        });


    const particles =
        new THREE.Points(
            particlesGeometry,
            particlesMaterial
        );

    root.add(particles);


    /*====================================
        CURSOR STATE
    =====================================*/

    const pointer = {
        x: 0,
        y: 0
    };


    const smoothPointer = {
        x: 0,
        y: 0
    };


    function updatePointer(event) {

        const rect =
            hero.getBoundingClientRect();

        const x =
            (event.clientX - rect.left)
            / rect.width;

        const y =
            (event.clientY - rect.top)
            / rect.height;

        pointer.x =
            THREE.MathUtils.clamp(
                (x - 0.5) * 2,
                -1,
                1
            );

        pointer.y =
            THREE.MathUtils.clamp(
                (y - 0.5) * 2,
                -1,
                1
            );

    }


    hero.addEventListener(
        "pointermove",
        updatePointer,
        { passive: true }
    );


    hero.addEventListener(
        "pointerleave",
        () => {

            pointer.x = 0;
            pointer.y = 0;

        },
        { passive: true }
    );


    /*====================================
        RESIZE
    =====================================*/

    function resize() {

        const width =
            Math.max(
                mount.clientWidth,
                320
            );

        const height =
            Math.max(
                mount.clientHeight,
                380
            );

        renderer.setSize(
            width,
            height,
            false
        );

        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();

    }


    window.addEventListener(
        "resize",
        resize,
        { passive: true }
    );


    /*====================================
        CLOCK
    =====================================*/

    const clock =
        new THREE.Clock();


    /*====================================
        VISIBILITY GATE
        Pauses the render loop once the
        hero is scrolled out of view, so
        this WebGL scene isn't rendering
        every frame forever in the
        background while reading the rest
        of the page.
    =====================================*/

    let isSceneVisible = true;
    let rafId = null;

    const visibilityObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                isSceneVisible = entry.isIntersecting;

                if (isSceneVisible && rafId === null) {

                    rafId = requestAnimationFrame(animate);

                }

            });

        },
        { rootMargin: "200px 0px 200px 0px" }
    );

    visibilityObserver.observe(hero);


    /*====================================
        ANIMATION
    =====================================*/

    function animate() {

        rafId = null;

        const elapsed =
            clock.getElapsedTime();


        /* Smooth mouse */

        smoothPointer.x +=
            (
                pointer.x
                - smoothPointer.x
            ) * 0.055;

        smoothPointer.y +=
            (
                pointer.y
                - smoothPointer.y
            ) * 0.055;


        if (!reducedMotion) {

            /* Laptop rotation */

            const targetY =
                smoothPointer.x *
                (isMobile ? 0.08 : 0.34);

            const targetX =
                -smoothPointer.y *
                (isMobile ? 0.06 : 0.2);


            laptopGroup.rotation.y +=
                (
                    targetY
                    - laptopGroup.rotation.y
                ) * 0.055;


            laptopGroup.rotation.x +=
                (
                    targetX
                    - laptopGroup.rotation.x
                ) * 0.055;


            /* Depth movement */

            laptopGroup.position.x +=
                (
                    smoothPointer.x * 0.11
                    - laptopGroup.position.x
                ) * 0.035;


            laptopGroup.position.z +=
                (
                    smoothPointer.x * 0.16
                    - laptopGroup.position.z
                ) * 0.035;


            /* Floating */

            laptopGroup.position.y =
                0.18 +
                Math.sin(
                    elapsed * 1.25
                ) * 0.12;


            /* Platform */

            platform.rotation.y =
                elapsed * 0.045;


            /* Rings */

            outerRing.rotation.z =
                elapsed * 0.18;

            middleRing.rotation.z =
                -elapsed * 0.30;

            innerRing.rotation.z =
                elapsed * 0.42;


            /* Particles */

            particles.rotation.y =
                elapsed * 0.018;

            particles.rotation.x =
                Math.sin(
                    elapsed * 0.17
                ) * 0.06;


            /* Platform glow */

            platformGlow.scale.setScalar(
                1 +
                Math.sin(elapsed * 1.4) * 0.035
            );


            /* Lights */

            purpleLight.position.x =
                3.5 +
                Math.sin(elapsed * 0.75) * 0.9;

            purpleLight.position.y =
                2.4 +
                Math.cos(elapsed * 0.5) * 0.45;


            cyanLight.position.x =
                -3.8 +
                Math.cos(elapsed * 0.65) * 0.9;

            cyanLight.position.y =
                -1.5 +
                Math.sin(elapsed * 0.6) * 0.45;


            rimLight.position.x =
                Math.sin(elapsed * 0.4) * 2;


            /* Floating tech badges */

            badgeGroup.children.forEach(
                (badge) => {

                    const data =
                        badge.userData;

                    badge.position.x =
                        data.baseX +
                        Math.sin(
                            elapsed *
                            data.speed +
                            data.phase
                        ) * 0.10;


                    badge.position.y =
                        data.baseY +
                        Math.cos(
                            elapsed *
                            data.speed +
                            data.phase
                        ) * 0.13;


                    badge.position.z =
                        data.baseZ +
                        Math.sin(
                            elapsed *
                            0.7 +
                            data.phase
                        ) * 0.08;


                    const pulse =
                        1 +
                        Math.sin(
                            elapsed * 1.4 +
                            data.phase
                        ) * 0.035;


                    badge.scale.set(
                        1.12 * pulse,
                        0.56 * pulse,
                        1
                    );

                }
            );

        }


        renderer.render(
            scene,
            camera
        );


        if (isSceneVisible) {

            rafId = requestAnimationFrame(
                animate
            );

        }

    }


    /*====================================
        INITIALIZE
    =====================================*/

    resize();
    animate();


    /*====================================
        GSAP ENTRANCE
    =====================================*/

    if (
        window.gsap &&
        !reducedMotion
    ) {

        gsap.fromTo(
            laptopGroup.scale,
            {
                x: 0.72,
                y: 0.72,
                z: 0.72
            },
            {
                x: 1,
                y: 1,
                z: 1,
                duration: 1.5,
                delay: 0.35,
                ease: "expo.out"
            }
        );


gsap.fromTo(
    laptopGroup.position,

    {
        x: 0,
        y: -0.8,
        z: -1.5
    },

    {
        x: 0,
        y: 0.15,
        z: 0,

        duration: 1.8,
        delay: 0.25,

        ease: "power4.out"
    }
);


gsap.fromTo(
    laptopGroup.rotation,

    {
        x: -0.28,
        y: -0.42,
        z: 0
    },

    {
        x: 0,
        y: 0,
        z: 0,

        duration: 1.8,
        delay: 0.25,

        ease: "power4.out"
    }
);

        gsap.fromTo(
            [outerRing.scale, middleRing.scale, innerRing.scale],
            {
                x: 0,
                y: 0,
                z: 0
            },
            {
                x: 1,
                y: 1,
                z: 1,
                duration: 1.25,
                delay: 0.85,
                stagger: 0.1,
                ease: "back.out(1.8)"
            }
        );


       /*====================================
    TECH BADGE ENTRANCE
=====================================*/

badgeGroup.children.forEach((badge, index) => {

    /* Start hidden */

    badge.scale.set(0, 0, 0);

    badge.material.opacity = 0;


    /* Animate scale */

    gsap.to(
        badge.scale,
        {
            x: 1.12,
            y: 0.56,
            z: 1,

            duration: 0.75,

            delay:
                1.15 + (index * 0.11),

            ease: "back.out(1.7)"
        }
    );


    /* Animate opacity */

    gsap.to(
        badge.material,
        {
            opacity: 1,

            duration: 0.55,

            delay:
                1.15 + (index * 0.11),

            ease: "power2.out"
        }
    );

});
    }

})();