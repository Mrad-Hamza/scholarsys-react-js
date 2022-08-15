import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import usersReducer from "./slices/users"
import classesReducer from "./slices/classes"
import schedulesReducer from "./slices/schedules"
import subjectsReducer from './slices/subject'
import roomsReducer from './slices/room'
import sessionsReducer from './slices/sessions'

const reducer = {
    auth: authReducer,
    message: messageReducer,
    users: usersReducer,
    classes : classesReducer,
    schedules : schedulesReducer,
    subjects : subjectsReducer,
    rooms : roomsReducer,
    sessions : sessionsReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;
