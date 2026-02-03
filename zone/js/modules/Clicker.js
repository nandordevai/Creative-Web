import { AudioModule } from './AudioModule.js';

export class Clicker extends AudioModule {
  constructor(ctx) {
    super(ctx, 'Clicker');
  }

  async load([on, off]) {
    let response = await fetch(on);
    let arrayBuffer = await response.arrayBuffer();
    this.onBuffer = await this.ctx.decodeAudioData(arrayBuffer);
    response = await fetch(off);
    arrayBuffer = await response.arrayBuffer();
    this.offBuffer = await this.ctx.decodeAudioData(arrayBuffer);
  }

  play(state) {
    if (!this.onBuffer || !this.offBuffer) return;

    const source = this.ctx.createBufferSource();
    source.buffer = state === 'on' ? this.onBuffer : this.offBuffer;
    source.connect(this.output);
    source.start(this.ctx.currentTime);
  }
}