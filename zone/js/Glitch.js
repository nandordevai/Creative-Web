export class Glitch {
  constructor(state) {
    this.state = state;
    this.timeUntilNextGlitch = 1;
  }

  update(deltaTime) {
    this.timeUntilNextGlitch -= deltaTime;
    if (this.timeUntilNextGlitch <= 0) {
      this.triggerRandomGlitch();
      this.timeUntilNextGlitch = 3.0 + Math.random() * 3.0;
    }
  }

  triggerRandomGlitch() {
    this.state.update('isGlitching', true);

    setTimeout(() => {
      this.state.update('isGlitching', false);
    }, 200 + Math.random() * 600);
  }
}