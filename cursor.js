/*====================================
    CUSTOM CURSOR
=====================================*/

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const cursor = document.createElement("div");
cursor.className = "custom-cursor";
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

document.querySelectorAll("a, button, .project, .service, .skill").forEach(item => {

    item.addEventListener("mouseenter", () => {

        cursor.classList.add("cursor-grow");

    });

    item.addEventListener("mouseleave", () => {

        cursor.classList.remove("cursor-grow");

    });

});


/*====================================
    MAGNETIC BUTTONS
=====================================*/

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.25}px, ${y * 0.25}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});

/*====================================
    3D PROJECT TILT
    (moved to project-3d.js - that
    version also drives the cursor-glow
    on the card via --project-x/-y and
    the image parallax, so keeping both
    active here caused the two handlers
    to fight over the same transform on
    every mousemove)
=====================================*/


/*====================================
    TYPING EFFECT
=====================================*/

const typingElement = document.querySelector(".typing");

if (typingElement) {

    const words = [

        "Frontend Developer",

        "HTML Expert",

        "CSS Designer",

        "JavaScript Developer",

        "Bootstrap Developer"

    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(0, charIndex++);

            if (charIndex > currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1200);

                return;

            }

        } else {

            typingElement.textContent =
                currentWord.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;

                wordIndex = (wordIndex + 1) % words.length;

            }

        }

        setTimeout(typeEffect, deleting ? 50 : 90);

    }

    typeEffect();

}
/*====================================
        CURSOR TRAIL
        (throttled to ~30fps - creating
        a DOM node on every raw mousemove
        event was spawning dozens of dots
        per second during fast movement)
====================================*/

let lastTrailTime = 0;

document.addEventListener("mousemove",(e)=>{

    if (reducedMotion) return;

    const now = performance.now();

    if (now - lastTrailTime < 35) return;

    lastTrailTime = now;

    const dot=document.createElement("div");

    dot.className="cursor-dot";

    dot.style.left=e.clientX+"px";

    dot.style.top=e.clientY+"px";

    document.body.appendChild(dot);

    setTimeout(()=>{

        dot.remove();

    },800);

});


/*====================================
        RIPPLE CLICK
====================================*/

document.addEventListener("click",(e)=>{

    if (reducedMotion) return;

    const ripple=document.createElement("div");

    ripple.className="ripple";

    ripple.style.left=e.clientX+"px";

    ripple.style.top=e.clientY+"px";

    document.body.appendChild(ripple);

    setTimeout(()=>{

        ripple.remove();

    },700);

});


/*====================================
        THEME TOGGLE
====================================*/

const themeBtn=document.querySelector(".theme-toggle");

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("light-mode");

    const icon=themeBtn.querySelector("i");

    if(document.body.classList.contains("light-mode")){

        icon.className="fa-solid fa-sun";

    }else{

        icon.className="fa-solid fa-moon";

    }

});