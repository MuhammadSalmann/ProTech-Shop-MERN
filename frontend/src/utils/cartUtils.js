export const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const updateCart = (state) => {
    // Calculate total price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    // Calculate Shipping price (if total price is less than 100, shipping price is 10, otherwise 0)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    // Calculate Tax price (15% of total price)
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
    // Calculate Total price
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}