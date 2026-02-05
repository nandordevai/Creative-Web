import { AudioModule } from './AudioModule.js';

export class Distortion extends AudioModule {
  constructor(ctx, amount = 50) {
    super(ctx, 'Distortion');

    // input/drive stage, overdrives the shaper
    this.input = ctx.createGain();
    this.input.gain.value = 10;

    this.shaper = ctx.createWaveShaper();
    this.shaper.oversample = '4x';

    this.output = ctx.createGain();

    this.input.connect(this.shaper);
    this.shaper.connect(this.output);

    this.setAmount(amount);
  }

  // amount 0 to 2000+ (0: clean, 1000: heavy)
  setAmount(amount) {
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;

    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      // Sigmoid distortion algorithm
      curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }

    this.shaper.curve = curve;
  }
}