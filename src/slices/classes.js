import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import classeService from "../services/classe.service";


export const allClasses = createAsyncThunk(
    "classes/allClasses",
    async (thunkAPI) => {
        try {
            const response = await classeService.getAllClasses()
            return  response ;
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



const initialState = { classes: [] };

const classesSlice = createSlice({
    name: "classes",
    initialState,
    extraReducers: {
        [allClasses.fulfilled]: (state, action) => {
            state.classes = action.payload;
        },
        [allClasses.rejected]: (state, action) => {
            state.classes = [];
        }
    },
});

const { reducer } = classesSlice;
export default reducer;

