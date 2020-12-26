export default class EventEmitter {
  constructor() {
    this.handlers = {};
  }

  on(type, handler) {
    if (typeof this.handlers[type] === 'undefined') {
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
  }

  emit(type, data) {
    const handlers = this.handlers[type] || [];
    handlers
      .filter(handler => handler)
      .map(handler => {
      handler.call(this, data);
    });
  }
}
