export class Glitch {
  constructor(state) {
    this.state = state;
    this.state.update('glitchLvl', 0);
  }

  update(deltaTime) {
    // const lfo1 = this.lfo(0.23, 0.2, 0, true);
    // const lfo2 = this.lfo(0.19, 0.8, 0, true);
    // this.state.update('glitchLvl', lfo1 + lfo2);

    let level = this.lfo(0.1, 0.9, 0, true);
    const jitter = (Math.random() - 0.5) * 0.2;
    level += jitter;
    this.state.update('glitchLvl', level);
    // console.log(level)
    if (this.state.values.glitchLvl > 0.9) {
      this.triggerRandomGlitch();
    }
  }

  lfo(freq = 1, amp = 1, offset = 0, unipolar = false) {
    const t = Date.now() / 1000;
    let wave = Math.sin(2 * Math.PI * freq * t);
    if (unipolar) {
      wave = (wave + 1) * 0.5;
    }
    return offset + (wave * amp);
  }


  triggerRandomGlitch() {
    this.state.update('isGlitching', true);

    setTimeout(() => {
      this.state.update('isGlitching', false);
    }, 200 + Math.random() * 600);
  }
}