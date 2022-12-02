import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../untils/GetConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cartslice',
    initialState: [],
    reducers: {
      setCartSlice:(state, action)=>{
        return action.payload;
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api.academlo.tech/api/v1/cart`,getConfig())
        .then(res => dispatch(setCartSlice(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const createCartThunk = (productsInCart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(`https://e-commerce-api.academlo.tech/api/v1/cart`,productsInCart,getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch(error=>console.log(error.response.data))
        .finally(() => dispatch(setIsLoading(false)));
}

export const checkOutThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(`https://e-commerce-api.academlo.tech/api/v1/purchases`,{},getConfig())
        .then(() => dispatch(setCartSlice([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteCartThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`,getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const updateCartThunk = (products) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.patch(`https://e-commerce-api.academlo.tech/api/v1/cart`,products,getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}
export const { setCartSlice  } = cartSlice.actions;

export default cartSlice.reducer;
