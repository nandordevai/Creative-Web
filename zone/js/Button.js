export class Button extends EventTarget {
  constructor(el) {
    super();
    el.addEventListener('pointerdown', () => {
      const event = new CustomEvent('buttonpress');
      this.dispatchEvent(event);
    });
    el.addEventListener('pointerup', () => {
      const event = new CustomEvent('buttonrelease');
      this.dispatchEvent(event);
    });
  }
}