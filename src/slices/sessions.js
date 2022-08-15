import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import sessionService from "../services/session.service";


export const allSessions = createAsyncThunk(
    "sessions/allSessions",
    async (thunkAPI) => {
        try {
            const response = await sessionService.getAllSessions()
            return response;
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



const initialState = { sessions: [] };

const scessionsSlice = createSlice({
    name: "sessions",
    initialState,
    extraReducers: {
        [allSessions.fulfilled]: (state, action) => {
            state.sessions = action.payload;
        },
        [allSessions.rejected]: (state, action) => {
            state.sessions = [];
        }
    },
});

const { reducer } = scessionsSlice;
export default reducer;

