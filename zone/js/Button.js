export class Button extends EventTarget {
  constructor(el) {
    super();
    el.querySelectorAll('label').forEach((label) => {
      label.addEventListener('pointerdown', () => {
        const event = new CustomEvent('buttonpress');
        this.dispatchEvent(event);
      });
      label.addEventListener('pointerup', () => {
        const event = new CustomEvent('buttonrelease');
        this.dispatchEvent(event);
      });
    });
  }
}