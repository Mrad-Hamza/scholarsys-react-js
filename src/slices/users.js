import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import userService from "../services/user.service"; 

export const allUsers = createAsyncThunk(
    "users/allUsers",
    async (thunkAPI) => {
        try {
          /*   const response = await userService.getAllUsers()
            return {users : response.data}; */
        } catch (error) {
           /*  const message =
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

const initialState = {users : []};

const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: {
        [allUsers.fulfilled]: (state, action) => {
            state.users = action.payload.users;
        },
        [allUsers.rejected]: (state, action) => {
            state.users = [];
        }
    },
});

const { reducer } = usersSlice;
export default reducer;

