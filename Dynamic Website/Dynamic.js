let controller;
let slideScene;
let pageScene;
let detailScene;
const mouse = document.querySelector(".cursor");
const mouseText = mouse.querySelector("span");
const burger = document.querySelector(".burger");
const logo = document.querySelector("#logo");

function animateSlides() {
    controller = new ScrollMagic.Controller();
    const sliders = document.querySelectorAll(".slide");
    const nav = document.querySelectorAll(".nav-header");

    sliders.forEach((slide, index, slides) => {
        const revealImg = slide.querySelector(".reveal-img");
        const img = slide.querySelector("img");
        const revealText = slide.querySelector(".reveal-text");

        // GSAP
        const slideTimeline = gsap.timeline({
            defaults: { duration: 1, ease: "power2.inOut" },
        });

        slideTimeline.fromTo(revealImg, { x: "0%" }, { x: "100%" });
        slideTimeline.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
        slideTimeline.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");

        // Scene
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false,
        })
            .setTween(slideTimeline)
            .addTo(controller);
        //.addIndicators({ colorStart: "white", colorTrigger: "white", name: "slide" })

        const pageTimeline = gsap.timeline();
        let nextSlide = slide.length - 1 === index ? "end" : slides[index + 1];
        pageTimeline.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
        pageTimeline.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
        pageTimeline.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0,
        })
            .setPin(slide, { pushFollowers: false })
            .setTween(pageTimeline)
            .addTo(controller);
        // .addIndicators({
        //     colorStart: "white",
        //     colorTrigger: "white",
        //     name: "page",
        //     indent: 200,
        // })
    });
}

function cursor(event) {
    mouse.style.top = event.pageY + "px";
    mouse.style.left = event.pageX + "px";
}

function activeCursor(event) {
    const target = event.target;
    if (target.id === "logo" || target.classList.contains("burger")) {
        mouse.classList.add("nav-active");
    } else {
        mouse.classList.remove("nav-active");
    }
    if (target.classList.contains("explore")) {
        mouse.classList.add("exp-active");
        gsap.to(".title-swipe", 1, { y: "0%" });
        mouseText.innerText = "Tap";
    } else {
        mouse.classList.remove("exp-active");
        gsap.to(".title-swipe", 1, { y: "100%" });
        mouseText.innerText = "";
    }
}

function navToggle(event) {
    if (!event.target.classList.contains("active")) {
        event.target.classList.add("active");
        gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
        gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
        gsap.to(".line3", 0.5, { y: -13, scale: 0.8, background: "black" });
        gsap.to("#logo", 1, { color: "black" });
        gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
        document.body.classList.add("hide");
    } else {
        event.target.classList.remove("active");
        gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to(".line3", 0.5, { y: 0, scale: 1, background: "white" });
        gsap.to("#logo", 1, { color: "white" });
        gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
        document.body.classList.remove("hide");
    }
}

barba.init({
    views: [
        {
            namespace: "home",
            beforeEnter() {
                animateSlides();
                logo.href = "./index.html";
            },
            beforeLeave() {
                slideScene.destroy();
                pageScene.destroy();
                controller.destroy();
            },
        },
        {
            namespace: "fashion",
            beforeEnter() {
                logo.href = "../index.html";
                detailAnimations();
            },
            beforeLeave() {
                controller.destroy();
                detailScene.destroy();
            },
        },
    ],
    transitions: [
        {
            leave({ current, next }) {
                let done = this.async();
                const tl = gsap.timeline({ defaults: { ease: "power2,inOut" } });
                tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
                tl.fromTo(
                    ".swipe",
                    0.75,
                    { x: "100%" },
                    { x: "0%", onComplete: done },
                    "-=0.5"
                );
            },
            enter({ current, next }) {
                let done = this.async();

                window.scrollTo(0, 0);
                const tl = gsap.timeline({ defaults: { ease: "power2,inOut" } });
                tl.fromTo(
                    ".swipe",
                    1,
                    { x: "0%" },
                    { x: "100%", stagger: 0.25, onComplete: done }
                );
                tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
                tl.fromTo(
                    ".nav-header",
                    1,
                    { y: "-100%" },
                    { y: "0%", ease: "power2.inOut" },
                    "-=1.5"
                );
            },
        },
    ],
});

function detailAnimations() {
    controller = new ScrollMagic.Controller();
    const slides = document.querySelectorAll(".detail-slide");
    slides.forEach((slide, index, slides) => {
        const slideTl = gsap.timeline({ defaults: { duration: 1 } });
        let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
        const nextImg = nextSlide.querySelector("img");
        slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
        slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
        slideTl.fromTo(nextImg, { x: "50%" }, { x: "0%" });
        detailScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0,
        })
            .setPin(slide, { pushFollowers: false })
            .setTween(slideTl)
            .addTo(controller);
    });
}

window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
burger.addEventListener("click", navToggle);

animateSlides();
