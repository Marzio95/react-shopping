import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: ''
}

export const loadCategories = createAsyncThunk(
    'categories/loadCategories',

    async () => {
        const url = 'http://localhost:4000/categories';
        const response = await axios.get(url);
        return response.data;
    }
)

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: {
        [loadCategories.pending]: (state) => {
            state.loading = true;
            state.error = '';
        },
        [loadCategories.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
        },
        [loadCategories.rejected]: (state) => {
            state.loading = false;
            state.error = 'Errore ';
        },
    }
})

// export const getCategoryIdByName = () => (state) => {} questa è un arrow function senza parametri

export const getCategoryIdByName = name => store => {  // nelle arrow function si passano così i parametri con il nome della proprietà poi un altra arrow function
    return store.categories.data.find( cat => cat.name.toLowerCase() === name.toLowerCase())?.id // il punto interrogativo è perchè se non trovo niente non mi restituisce errore
                                                                    // è un try catch in line come in java ad una chiamata al DB
}


export default categoriesSlice.reducer;