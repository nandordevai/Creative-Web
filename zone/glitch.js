const glitchElement = document.querySelector('.glitch');

function triggerRandomGlitch() {
    glitchElement.classList.add('heavy-glitch');
    setTimeout(() => {
        glitchElement.classList.remove('heavy-glitch');
    }, 180);
    const nextInterval = Math.random() * 7000 + 3000;
    setTimeout(triggerRandomGlitch, nextInterval);
}
triggerRandomGlitch();
