/*====================================
        MOBILE MENU
====================================*/

const sidebar=document.querySelector(".sidebar");

const menu=document.querySelector(".menu-toggle");

const overlay=document.createElement("div");

overlay.className="overlay";

document.body.appendChild(overlay);

menu.addEventListener("click",()=>{

    sidebar.classList.add("active");

    overlay.classList.add("show");

    document.body.style.overflow="hidden";

});

overlay.addEventListener("click",closeMenu);

document.querySelectorAll(".sidebar a").forEach(link=>{

    link.addEventListener("click",closeMenu);

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeMenu();

    }

});

function closeMenu(){

    sidebar.classList.remove("active");

    overlay.classList.remove("show");

    document.body.style.overflow="";

}