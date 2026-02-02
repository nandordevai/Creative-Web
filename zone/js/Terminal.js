export class Terminal {
  constructor(state, id) {
    this.el = document.getElementById(id);
    this.state = state;
    this.stream = 0;
    this.state.subscribe((newState) => this.onStateChange(newState));
  }

  onStateChange(state) {
    if (state.terminalStream === this.stream) return;

    this.el.style.setProperty(
      '--terminal-bg-opacity',
      0
    );
    setTimeout(() => {
      this.el.style.setProperty(
        '--terminal-bg-img',
        `url('../img/${state.terminalStream}.jpeg')`
      );
      this.el.style.setProperty(
        '--terminal-bg-opacity',
        1
      );
    }, 200);
    this.stream = state.terminalStream;
  }
}