import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { cartService } from "../services/cartService";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: ''
}

export const loadCart = createAsyncThunk(
    'cart/loadCart',

    async () => {
        // const url = 'http://localhost:4000/cart';
        // const response = await axios.get(url);
        const response = await cartService.load();
        return response.data;
    }
)

export const delCart = createAsyncThunk(
    'cart/delCart',

    async (id) => {
        // const url = 'http://localhost:4000/cart/' + id;
        // const response = await axios.delete(url);
        const response = await cartService.del(id);
        console.log(response);
        return id;
    }
)

export const addCart = createAsyncThunk(
    'cart/addCart',

    async (product) => {

        let newProduct = {
            "product_id": product.id,
            "title": product.title,
            "price": product.price,
            "image": product.image,
            "qty": 1
        }

        // const url = 'http://localhost:4000/cart/';
        // const response = await axios.post(url, newProduct);
        const response = await cartService.add(newProduct);
        console.log(response);
        return response.data;
    }
)

export const updateCart = createAsyncThunk(
    'cart/updateCart',

    async (payload) => {

        let newProduct = {
            ...payload.product,
            "qty": payload.qty
        }

        const response = await cartService.update(newProduct);
        console.log(response);
        return response.data;
    }
)

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: {
        [loadCart.pending]: (state) => {
            state.loading = true;
            state.error = '';
        },
        [loadCart.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
        },
        [loadCart.rejected]: (state) => {
            state.loading = false;
            state.error = 'Errore ';
        },

        [delCart.pending]: (state) => {
            state.loading = true;
            state.error = '';
        },
        [delCart.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.data = state.data.filter(el => el.id !== payload);
        },
        [delCart.rejected]: (state) => {
            state.loading = false;
            state.error = 'Errore ';
        },

        [addCart.pending]: (state) => {
            state.loading = true;
            state.error = '';
        },
        [addCart.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.data = [...state.data, payload];
        },
        [addCart.rejected]: (state) => {
            state.loading = false;
            state.error = 'Errore ';
        },

        [updateCart.pending]: (state) => {
            state.loading = true;
            state.error = '';
        },
        [updateCart.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.data = state.data.map(el => el.id === payload.id ? payload : el);
        },
        [updateCart.rejected]: (state) => {
            state.loading = false;
            state.error = 'Errore ';
        },
    }

    
})

export const getAllCart = () => store => {
    return store.cart.data;
}

export const productInCart = (product) => store => {
    const index = store.cart.data.findIndex(el => el.id === product.id);
    return index >= 0 ? true : false;
}

export const getTotalCart = () => store => {
    return store.cart.data.reduce((total, el) => total += (el.qty * el.price), 0)
}

export default cartSlice.reducer;