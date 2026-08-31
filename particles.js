/*====================================
    AMBIENT PARTICLE NETWORK
    Fills the #particles-js background
    layer (already present in the HTML/
    CSS) with a lightweight canvas of
    drifting, connected nodes matching
    the site's cyan/purple accent theme.
=====================================*/

(function () {

    const mount = document.getElementById("particles-js");

    if (!mount) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Respect the user's OS-level motion preference - skip the
    // animated background entirely rather than forcing it on them.
    if (reducedMotion) return;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    mount.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let width, height, dpr;
    let particles = [];
    let animationId = null;
    let isPageVisible = true;

    const COLORS = ["123,97,255", "0,212,255"]; // --primary, --secondary (as r,g,b)

    function isMobile() {
        return window.innerWidth < 768;
    }

    function particleCount() {
        // Fewer nodes on small / low-powered screens.
        const area = width * height;
        const base = isMobile() ? 45 : 90;
        return Math.min(base, Math.round(area / 18000));
    }

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
        const count = particleCount();
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            r: Math.random() * 1.4 + 0.6,
            color: COLORS[Math.random() < 0.5 ? 0 : 1]
        }));
    }

    function step() {

        ctx.clearRect(0, 0, width, height);

        const linkDist = isMobile() ? 100 : 140;

        for (let i = 0; i < particles.length; i++) {

            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            // Wrap around edges instead of bouncing - keeps the
            // field feeling continuous rather than bouncing off walls.
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color},0.5)`;
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {

                const q = particles[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < linkDist) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(123,97,255,${0.12 * (1 - dist / linkDist)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

            }

        }

        if (isPageVisible) {
            animationId = requestAnimationFrame(step);
        }

    }

    function start() {
        if (animationId) return;
        animationId = requestAnimationFrame(step);
    }

    function stop() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    // Pause rendering when the tab isn't visible - a full-page
    // canvas animation has no reason to burn CPU/GPU in a background tab.
    document.addEventListener("visibilitychange", () => {
        isPageVisible = document.visibilityState === "visible";
        if (isPageVisible) {
            start();
        } else {
            stop();
        }
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resize();
            createParticles();
        }, 200);
    });

    resize();
    createParticles();
    start();

})();
