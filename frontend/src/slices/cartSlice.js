import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((i) => i._id === item._id);
            if (existingItem) {
                state.cartItems = state.cartItems.map((i) => i._id === existingItem._id ? item : i);
                // existingItem.qty += item.qty;
            } else {
                state.cartItems = [...state.cartItems, item];
                // state.cartItems.push(item);
            }
            //state = updateCart(state);
            return updateCart(state);
        },
        removeFromCart(state, action) {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((i) => i._id !== id);

            return updateCart(state);
        },
        saveShippingAddress(state, action) {
            state.shippingAddress = action.payload;
            return updateCart(state);
            // we update the cart after saving the shipping address?  Yes, because the shipping address can affect the shipping price
            // and the total price of the cart. So, we need to update the cart after saving the shipping address.
        },
        savePaymentMethod(state, action) {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearCart(state) {
            state.cartItems = [];
            return updateCart(state);
        },
    },
})

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCart } = cartSlice.actions;

export default cartSlice.reducer;