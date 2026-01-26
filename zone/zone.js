// glitch

let isRandomGlitchActive = false;

const glitchElement = document.querySelector('.glitch');

function triggerRandomGlitch() {
    isRandomGlitchActive = true;
    glitchElement.classList.add('heavy-glitch');
    setTimeout(() => {
        glitchElement.classList.remove('heavy-glitch');
        isRandomGlitchActive = false;
    }, 180);
    const nextInterval = Math.random() * 7000 + 3000;
    setTimeout(triggerRandomGlitch, nextInterval);
}
triggerRandomGlitch();

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
    requestAnimationFrame(generateNoise);
}

requestAnimationFrame(generateNoise);
