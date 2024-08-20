import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] };

const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.cartItems.find((i) => i._id === item._id);
            if (existingItem) {
                state.cartItems = state.cartItems.map((i) => i._id === existingItem._id ? item : i);
                // existingItem.qty += item.qty;
            } else {
                state.cartItems = [...state.cartItems, item];
                // state.cartItems.push(item);
            }
            // Calculate total price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
            // Calculate Shipping price (if total price is less than 100, shipping price is 10, otherwise 0)
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
            // Calculate Tax price (15% of total price)
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
            // Calculate Total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart(state, action) {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((i) => i.id !== id);
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