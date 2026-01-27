// glitch

let isRandomGlitchActive = false;

const glitchElement = document.querySelector('.glitch');

function triggerRandomGlitch() {
    isRandomGlitchActive = true;
    glitchElement.classList.add('heavy-glitch');
    setTimeout(() => {
        glitchElement.classList.remove('heavy-glitch');
        isRandomGlitchActive = false;
        // toggleNoise(false);
    }, 180);
    // toggleNoise(true);
}

// noise

const canvas = document.querySelector('#noise');
const parent = document.querySelector('.terminal');

function resize() {
    const bbox = parent.getBoundingClientRect();
    canvas.width = bbox.width;
    canvas.height = bbox.height;
}

resize();

const ctx = canvas.getContext('2d');
let scanlinePos = 0;
let scanlineWidth = 20;

function generateNoise() {
    const iData = ctx.createImageData(canvas.width, canvas.height);
    const buffer = new Uint32Array(iData.data.buffer);
    scanlinePos = (scanlinePos + 1) % canvas.height;

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            const inBar = y >= scanlinePos && y <= scanlinePos + scanlineWidth;
            const i = y * canvas.width + x;
            let val = 0;
            if (inBar & Math.random() > 0.5) {
                val = 20;
            } else {
                if (Math.random() > 0.9 || isRandomGlitchActive) {
                    val = Math.random() * 200;
                }
            }
            buffer[i] = 255 << 24 | val << 16 | val << 8 | val;
        }
    }
    ctx.putImageData(iData, 0, 0);
}

// leds

function lfo(freq = 1, amp = 1, offset = 0, unipolar = false) {
    const t = Date.now() / 1000;
    let wave = Math.sin(2 * Math.PI * freq * t);
    if (unipolar) {
        wave = (wave + 1) * 0.5;
    }
    return offset + (wave * amp);
}

function setRadiationLevel() {
    let level = lfo(0.1, 0.5, 0, true);
    const jitter = (Math.random() - 0.5) * 0.2;
    level += jitter;
    if (level > 0.55) triggerRandomGlitch();

    const leds = Array.from(ledrow.children);
    const count = leds.length;

    for (let i = 0; i < count; i++) {
        if (level > (i + 1) * 0.1) {
            leds[i].style.setProperty('--level', 0.6);
        } else if (level < (i + 2) * 0.1) {
            leds[i].style.setProperty('--level', 0.1);
        } else {
            leds[i].style.setProperty('--level', level);
        }
    }
}

function loop() {
    generateNoise();
    setRadiationLevel();
    requestAnimationFrame(loop);
}

loop();