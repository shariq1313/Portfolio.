/*====================================
    SMOOTH SCROLL
=====================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
        .scrollIntoView({
            behavior:"smooth"
        });

    });

});


/*====================================
    ACTIVE SIDEBAR LINK
=====================================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar nav ul li");

window.addEventListener("scroll", ()=>{

    let current = "";

    sections.forEach(section=>{

        const top = section.offsetTop-180;
        const height = section.offsetHeight;

        if(scrollY >= top){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(li=>{

        li.classList.remove("active");

        if(li.querySelector("a").getAttribute("href")=="#"+current){

            li.classList.add("active");

        }

    });

});


/*====================================
    SECTION REVEAL
=====================================*/

const revealSections=document.querySelectorAll(".section");

const reveal=()=>{

    revealSections.forEach(section=>{

        const top=section.getBoundingClientRect().top;

        if(top<window.innerHeight-120){

            section.classList.add("show");

        }

    });

};

window.addEventListener("scroll",reveal);

reveal();


/*====================================
    COUNTER
=====================================*/

const counters=document.querySelectorAll(".counter");

const runCounter=()=>{

    counters.forEach(counter=>{

        const target=+counter.dataset.target;

        let count=0;

        const speed=target/120;

        const update=()=>{

            count+=speed;

            if(count<target){

                counter.innerHTML=Math.floor(count);

                requestAnimationFrame(update);

            }else{

                counter.innerHTML=target;

            }

        }

        update();

    });

};

runCounter();


/*====================================
    MOUSE GLOW
=====================================*/

const glow=document.createElement("div");

glow.classList.add("cursor-glow");

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX+"px";

    glow.style.top=e.clientY+"px";

});


/*====================================
    BACK TO TOP
=====================================*/

const topBtn=document.createElement("button");

topBtn.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

topBtn.classList.add("top-btn");

document.body.appendChild(topBtn);

topBtn.style.cssText=`
position:fixed;
bottom:35px;
right:35px;
width:55px;
height:55px;
border:none;
border-radius:50%;
background:#00D4FF;
color:#000;
font-size:20px;
cursor:pointer;
display:none;
z-index:999;
box-shadow:0 10px 30px rgba(0,212,255,.4);
`;

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};


/*====================================
    SCROLL PROGRESS BAR
=====================================*/

const progress=document.createElement("div");

progress.classList.add("progress-bar");

document.body.appendChild(progress);

progress.style.cssText=`
position:fixed;
top:0;
left:0;
height:4px;
background:linear-gradient(90deg,#7B61FF,#00D4FF);
z-index:9999;
width:0%;
`;

window.addEventListener("scroll",()=>{

    const total=document.documentElement.scrollHeight-window.innerHeight;

    const percent=(window.scrollY/total)*100;

    progress.style.width=percent+"%";

});