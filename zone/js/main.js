import { Renderer } from './Renderer.js';
import { NoiseOverlay } from './NoiseOverlay.js';
import { AnimationState } from './AnimationState.js';
import { Glitch } from './glitch.js';
import { Leds } from './Leds.js';
import { Plate } from './Plate.js';
import { Switcher } from './Switcher.js';
import { Terminal } from './Terminal.js';
import { Audio } from './Audio.js';

const state = new AnimationState();
const glitch = new Glitch(state);
const renderer = new Renderer();
const noiseOverlay = new NoiseOverlay(state, 'noise-overlay');
const leds = new Leds(state, 'led-row');
const plate = new Plate('dashboard-plate');
const audio = new Audio(state, 'audio');
const switcher = new Switcher(state, 'switcher');
switcher.addEventListener('buttonpress', (e) => {
  audio.click('on');
});
switcher.addEventListener('buttonrelease', (e) => {
  audio.click('off');
});
const terminal = new Terminal(state, 'terminal');

renderer.register(noiseOverlay);
renderer.register(glitch);
renderer.register(leds);
renderer.register(plate);

renderer.start();
