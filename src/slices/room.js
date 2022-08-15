import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import roomService from "../services/room.service";


export const allRooms = createAsyncThunk(
    "rooms/allRooms",
    async (thunkAPI) => {
        try {
            const response = await roomService.getAllRooms()
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



const initialState = { rooms: [] };

const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    extraReducers: {
        [allRooms.fulfilled]: (state, action) => {
            state.rooms = action.payload;
        },
        [allRooms.rejected]: (state, action) => {
            state.rooms = [];
        }
    },
});

const { reducer } = roomsSlice;
export default reducer;

