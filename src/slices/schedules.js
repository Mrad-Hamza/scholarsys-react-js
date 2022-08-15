import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import scheduleService from "../services/schedule.service";


export const allSchedules = createAsyncThunk(
    "schedules/allSchedules",
    async (thunkAPI) => {
        try {
            const response = await scheduleService.getAllSchedules()
            return response ;
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



const initialState = { schedules: [] };

const schedulesSlice = createSlice({
    name: "schedules",
    initialState,
    extraReducers: {
        [allSchedules.fulfilled]: (state, action) => {
            state.schedules = action.payload;
        },
        [allSchedules.rejected]: (state, action) => {
            state.schedules = [];
        }
    },
});

const { reducer } = schedulesSlice;
export default reducer;

