import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        success: false,
        themes: [],
        theme: []
    },
    reducers: {
        cleanState: (state) => {
            state.success = false;
            state.themes = null;
        }
    },
    extraReducers(builder){
        builder
        .addCase(getAllThemes.fulfilled,(state,action) =>{
            if(action.payload.error){
                state.themes = [];
                state.errorMessage = action.payload.message;
            }else{
                state.themes = action.payload;
            }
        })
        .addCase(getAllThemes.rejected, (state) => {
            state.themes = [];
        })
        builder
        .addCase(getThemeByName.rejected,(state)=>{
            state.theme = null;
        })
        .addCase(getThemeByName.fulfilled,(state,action) =>{
            if(action.payload.error){
                state.theme = null;
                state.errorMessage = action.payload.message;
            }else{
                state.theme = action.payload;
            }
        })
    }
});

export const {cleanState} = themeSlice.actions;

export const createTheme = createAsyncThunk('/themes',async(newThemeData) =>{
    const newThemeFetch = await fetch('http://localhost:7500/themes',{
        method: 'POST',
        headers: {
            "Content-type":"application/json",
        },
        body: JSON.stringify({
            name: newThemeData.name,
            descripcion: newThemeData.descripcion,
            photo: newThemeData.photo,
        }),
    });
    const themeData = await newThemeFetch.json();
    console.log("status: ",newThemeFetch.status);
    if(newThemeFetch.status === 200){
        return themeData;
    } else {
        return {
            error: true,
            message: newThemeData.error.message,
        }
    }
});

export const getAllThemes = createAsyncThunk('/themes/themeName',async() =>{
    const themesFetch = await fetch('http://localhost:7500/themes');
    const themesData = await themesFetch.json();
    if (themesFetch.status === 200){
        return themesData;
    } else {
        return {
            error: true,
            message: themesData.error.message,
        }
    }
});

export const getThemeByName = createAsyncThunk('/themes',async(themeName) => {
    const themeFetch = await fetch(`http://localhost:7500/themes/${themeName}`);
    const themeData = await themeFetch.json();
    if(themeFetch.status === 200){
        return themeData;
    }else{
        return{
            error:true,
            message:themeData.error.message,
        }
    }
}
)

export default themeSlice.reducer;