import { observe } from './resizer.js'

export class Manual {
  constructor(id) {
    this.parent = document.getElementById(id);
    this.pages = this.parent.querySelectorAll('.page');
    this.top = this.calculateTop();
    this.pages.forEach((page) => {
      page.addEventListener('click', (event) => {
        this.handleClick(event);
      });
    });
    observe(document.body, () => {
      this.handleResize();
    });
    this.isOpen = false;
  }

  handleResize() {
    this.top = this.calculateTop();
    if (this.isOpen) {
      this.moveUp();
    }
  }

  moveUp() {
      this.parent.style.setProperty('--ty', `translateY(calc(4vh - ${this.top}px))`);
  }

  calculateTop() {
    const rect = this.parent.getBoundingClientRect();
    return rect.top;
  }

  handleClick(event) {
    if (!event.currentTarget.classList.contains('open')) {
      this.open();
    } else {
      if (event.currentTarget.classList.contains('top')) {
        this.close();
      } else {
        this.switch();
      }
    }
  }

  switch() {
    this.pages.forEach((page) => {
      page.classList.toggle('top');
    });
  }

  open() {
    this.pages.forEach((page) => {
      page.classList.add('open');
    });
    this.moveUp();
    this.isOpen = true;
  }

  close() {
    this.pages.forEach((page) => {
      page.classList.remove('open');
    });
    this.parent.style.setProperty('--ty', 'translateY(0)');
    this.isOpen = false;
  }
}