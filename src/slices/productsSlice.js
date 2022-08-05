import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: ''
};

export const loadProducts = createAsyncThunk(
    'products/loadProducts',

    async (category_id) => {
        const url = 'http://localhost:4000/products?category_id=' + category_id;
        const response = await axios.get(url);
        return response.data;
    }
)

export const productsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: {
        [loadProducts.pending]: (state) => {
            state.loading = true;
            state.error = '';
        },
        [loadProducts.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
        },
        [loadProducts.rejected]: (state) => {
            state.loading = false;
            state.error = 'Errore nel recupero dei prodotti';
        },
    }
})

export default productsSlice.reducer;