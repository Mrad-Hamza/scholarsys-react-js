import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import userService from "../services/user.service";

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

export const update = createAsyncThunk(
    "auth/update",
    async (data, thunkAPI) => {
        try {
            const res = await userService.editUser(data.id, data.firstname, data.lastname, data.email, data.password, data.birthDate, data.phoneNumber, data.salary)
            return res;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
                console.log(error)
            thunkAPI.dispatch(setMessage(error.response.data));
            return thunkAPI.rejectWithValue();
        }
    }
);

const initialState = token
    ? { isLoggedIn: true, user: JSON.parse(localStorage.getItem("user")), accessToken: localStorage.getItem("token") }
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
        [update.fulfilled]: (state, action) => {
            state.user.firstname = action.meta.arg.firstname
            state.user.lastname = action.meta.arg.lastname
            state.user.phoneNumber = action.meta.arg.phoneNumber
            state.user.email = action.meta.arg.email
            state.user.birthDate = action.meta.arg.birthDate
        },
        [update.rejected]: (state, action) => {
            console.log(state, action)
            console.log("nononononono")
        }
    },
});

const { reducer } = authSlice;
export default reducer;
