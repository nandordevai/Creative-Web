export class Manual {
  constructor(id) {
    const parent = document.getElementById(id);
    this.pages = parent.querySelectorAll('.page');
    this.pages.forEach((page) => {
      page.addEventListener('click', (event) => {
        this.handleClick(event);
      });
    });
  }

  handleClick(event) {
    if (!event.currentTarget.classList.contains('open')) {
      this.pages.forEach((page) => {
        page.classList.add('open');
      });
    } else {
      if (event.currentTarget.classList.contains('top')) {
        this.pages.forEach((page) => {
          page.classList.remove('open');
        });
      } else {
        this.pages.forEach((page) => {
          page.classList.toggle('top');
        });
      }
    }
  }
}