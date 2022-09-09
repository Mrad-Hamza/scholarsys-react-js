import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import userService from "../services/user.service"; 

export const allUsers = createAsyncThunk(
    "users/allUsers",
    async (thunkAPI) => {
        try {
             const response = await userService.getAllUsers()
            return {users : response.data}; 
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

export const allAgents = createAsyncThunk(
    "users/allAgents",
    async (thunkAPI) => {
        try {
            const response = await userService.getAgents()
            return { agents: response.data };
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


export const allTeachers = createAsyncThunk(
    "users/allTeachers",
    async (thunkAPI) => {
        try {
            const response = await userService.getTeachers()
            return { teachers: response.data };
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

export const allStudents = createAsyncThunk(
    "users/allStudents",
    async (thunkAPI) => {
        try {
            const response = await userService.getStudents()
            return { students: response.data };
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

export const allStudentsByClasseId = createAsyncThunk(
    "users/allStudentsByClasseId",
    async (id,thunkAPI) => {
        try {
            const response = await userService.getStudentsByClasseId(id)
            //console.log(response)
            return { students: response };
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



const initialState = {users : [], students: [], agents: [], teachers : []};

const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: {
        [allUsers.fulfilled]: (state, action) => {
            state.users = action.payload.users;
        },
        [allUsers.rejected]: (state, action) => {
            state.users = [];
        },
        [allAgents.fulfilled]: (state, action) => {
            state.agents = action.payload.agents;
        },
        [allAgents.rejected]: (state, action) => {
            state.agents = [];
        },
        [allTeachers.fulfilled]: (state, action) => {
            state.teachers = action.payload.teachers;
        },
        [allTeachers.rejected]: (state, action) => {
            state.teachers = [];
        },
        [allStudents.fulfilled]: (state, action) => {
            state.students = action.payload.students;
        },
        [allStudents.rejected]: (state, action) => {
            state.students = [];
        },
        [allStudentsByClasseId.fulfilled]: (state, action) => {
            state.students = action.payload.students;
        },
        [allStudentsByClasseId.rejected]: (state, action) => {
            state.students = [];
        }
    },
});

const { reducer } = usersSlice;
export default reducer;

