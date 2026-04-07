import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../store/AuthSlice'
import PostReducer from '../store/PostSlice'
import socketReducer from '../features/socketSlice'
export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        post:PostReducer,
        socket: socketReducer,
      },
})