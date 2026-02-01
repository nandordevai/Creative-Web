export class Camera {
  constructor(id) {
    const el = document.getElementById(id);
    el.querySelectorAll('input').forEach((input) => {
      input.addEventListener('change', (e) => {
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty(
          '--terminal-bg-opacity',
          0
        );
        setTimeout(() => {
          rootStyle.setProperty(
            '--terminal-bg-img',
            `url('../img/${e.target.value}.jpeg')`
          );
          rootStyle.setProperty(
            '--terminal-bg-opacity',
            1
          );
        }, 200);
      });
    });
  }
}