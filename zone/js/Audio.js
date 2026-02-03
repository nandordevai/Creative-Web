import { Clicker, Drift, DroneOsc, Filter, NoiseOsc, Reverb } from './modules/index.js';

export class Audio {
  constructor(state, id) {
    this.state = state;
    this.initialized = false;
    this.el = document.getElementById(id);
    const button = this.el.querySelector('#audio-button');
    button.addEventListener('change', (e) => { this.onChange(e); });
    this.runningModules = [];
    this.state.subscribe((newState) => this.onStateChange(newState));
  }

  onStateChange(state) {
    if (!this.glitchNoise) return;

    this.glitchNoise.level = state.isGlitching ? 0.5 : 0;
  }

  onChange(e) {
    if (e.target.checked) {
      if (!this.initialized) this.initialize();
      this.masterGain.gain.value = 1;
    } else {
      this.masterGain.gain.value = 0;
    }
  }

  async initialize() {
    this.audioCtx = new AudioContext();
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.value = 0.05;
    this.masterGain.connect(this.audioCtx.destination);

    const noiseFilter = new Filter(this.audioCtx);
    noiseFilter.frequency = 400;
    noiseFilter.Q = 10;

    const noiseFilterDrift = new Drift(this.audioCtx);
    noiseFilterDrift.level = 200;
    this.runningModules.push(noiseFilterDrift);
    noiseFilterDrift.connect(noiseFilter.filter.frequency);

    const noise = new NoiseOsc(this.audioCtx);
    noise.connect(noiseFilter);
    noiseFilter.connect(this.masterGain);

    const drone = new DroneOsc(this.audioCtx);

    const droneFilter = new Filter(this.audioCtx);
    droneFilter.frequency = 800;
    droneFilter.Q = 10;
    drone.connect(droneFilter);

    const droneFilterDrift = new Drift(this.audioCtx);
    droneFilterDrift.level = 200;
    this.runningModules.push(droneFilterDrift);
    droneFilterDrift.connect(droneFilter.filter.frequency);

    const reverb = new Reverb(this.audioCtx);
    await reverb.loadIR('./audio/r1_ortf.wav');
    reverb.mix = 0.7;
    droneFilter.connect(reverb);
    reverb.connect(this.masterGain);

    this.glitchNoise = new NoiseOsc(this.audioCtx);
    this.glitchNoise.level = 0;
    this.glitchNoise.connect(this.masterGain);

    this.clicker = new Clicker(this.audioCtx);
    await this.clicker.load([
      './audio/click-on.wav',
      './audio/click-off.wav',
    ]);
    this.clicker.connect(this.masterGain);

    this.tick();
  }

  click(state) {
    this.clicker.play(state);
  }

  tick() {
    this.runningModules.forEach((module) => {
      module.update();
    });
    requestAnimationFrame(this.tick.bind(this));
  }
}