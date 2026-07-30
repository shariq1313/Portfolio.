/*====================================
        PROJECT FILTER
====================================*/

const buttons=document.querySelectorAll(".filter-btn");

const projects=document.querySelectorAll(".project");

buttons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        buttons.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        const filter=btn.dataset.filter;

        projects.forEach(project=>{

            if(filter==="all"){

                project.style.display="block";

                return;

            }

            if(project.dataset.category===filter){

                project.style.display="block";

            }else{

                project.style.display="none";

            }

        });

    });

});

/*====================================
        SKILL ANIMATION
====================================*/

const fills=document.querySelectorAll(".skill-fill");

const animateSkills=()=>{

    fills.forEach(fill=>{

        fill.style.width=fill.dataset.width+"%";

    });

}

const skillSection=document.querySelector("#skills");

window.addEventListener("scroll",()=>{

    if(skillSection.getBoundingClientRect().top<window.innerHeight-120){

        animateSkills();

    }

});

/*====================================
        PERFORMANCE
====================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});