import { apiSlice } from './apiSlice';
import { PRODUCTS_URL } from '../constants';
import { updateProduct } from '../../../backend/controllers/productController';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            providesTags: ['Product'], // For update funcitonality and not have to reload the page
            keepUnusedDataFor: 5,
        }),
        getProductDetail: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product'], // stops from being cached  after creating a new product so only the new product is fetched
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
              url: `${PRODUCTS_URL}/${productId}`,
              method: 'DELETE',  
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailQuery, useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation } = productsApiSlice;