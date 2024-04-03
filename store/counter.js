import { defineStore } from 'pinia';

export const useCounter = defineStore('counter', {
    state: () => {
        return {
            count: 0
        }
    },

    actions: {
        increment(value) {
            this.count += value;
        },
        decrement(value) {
            this.count -= value;
        }
    }
})