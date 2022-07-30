import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";


import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
    "auth/register",
    async ({ username, firstname, password, lastname, mailAddress }, thunkAPI) => {
        try {
          /*   console.log(username, firstname, password, lastname, mailAddress)
            const response = await AuthService.register(username, firstname, password, lastname, mailAddress);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data; */
        } catch (error) {
            /* const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(); */
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ mailAddress, password }, thunkAPI) => {
        try {
          /*   console.log(mailAddress, password)
            const data = await AuthService.login(mailAddress, password);
            return { user: data }; */
        } catch (error) {
      /*       const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(error.response.data));
            return thunkAPI.rejectWithValue(); */
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

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
            state.user = action.payload.user;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

const { reducer } = authSlice;
export default reducer;
