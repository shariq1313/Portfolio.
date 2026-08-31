/*====================================
    PHASE 5 — 3D TECH GLOBE
    Interactive network globe for the
    "Global Network" section. Built to
    match the existing hero scene's
    lighting palette and interaction
    style (see 3d-scene.js) so it feels
    like part of the same site, not a
    bolted-on widget.
=====================================*/

import * as THREE from "./three.module.min.js";

(() => {

    const section = document.querySelector("#network");
    const mount = document.getElementById("techGlobeMount");

    if (!section || !mount) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (typeof THREE === "undefined") return;


    /*====================================
        RENDERER
    =====================================*/

    const renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: "low-power"
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.3 : 1.9));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);


    /*====================================
        SCENE + CAMERA
    =====================================*/

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.3, 7.4);


    /*====================================
        LIGHTS
        Same palette as the hero scene:
        purple + cyan accents on a dark
        hemisphere fill.
    =====================================*/

    const hemiLight = new THREE.HemisphereLight(0xbfdcff, 0x03050b, 1.1);
    scene.add(hemiLight);

    const purpleLight = new THREE.PointLight(0x7b61ff, 14, 12);
    purpleLight.position.set(3, 2, 3);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x00d4ff, 12, 12);
    cyanLight.position.set(-3, -1.5, 2.5);
    scene.add(cyanLight);


    /*====================================
        GLOBE GROUP
    =====================================*/

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const RADIUS = 2;

    // Soft solid core so the globe reads as a volume, not just lines
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS * 0.985, 48, 48),
        new THREE.MeshBasicMaterial({
            color: 0x0b1220,
            transparent: true,
            opacity: 0.55
        })
    );
    globeGroup.add(core);

    // Fresnel-ish rim glow using a slightly larger backside sphere
    const rimGlow = new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS * 1.04, 48, 48),
        new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.06,
            side: THREE.BackSide
        })
    );
    globeGroup.add(rimGlow);

    /* Clean latitude / longitude wireframe (no diagonal facets) */

    function buildGrid(radius, latLines, lonLines, segments, color, opacity) {

        const group = new THREE.Group();

        const material = new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity
        });

        for (let i = 1; i < latLines; i++) {

            const lat = (Math.PI * i) / latLines - Math.PI / 2;
            const r = radius * Math.cos(lat);
            const y = radius * Math.sin(lat);
            const points = [];

            for (let j = 0; j <= segments; j++) {
                const theta = (j / segments) * Math.PI * 2;
                points.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
            }

            group.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), material));

        }

        for (let i = 0; i < lonLines; i++) {

            const lon = (Math.PI * i) / lonLines;
            const points = [];

            for (let j = 0; j <= segments; j++) {
                const phi = (j / segments) * Math.PI * 2;
                points.push(new THREE.Vector3(
                    radius * Math.sin(phi) * Math.cos(lon),
                    radius * Math.cos(phi),
                    radius * Math.sin(phi) * Math.sin(lon)
                ));
            }

            group.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), material));

        }

        return group;

    }

    const grid = buildGrid(RADIUS, isMobile ? 5 : 7, isMobile ? 8 : 12, 64, 0x00d4ff, 0.22);
    globeGroup.add(grid);


    /*====================================
        NETWORK NODES + ARCS
        Decorative "connected world" hubs
        - not tied to specific real client
        locations, just a network motif.
    =====================================*/

    function toVector(latDeg, lonDeg, radius) {
        const lat = (latDeg * Math.PI) / 180;
        const lon = (lonDeg * Math.PI) / 180;
        return new THREE.Vector3(
            radius * Math.cos(lat) * Math.cos(lon),
            radius * Math.sin(lat),
            radius * Math.cos(lat) * Math.sin(lon)
        );
    }

    const NODE_COORDS = [
        [40, -74], [51, 0], [35, 139], [-33, 151],
        [19, 73], [1, 104], [52, 13], [-23, -46],
        [30, 31], [55, 37], [43, -79], [25, 55]
    ];

    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
    const nodeGeometry = new THREE.SphereGeometry(0.035, 10, 10);
    const nodes = [];

    NODE_COORDS.forEach(([lat, lon]) => {
        const pos = toVector(lat, lon, RADIUS * 1.01);
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.copy(pos);
        globeGroup.add(node);
        nodes.push(pos);
    });

    // A handful of arcing connections between nodes
    const ARC_PAIRS = [[0, 1], [1, 6], [2, 5], [4, 8], [3, 11], [9, 6], [0, 9], [7, 4]];
    const arcMaterial = new THREE.LineBasicMaterial({
        color: 0x7b61ff,
        transparent: true,
        opacity: 0.55
    });

    const arcs = [];

    ARC_PAIRS.forEach(([a, b]) => {

        if (!nodes[a] || !nodes[b]) return;

        const start = nodes[a];
        const end = nodes[b];
        const mid = start.clone().add(end).multiplyScalar(0.5);
        mid.setLength(RADIUS * 1.35);

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(48);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const arcLine = new THREE.Line(geometry, arcMaterial);
        globeGroup.add(arcLine);

        // Small pulse travelling along the arc
        const pulse = new THREE.Mesh(
            new THREE.SphereGeometry(0.025, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })
        );
        globeGroup.add(pulse);

        arcs.push({ curve, pulse, offset: Math.random() });

    });


    /*====================================
        AMBIENT PARTICLES
    =====================================*/

    const particleCount = isMobile ? 60 : 140;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const r = RADIUS * (1.5 + Math.random() * 1.1);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0x9fb8ff,
        size: 0.02,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true
    });

    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleField);


    /*====================================
        POINTER (smoothed, desktop only)
    =====================================*/

    const pointer = { x: 0, y: 0 };
    const smoothPointer = { x: 0, y: 0 };

    if (!isMobile) {

        mount.addEventListener("pointermove", (e) => {

            const rect = mount.getBoundingClientRect();
            pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

        }, { passive: true });

        mount.addEventListener("pointerleave", () => {
            pointer.x = 0;
            pointer.y = 0;
        });

    }


    /*====================================
        RESIZE
    =====================================*/

    function resize() {

        const w = mount.clientWidth || 1;
        const h = mount.clientHeight || 1;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);

    }

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(mount);


    /*====================================
        VISIBILITY GATE
    =====================================*/

    let isVisible = false;
    let rafId = null;

    const visibilityObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                isVisible = entry.isIntersecting;

                if (isVisible && rafId === null) {
                    rafId = requestAnimationFrame(animate);
                }

            });

        },
        { rootMargin: "150px 0px 150px 0px" }
    );

    visibilityObserver.observe(section);


    /*====================================
        ANIMATE
    =====================================*/

    const clock = new THREE.Clock();

    function animate() {

        rafId = null;

        const elapsed = clock.getElapsedTime();

        if (!reducedMotion) {

            smoothPointer.x += (pointer.x - smoothPointer.x) * 0.06;
            smoothPointer.y += (pointer.y - smoothPointer.y) * 0.06;

            globeGroup.rotation.y = elapsed * 0.12 + smoothPointer.x * 0.35;
            globeGroup.rotation.x = smoothPointer.y * 0.18;

            particleField.rotation.y = elapsed * 0.02;

            purpleLight.position.x = 3 + Math.sin(elapsed * 0.6) * 0.8;
            cyanLight.position.x = -3 + Math.cos(elapsed * 0.5) * 0.8;

            arcs.forEach((arc) => {

                const t = (elapsed * 0.25 + arc.offset) % 1;
                const p = arc.curve.getPoint(t);
                arc.pulse.position.copy(p);

                const fade = Math.sin(t * Math.PI);
                arc.pulse.material.opacity = 0.2 + fade * 0.8;

            });

        }

        renderer.render(scene, camera);

        if (isVisible && !reducedMotion) {
            rafId = requestAnimationFrame(animate);
        }

    }

    resize();
    renderer.render(scene, camera);

    if (!reducedMotion) {
        isVisible = true;
        rafId = requestAnimationFrame(animate);
    }


    /*====================================
        ENTRANCE
    =====================================*/

    if (window.gsap && window.ScrollTrigger) {

        gsap.fromTo(
            mount,
            { opacity: 0, scale: 0.85 },
            {
                opacity: 1,
                scale: 1,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    once: true
                }
            }
        );

        gsap.utils.toArray(".globe-info > *").forEach((el, i) => {

            gsap.fromTo(
                el,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none none",
                        once: true
                    },
                    clearProps: "transform"
                }
            );

        });

    }

})();
