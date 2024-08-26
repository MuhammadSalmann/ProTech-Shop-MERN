import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
        query: (order) => ({
            url: ORDERS_URL,
            method: 'POST',
            body: { ...order },
        }),
        }),
        getMyOrders: builder.query({
        query: () => `${ORDERS_URL}/myorders`,
        }),
        getOrderById: builder.query({
        query: (id) => `${ORDERS_URL}/${id}`,
        }),
        updateOrderToPaid: builder.mutation({
        query: (id) => ({
            url: `${ORDERS_URL}/${id}/pay`,
            method: 'PUT',
        }),
        }),
        updateOrderToDelivered: builder.mutation({
        query: (id) => ({
            url: `${ORDERS_URL}/${id}/deliver`,
            method: 'PUT',
        }),
        }),
        getOrders: builder.query({
        query: () => `${ORDERS_URL}`,
        }),
    }),
})

export const {
    useCreateOrderMutation,
    useGetMyOrdersQuery,
    useGetOrderByIdQuery,
    useUpdateOrderToPaidMutation,
    useUpdateOrderToDeliveredMutation,
    useGetOrdersQuery,
} = orderApiSlice;