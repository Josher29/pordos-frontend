import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import themes from "../Utils/theme";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        theme: themes.light,
        language: 'es',
        loading: false,
        promo: "",
    },
    reducers: {
        toLight: (state) => {
            state.theme = themes.light;
        },
        toDark: (state) => {
            state.theme = themes.dark;
        },
        startLoading: (state) => {
            state.loading = true;
        },
        stopLoading: (state) => {
            state.loading = false;
        }
    }
});


export const { toLight, toDark, startLoading, stopLoading } = appSlice.actions;

export default appSlice.reducer;
