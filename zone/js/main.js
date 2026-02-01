import { Renderer } from './Renderer.js';
import { NoiseOverlay } from './NoiseOverlay.js';
import { AnimationState } from './AnimationState.js';
import { Glitch } from './glitch.js';
import { Leds } from './Leds.js';
import { Dashboard } from './Dashboard.js';
import { Camera } from './Camera.js';

const state = new AnimationState();
const glitch = new Glitch(state);
const renderer = new Renderer();
const noiseOverlay = new NoiseOverlay(state, 'noise-overlay');
const leds = new Leds(state, 'led-row');
const dashboard = new Dashboard('dashboard-plate');
const camera = new Camera('switcher');

renderer.register(noiseOverlay);
renderer.register(glitch);
renderer.register(leds);
renderer.register(dashboard);

renderer.start();
