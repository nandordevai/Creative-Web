export class Dashboard {
  constructor(id) {
    const canvas = document.getElementById(id);
    const ratio = devicePixelRatio ?? 1;
    this.ctx = canvas.getContext('2d');
    const cw = canvas.parentNode.clientWidth;
    const ch = canvas.parentNode.clientHeight;
    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;
    canvas.width = cw * ratio;
    canvas.height = ch * ratio;
    this.w = canvas.width;
    this.h = canvas.height;
    this.rendered = false;
  }

  render() {
    if (this.rendered) return;

    // 1. Base Metal & Lighting
    const metalGrad = this.ctx.createLinearGradient(0, 0, this.w, this.h);
    metalGrad.addColorStop(0, '#111');
    metalGrad.addColorStop(0.5, '#202020');
    metalGrad.addColorStop(1, '#303030');
    this.ctx.fillStyle = metalGrad;
    this.ctx.fillRect(0, 0, this.w, this.h);

    this.drawChippedPaint('rgba(70, 70, 70, 0.6)');
    this.drawGrime(15);
    this.drawPitting(50);

    // 2. Heavy Scratches (Default)
    this.drawScratches(100);

    // 3. The Fixed Reflection (Lighting)
    // This simulates a light bar reflecting off the surface
    // const lightGrad = this.ctx.createLinearGradient(0, 0, this.w, this.h);
    // lightGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0)');
    // lightGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.15)'); // The "hot" spot
    // lightGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');   // Sharpest highlight
    // lightGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.15)');
    // lightGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0)');

    // this.ctx.globalCompositeOperation = 'screen'; // Brightens the colors underneath
    // this.ctx.fillStyle = lightGrad;
    // this.ctx.fillRect(0, 0, this.w, this.h);
    // this.ctx.globalCompositeOperation = 'source-over';

    // 3. Stamped Label & Serial
    this.drawStampedText("REF: 909-X", 60, this.h - 25, 22, false);

    // 4. Hardware
    const padding = 30;
    this.drawScrew(padding, padding);
    this.drawScrew(this.w - padding, padding);
    this.drawScrew(padding, this.h - padding);
    this.drawScrew(this.w - padding, this.h - padding);

    // 5. Grime & Oxidation Overlay
    this.ctx.globalCompositeOperation = 'multiply';
    this.ctx.fillStyle = 'rgba(70, 70, 70, 0.2)';
    this.ctx.fillRect(0, 0, this.w, this.h);

    this.rendered = true;
  }

  drawChippedPaint(color) {
    this.ctx.save();

    // Draw the full paint layer first
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.w, this.h);

    // Create "Chips" by erasing parts of the paint to show metal
    this.ctx.globalCompositeOperation = 'destination-out';

    for (let i = 0; i < 40; i++) {
      const x = Math.random() * this.w;
      const y = Math.random() * this.h;
      const size = Math.random() * 40 + 10;

      this.ctx.beginPath();
      // Create jagged edges using a small loop for each chip
      this.ctx.moveTo(x, y);
      for (let j = 0; j < 8; j++) {
        this.ctx.lineTo(x + Math.random() * size, y + Math.random() * size);
      }
      this.ctx.closePath();
      this.ctx.fill();
    }

    // Add edge wear (paint rubbing off corners)
    this.ctx.lineWidth = 5;
    this.ctx.strokeRect(0, 0, this.w, this.h);

    this.ctx.restore();
  }

  drawGrime(patchCount) {
    for (let i = 0; i < patchCount; i++) {
      const x = Math.random() * this.w;
      const y = Math.random() * this.h;
      const radius = Math.random() * 100 + 100;

      // Randomly choose between Rust (Brown/Orange) and Dirt (Black/Grey)
      // const isRust = Math.random() > 0.5;
      // const color = isRust ? `rgba(101, 67, 33, ${Math.random() * 0.4})` : `rgba(0, 0, 0, ${Math.random() * 0.3})`;
      const color = `rgba(0, 0, 0, ${Math.random() * 0.2})`;

      const g = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, color);
      g.addColorStop(0.6, color.replace(/[\d.]+\)$/g, '0)')); // Fade out organically

      // this.ctx.globalCompositeOperation = isRust ? 'source-over' : 'multiply';
      this.ctx.globalCompositeOperation = 'multiply';
      this.ctx.fillStyle = g;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalCompositeOperation = 'source-over';
  }

  drawPitting(count) {
    for (let i = 0; i < count; i++) {
      this.ctx.fillStyle = `rgba(60, 60, 60, ${Math.random() * 1})`;
      this.ctx.beginPath();
      this.ctx.arc(Math.random() * this.w, Math.random() * this.h, Math.random() * 3, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  drawScratches(count) {
    for (let i = 0; i < count; i++) {
      this.ctx.beginPath();
      const sx = Math.random() * this.w;
      const sy = Math.random() * this.h;
      const len = Math.random() * 5 + 2;
      const angle = (Math.random() - 0.5) * 2; // Mostly horizontal wear

      this.ctx.moveTo(sx, sy);
      this.ctx.lineTo(sx + len, sy + (len * angle));

      // Randomize scratch depth (color)
      const type = Math.random();
      if (type > 0.8) {
        this.ctx.strokeStyle = "rgba(200, 200, 200, 0.2)"; // Deep gouge
        this.ctx.lineWidth = 0.8;
      } else {
        this.ctx.strokeStyle = "rgba(120, 120, 120, 0.15)"; // Surface scuff
        this.ctx.lineWidth = 0.5;
      }
      this.ctx.stroke();
    }
  }

  drawStampedText(text, x, y, size) {
    this.ctx.font = `bold ${size}px "Courier New", monospace`;
    let curX = x;
    text.split('').forEach(char => {
      this.ctx.save();
      this.ctx.translate(curX, y + (Math.random() - 0.5));
      this.ctx.rotate((Math.random() - 0.5) * 0.05);
      this.ctx.fillStyle = "rgba(0,0,0,0.5)";
      this.ctx.fillText(char, 1, 1);
      this.ctx.fillStyle = "rgba(120,120,120,0.95)";
      this.ctx.fillText(char, 0, 0);
      this.ctx.restore();
      curX += size * 0.65;
    });
  }

  drawScrew(x, y) {
    const size = 14;
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(Math.random() * Math.PI);
    const g = this.ctx.createRadialGradient(-2, -2, 1, 0, 0, size);
    g.addColorStop(0, '#eee');
    g.addColorStop(1, '#111');
    this.ctx.fillStyle = g;
    this.ctx.beginPath(); this.ctx.arc(0, 0, size, 0, Math.PI * 2); this.ctx.fill();
    this.ctx.strokeStyle = "rgba(0,0,0,0.6)";
    this.ctx.lineWidth = 4;
    this.ctx.beginPath(); this.ctx.moveTo(-size + 6, 0); this.ctx.lineTo(size - 6, 0); this.ctx.stroke();
    this.ctx.restore();
  }
}