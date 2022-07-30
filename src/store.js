import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import usersReducer from "./slices/users"

const reducer = {
    auth: authReducer,
    message: messageReducer,
    users: usersReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;
