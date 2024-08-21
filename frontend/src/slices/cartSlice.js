import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] };

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
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find((i) => i.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
    },
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;