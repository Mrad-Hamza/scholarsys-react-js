import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";


import AuthService from "../services/auth.service";

const token = localStorage.getItem('token')


export const register = createAsyncThunk(
    "auth/register",
    async ({ email, password, name }, thunkAPI) => {
        try {
            const response = await AuthService.register(email, password, name);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
                const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(); 
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await AuthService.login(email, password);
            return { data: data };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(error.response.data));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

const initialState = token
    ? { isLoggedIn: true, user: JSON.parse(localStorage.getItem("user")) , accessToken:localStorage.getItem("token")}
    : { isLoggedIn: false, user: null, accessToken: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
        },
        [register.rejected]: (state, action) => {
            state.isLoggedIn = false;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.data.user;
            state.accessToken = action.payload.data.accessToken
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.accessToken = null
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.accessToken = null
        },
    },
});

const { reducer } = authSlice;
export default reducer;
