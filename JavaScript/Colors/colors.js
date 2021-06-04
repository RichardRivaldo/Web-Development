const colors = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currHex = document.querySelectorAll(".color h2");
const popup = document.querySelector(".copy-container");
const adjusts = document.querySelectorAll(".adjust");
const locks = document.querySelectorAll(".lock");
const closeAdjustments = document.querySelectorAll(".close-adjustment");
const sliderContainers = document.querySelectorAll(".sliders");

let initialColors = [];
let savedPalettes = [];

generateBtn.addEventListener("click", generateRandomColors);

sliders.forEach((slider) => {
    slider.addEventListener("input", hslControls);
});

colors.forEach((div, index) => {
    div.addEventListener("change", () => {
        updateText(index);
    });
});

currHex.forEach((hex) => {
    hex.addEventListener("click", () => {
        copyToClipboard(hex);
    });
});

popup.addEventListener("transitionend", () => {
    const popupBox = popup.children[0];
    popup.classList.remove("active");
    popupBox.classList.remove("active");
});

adjusts.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        openAdjustmentsPanel(index);
    });
});

closeAdjustments.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        closeAdjustmentsPanel(index);
    });
});

locks.forEach((btn, index) => {
    btn.addEventListener("click", (event) => {
        lockButton(event, index);
    });
});

function generateHex() {
    const hexColor = chroma.random();
    return hexColor;
}

function generateRandomColors() {
    colors.forEach((div, index) => {
        const hexText = div.children[0];
        const randomColor = generateHex();

        if (div.classList.contains("locked")) {
            initialColors.push(hexText.innerText);
            return;
        } else {
            initialColors.push(chroma(randomColor).hex());
        }
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;
        checkConstrast(randomColor, hexText);

        const color = chroma(randomColor);
        const slider = div.querySelectorAll(".sliders input");
        const hue = slider[0];
        const brightness = slider[1];
        const saturation = slider[2];

        colorizeSlider(color, hue, brightness, saturation);
    });

    resetInputs();

    adjusts.forEach((button, index) => {
        checkConstrast(initialColors[index], button);
        checkConstrast(initialColors[index], locks[index]);
    });
}

function checkConstrast(color, text) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? "black" : "white";
}

function colorizeSlider(color, hue, brightness, saturation) {
    const noSat = color.set("hsl.s", 0);
    const fullSat = color.set("hsl.s", 1);
    const scaleSat = chroma.scale([noSat, color, fullSat]);
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`;

    const midBright = color.set("hsl.l", 0.5);
    const scaleBright = chroma.scale(["black", midBright, "white"]);
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)}, ${scaleBright(
        0.5
    )}, ${scaleBright(1)})`;

    hue.style.backgroundImage = `linear-gradient(to right, rgb(204, 75, 75), rgb(204, 204, 75), rgb(75, 204, 75), rgb(75, 204, 204), rgb(75, 75, 204), rgb(204, 75, 204), rgb(204, 75, 75))`;
}

function hslControls(events) {
    const index =
        events.target.getAttribute("data-bright") ||
        events.target.getAttribute("data-hue") ||
        events.target.getAttribute("data-saturation");
    let sliders = events.target.parentElement.querySelectorAll('input[type="range"]');

    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];
    const bgColor = initialColors[index];

    let color = chroma(bgColor)
        .set("hsl.s", saturation.value)
        .set("hsl.l", brightness.value)
        .set("hsl.h", hue.value);

    colors[index].style.backgroundColor = color;

    colorizeSlider(color, hue, brightness, saturation);
}

function updateText(index) {
    const activeDiv = colors[index];
    const color = chroma(activeDiv.style.backgroundColor);
    const text = activeDiv.querySelector("h2");
    const icons = activeDiv.querySelectorAll(".controls button");
    text.innerText = color.hex();

    checkConstrast(color, text);
    for (icon of icons) {
        checkConstrast(color, icon);
    }
}

function resetInputs() {
    const sliders = document.querySelectorAll(".sliders input");
    sliders.forEach((slider) => {
        if (slider.name === "hue") {
            const hueColor = initialColors[slider.getAttribute("data-hue")];
            const hueValue = chroma(hueColor).hsl()[0];
            slider.value = Math.floor(hueValue);
        }
        if (slider.name === "saturation") {
            const satColor = initialColors[slider.getAttribute("data-saturation")];
            const satValue = chroma(satColor).hsl()[1];
            slider.value = Math.floor(satValue * 100) / 100;
        }
        if (slider.name === "brightness") {
            const brightColor = initialColors[slider.getAttribute("data-bright")];
            const brightValue = chroma(brightColor).hsl()[2];
            slider.value = Math.floor(brightValue * 100) / 100;
        }
    });
}

function copyToClipboard(hex) {
    const tempEl = document.createElement("textarea");
    tempEl.value = hex.innerText;

    document.body.appendChild(tempEl);
    tempEl.select();

    document.execCommand("copy");
    document.body.removeChild(tempEl);

    const popupBox = popup.children[0];
    popup.classList.add("active");
    popupBox.classList.add("active");
}

function openAdjustmentsPanel(index) {
    sliderContainers[index].classList.toggle("active");
}

function closeAdjustmentsPanel(index) {
    sliderContainers[index].classList.remove("active");
}

function lockButton(event, index) {
    const lockIcon = event.target.children[0];
    const activeColor = colors[index];
    activeColor.classList.toggle("locked");

    if (lockIcon.classList.contains("fa-lock-open")) {
        event.target.innerHTML = '<i class="fas fa-lock"></i>';
    } else {
        event.target.innerHTML = '<i class="fas fa-lock-open"></i>';
    }
}

const saveBtn = document.querySelector(".save");
const submitBtn = document.querySelector(".submit-save");
const closeSave = document.querySelector(".close-save");
const saveContainer = document.querySelector(".save-container");
const saveInput = document.querySelector(".save-container input");
const libraryContainer = document.querySelector(".library-container");
const libraryBtn = document.querySelector(".library");
const closeLibBtn = document.querySelector(".close-library");

saveBtn.addEventListener("click", openPalette);
closeSave.addEventListener("click", closePalette);
submitBtn.addEventListener("click", savePalette);
libraryBtn.addEventListener("click", openLibrary);
closeLibBtn.addEventListener("click", closeLibrary);

function openPalette(event) {
    const popup = saveContainer.children[0];
    saveContainer.classList.add("active");
    popup.classList.add("active");
}

function closePalette(event) {
    const popup = saveContainer.children[0];
    saveContainer.classList.remove("active");
    popup.classList.remove("active");
}

function savePalette(event) {
    saveContainer.classList.remove("active");
    popup.classList.remove("active");

    const paletteName = saveInput.value;
    const colorsArr = [];

    currHex.forEach((hex) => {
        colorsArr.push(hex.innerText);
    });

    let paletteNum;
    const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
    if (paletteObjects) {
        paletteNum = paletteObjects.length;
    } else {
        paletteNum = savedPalettes.length;
    }

    const paletteObj = { paletteName, colorsArr, paletteNum };
    savedPalettes.push(paletteObj);

    saveToLocal(paletteObj);
    saveInput.value = "";

    const palettes = document.createElement("div");
    palettes.classList.add("custom-palettes");
    const title = document.createElement("h4");
    title.innerText = paletteObj.paletteName;
    const preview = document.createElement("div");
    preview.classList.add("small-preview");
    paletteObj.colorsArr.forEach((smallColors) => {
        const smallDivs = document.createElement("div");
        smallDivs.style.backgroundColor = smallColors;
        preview.appendChild(smallDivs);
    });

    const paletteBtn = document.createElement("button");
    paletteBtn.classList.add("pick-palette-btn");
    paletteBtn.classList.add(paletteObj.paletteNum);
    paletteBtn.innerText = "Select";

    paletteBtn.addEventListener("click", (event) => {
        closeLibrary();
        const paletteIndex = event.target.classList[1];
        initialColors = [];
        savedPalettes[paletteIndex].colorsArr.forEach((color, index) => {
            initialColors.push(color);
            colors[index].style.backgroundColor = color;
            const text = colors[index].children[0];
            checkConstrast(color, text);
            updateText(index);
        });
        resetInputs();
    });

    palettes.appendChild(title);
    palettes.appendChild(preview);
    palettes.appendChild(paletteBtn);
    libraryContainer.children[0].appendChild(palettes);
}

function saveToLocal(paletteObj) {
    let localPalette;
    if (localStorage.getItem("palettes")) {
        localPalette = JSON.parse(localStorage.getItem("palettes"));
    } else {
        localPalette = [];
    }

    localPalette.push(paletteObj);
    localStorage.setItem("palettes", JSON.stringify(localPalette));
}

function openLibrary() {
    const popup = libraryContainer.children[0];
    libraryContainer.classList.add("active");
    popup.classList.add("active");
}

function closeLibrary() {
    const popup = libraryContainer.children[0];
    libraryContainer.classList.remove("active");
    popup.classList.remove("active");
}

function getLocal() {
    if (localStorage.getItem("palettes")) {
        const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
        savedPalettes = [...paletteObjects];
        paletteObjects.forEach((paletteObj) => {
            const palettes = document.createElement("div");
            palettes.classList.add("custom-palettes");
            const title = document.createElement("h4");
            title.innerText = paletteObj.paletteName;
            const preview = document.createElement("div");
            preview.classList.add("small-preview");
            paletteObj.colorsArr.forEach((smallColors) => {
                const smallDivs = document.createElement("div");
                smallDivs.style.backgroundColor = smallColors;
                preview.appendChild(smallDivs);
            });

            const paletteBtn = document.createElement("button");
            paletteBtn.classList.add("pick-palette-btn");
            paletteBtn.classList.add(paletteObj.paletteNum);
            paletteBtn.innerText = "Select";

            paletteBtn.addEventListener("click", (event) => {
                closeLibrary();
                const paletteIndex = event.target.classList[1];
                initialColors = [];
                paletteObjects[paletteIndex].colorsArr.forEach((color, index) => {
                    initialColors.push(color);
                    colors[index].style.backgroundColor = color;
                    const text = colors[index].children[0];
                    checkConstrast(color, text);
                    updateText(index);
                });
                resetInputs();
            });

            palettes.appendChild(title);
            palettes.appendChild(preview);
            palettes.appendChild(paletteBtn);
            libraryContainer.children[0].appendChild(palettes);
        });
    } else {
        localPalette = [];
    }
}

getLocal();
generateRandomColors();
