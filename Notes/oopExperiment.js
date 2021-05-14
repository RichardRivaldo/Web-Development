class Animations {
    constructor(selector) {
        this.selector = document.querySelector(selector);
    }
    fadeOut(time, toggle = true) {
        if (toggle && this.selector.classList.contains("faded")) {
            this.selector.style.transition = `all ${time}s ease-in`;
            this.selector.style.opacity = 1;
            this.selector.classList.remove("faded");
        } else {
            this.selector.style.transition = `all ${time}s ease-out`;
            this.selector.style.opacity = 0;
            this.selector.classList.add("faded");
        }
    }

    move(time, { x = 0, y = 0 }, toggle = true) {
        if (toggle && this.selector.classList.contains("moved")) {
            this.selector.style.transition = `all ${time}s ease-in`;
            this.selector.style.transform = "translate(0px, 0px)";
            this.selector.classList.remove("moved");
        } else {
            this.selector.style.transition = `all ${time}s ease-out`;
            this.selector.style.transform = `translate(${x}px, ${y}px)`;
            this.selector.classList.add("moved");
        }
    }
}

const oop = new Animations("h1");
const button = document.querySelector("button");

button.addEventListener("click", () => {
    oop.move(0.5, { x: 200, y: 200 });
});
