import { Renderer } from './Renderer.js';
import { NoiseOverlay } from './NoiseOverlay.js';
import { AnimationState } from './AnimationState.js';
import { Glitch } from './glitch.js';

const state = new AnimationState();
const glitch = new Glitch(state);
const renderer = new Renderer();
const noiseOverlay = new NoiseOverlay('noise-overlay', state);

renderer.register(noiseOverlay);
renderer.register(glitch);

renderer.start();
