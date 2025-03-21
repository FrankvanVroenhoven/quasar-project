import { reactive } from "vue";

export const eventBus = reactive({
  listeners: {},
  
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  },
  
  emit(event, payload) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(payload));
    }
  }
});
