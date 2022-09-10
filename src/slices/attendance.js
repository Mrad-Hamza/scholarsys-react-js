import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import attendanceService from "../services/attendance.service";


export const allAttendances = createAsyncThunk(
    "attendances/allAttendances",
    async (id, thunkAPI) => {
        try {
            const response = await attendanceService.getAllBySessionId(id)
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



const initialState = { attendances: [] };

const attendancesSlices = createSlice({
    name: "attendances",
    initialState,
    extraReducers: {
        [allAttendances.fulfilled]: (state, action) => {
            state.attendances = action.payload;
        },
        [allAttendances.rejected]: (state, action) => {
            state.attendances = [];
        }
    },
});

const { reducer } = attendancesSlices
export default reducer;

