export class Switcher extends EventTarget {
  constructor(state, id) {
    super();
    this.state = state;
    const el = document.getElementById(id);
    el.querySelectorAll('.button label').forEach((label) => {
      label.addEventListener('pointerdown', () => {
        const event = new CustomEvent('buttonpress');
        this.dispatchEvent(event);
      });
      label.addEventListener('pointerup', () => {
        const event = new CustomEvent('buttonrelease');
        this.dispatchEvent(event);
      });
    });
    el.querySelectorAll('input').forEach((input) => {
      input.addEventListener('change', (e) => {
        state.update('terminalStream', e.target.value);
      });
    });
  }
}