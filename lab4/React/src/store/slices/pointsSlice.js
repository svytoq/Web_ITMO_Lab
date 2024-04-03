import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    points: [],
    currentR: 1
};

const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {
        setPoints(state, action) {
            state.points = action.payload.points;
        },
        setCurrentR(state, action) {
            state.currentR = action.payload.currentR;
        },

        removePoints(state) {
            state.points = [];
        },
    },
});

export const {setPoints, removePoints, setCurrentR} = pointsSlice.actions;

export default pointsSlice.reducer;