import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import subjectService from "../services/subject.service";


export const allSubjects = createAsyncThunk(
    "subjects/allSubjects",
    async (thunkAPI) => {
        try {
            const response = await subjectService.getAllSubjects()
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



const initialState = { subjects: [] };

const subjectsSlice = createSlice({
    name: "subjects",
    initialState,
    extraReducers: {
        [allSubjects.fulfilled]: (state, action) => {
            state.subjects = action.payload;
        },
        [allSubjects.rejected]: (state, action) => {
            state.subjects = [];
        }
    },
});

const { reducer } = subjectsSlice;
export default reducer;

