import { defineStore } from 'pinia';

export const useStore = defineStore('example', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++;
    }
  }
});