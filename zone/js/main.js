import { Renderer } from './Renderer.js';
import { NoiseOverlay } from './NoiseOverlay.js';
import { AnimationState } from './AnimationState.js';
import { Glitch } from './Glitch.js';
import { Leds } from './Leds.js';
import { Plate } from './Plate.js';
import { Switcher } from './Switcher.js';
import { Terminal } from './Terminal.js';
import { Audio } from './Audio.js';
import { Button } from './Button.js';
import { Manual } from './Manual.js';

const state = new AnimationState();
const glitch = new Glitch(state);
const renderer = new Renderer();
const noiseOverlay = new NoiseOverlay(state, 'noise-overlay');
const leds = new Leds(state, 'led-row');
const plate = new Plate('dashboard-plate');
const audio = new Audio(state, 'audio');
const switcher = new Switcher(state, 'switcher');
const manual = new Manual('manual');
const terminal = new Terminal(state, 'terminal');
terminal.runBootSequence();
document.querySelectorAll('.button').forEach((el) => {
  const button = new Button(el);
  button.addEventListener('buttonpress', () => {
    audio.click('on');
  });
  button.addEventListener('buttonrelease', () => {
    audio.click('off');
  });
  if (el.classList.contains('clrscr')) {
    button.addEventListener('buttonpress', () => {
      terminal.clrscr();
    });
  }
})

renderer.register(noiseOverlay);
renderer.register(glitch);
renderer.register(leds);
renderer.register(plate);
renderer.register(terminal);

renderer.start();

console.log("%c☢️ ANOMALOUS ACCESS DETECTED", "color: red; font-weight: bold;");
console.log(
    "%c SIGNAL RECOVERY SUCCESSFUL %c ACCESS GRANTED: STALKER ",
    "background: #33ff33; color: #000; font-weight: bold; padding: 2px 5px;",
    "background: #000; color: #33ff33; font-weight: bold; padding: 2px 5px; border: 1px solid #33ff33;"
);

console.log('WARNING: Sector 3 Null-Point data is classified. Unauthorized debugging may lead to cognitive staining.');
