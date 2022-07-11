import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userIsLoggedIn: false,
        userRequested:null,
    },  
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(postLogin.fulfilled, (state, action) => {
                if (action.payload.error) {
                    state.isLoggedIn = false;
                    state.user = null;
                    state.errorMessage = action.payload.message;
                } else {
                    state.isLoggedIn = true;
                    state.user = action.payload;
                }
            })
            .addCase(postLogin.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                if (action.payload.error) {
                    state.userRequested = null;
                    state.errorMessage = action.payload.message;
                } else {
                    state.userRequested = action.payload;
                }
            })
            .addCase(getUser.rejected, (state) => {
                state.userRequested = null;
            });

        
        
    }
});

export const { logout } = userSlice.actions;

export const postLogin = createAsyncThunk('/postLogin', async (credentials) => {

    const loginFetch = await fetch('http://localhost:7500/login',{
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            email:credentials.username,
            password:credentials.password,
        }),
    });
    const userData = await loginFetch.json();
    if (loginFetch.status === 200){
        return userData;
    } else {
        return {
            error: true,
            message: userData.error.message,
        }
    }
});

export const getUser = createAsyncThunk('/profile/username',async(username) =>{
    const userFetch = await fetch(`http://localhost:7500/profile/${username}`);
    const userData = await userFetch.json();
    if(userFetch.status === 200){
        return userData;
    }else{
        return{
            error:true,
            message:userData.error.message,
        }
    }
})




export const createUser = createAsyncThunk('/createUser', async(newUserData) => {
    const newUserFetch = await fetch('http://localhost:7500/register',{
        method: 'POST',
        headers: {
            "Content-type":"application/json",
        },
        body: JSON.stringify({
            name: newUserData.username,
            email: newUserData.email,
            password: newUserData.password,
            photo: newUserData.img,
        }),
    });
    if(newUserFetch.status === 200){
        return newUserFetch;
    } else {
        return {
            error: true,
            message: newUserData.error.message
        }
    }
})

export default userSlice.reducer;
