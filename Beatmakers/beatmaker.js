class Beat {
    constructor() {
        this.pad = document.querySelectorAll(".pad");
        this.play = document.querySelector(".play");
        this.currentKick = "./sounds/kick-classic.wav";
        this.currentSnare = "./sounds/snare-acoustic01.wav";
        this.currentHihat = "./sounds/hihat-acoustic01.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtn = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }

    repeater() {
        let steps = this.index % 8;
        const activeStep = document.querySelectorAll(`.b${steps}`);
        activeStep.forEach((step) => {
            step.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if (step.classList.contains("active")) {
                if (step.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (step.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (step.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }

    start() {
        const interval = (60 / this.bpm) * 1000;

        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeater();
            }, interval);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }

    updPlayBtn() {
        if (this.isPlaying) {
            this.play.innerText = "Stop";
            this.play.classList.add("active");
        } else {
            this.play.innerText = "Play";
            this.play.classList.remove("active");
        }
    }

    activePad() {
        this.classList.toggle("active");
    }

    changeSound(event) {
        const selectionName = event.target.name;
        const selectionValue = event.target.value;
        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }

    muteSound(event) {
        const muted = event.target.getAttribute("data-track");
        event.target.classList.toggle("active");
        if (event.target.classList.contains("active")) {
            switch (muted) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            switch (muted) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(event) {
        const tempoText = document.querySelector(".tempo-number");
        tempoText.innerText = event.target.value;
    }

    updateTempo(event) {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        this.bpm = event.target.value;
        const playBtn = document.querySelector(".play");
        if (playBtn.classList.contains("active")) {
            this.start();
        }
    }
}

const beat = new Beat();

beat.play.addEventListener("click", () => {
    beat.start();
    beat.updPlayBtn();
});

beat.pad.forEach((pad) => {
    pad.addEventListener("click", beat.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});

beat.selects.forEach((select) => {
    select.addEventListener("change", function (event) {
        beat.changeSound(event);
    });
});

beat.muteBtn.forEach((btn) => {
    btn.addEventListener("click", function (event) {
        beat.muteSound(event);
    });
});

beat.tempoSlider.addEventListener("input", function (event) {
    beat.changeTempo(event);
});

beat.tempoSlider.addEventListener("change", function (event) {
    beat.updateTempo(event);
});
