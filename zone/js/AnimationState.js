export class AnimationState {
  constructor() {
    this.values = {};
    this.listeners = [];
  }

  update(key, value) {
    this.values[key] = value;
    this.listeners.forEach(callback => callback(this.values));
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }
}