import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import pointsReducer from './slices/pointsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        points: pointsReducer
    }
});