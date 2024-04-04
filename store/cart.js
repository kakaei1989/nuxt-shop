import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";

const toast = useToast();

export const useCartStore = defineStore('cart', {
    state: () => {
        return {
            cart: []
        }
    },

    getters: {
        count(state) {
            return state.cart.length
        },
        allItems(state) {
            return state.cart
        },
        totalAmount(state) {
            return state.cart.reduce((total, product) => {
                return product.is_sale ? total + (product.sale_price * product.qty) : total + (product.price * product.qty)
            }, 0)
        }
    },

    actions: {
        addToCart(product, count) {
            this.cart.push({
                ...product,
                qty: count
            })

            toast.success('محصول به سبد خرید اضافه شد')
        },

        increment(id) {
            const item = this.cart.find(p => p.id == id);

            if (item) {
                item.qty++
            }
        },

        decrement(id) {
            const item = this.cart.find(p => p.id == id);

            if (item) {
                if (item.quantity > 1) {
                    item.qty--
                }
            }
        },

        remove(id) {
            this.cart = this.cart.filter(p => p.id != id);
        },

        clear() {
            this.cart = [];
        }
    },

    persist: {
        storage: persistedState.localStorage,
        key: 'shopping-cart'
    },
})