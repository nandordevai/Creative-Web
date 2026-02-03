import { AudioModule } from './AudioModule.js';

export class Drift extends AudioModule {
  constructor(ctx) {
    super(ctx, 'Drift');
    this.node = ctx.createConstantSource();
    this.node.start();
    this.output = this.node;
    this.lookAhead = 0.1;
    this.nextEventTime = ctx.currentTime;
    this.level = 0;
  }

  update() {
    // Only pick a new target if we've reached a certain threshold of time
    // or use a simple timer.
    const now = this.ctx.currentTime;

    if (now >= this.nextEventTime) {
      const base = Math.random() * 2 - 1; // -1 -> 1
      const targetValue = base * this.level;
      const duration = Math.random() * 3 + 1; // Time until we pick the NEXT target

      // setTargetAtTime(target, startTime, timeConstant)
      // timeConstant is the "smoothness".
      // 0.1 is fast, 1.0 is very slow/heavy.
      const timeConstant = duration / 3;

      this.node.offset.setTargetAtTime(targetValue, now, timeConstant);

      this.nextEventTime = now + duration;
    }
  }
}
