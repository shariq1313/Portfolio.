/*====================================
    CUSTOM CURSOR
=====================================*/

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

        button.style.transform = "translate(0,0)";

    });

});


/*====================================
    3D PROJECT TILT
=====================================*/

document.querySelectorAll(".project").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX = -(y - rect.height / 2) / 18;

        const rotateY = (x - rect.width / 2) / 18;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.03)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

    });

});


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
====================================*/

document.addEventListener("mousemove",(e)=>{

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