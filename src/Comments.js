import { createSlice } from "@reduxjs/toolkit";

const commentReducer = createSlice({
    name: 'commentS',
    initialState: [
        { id: 1, contents: 'First' },
        { id: 2, contents: 'Second' },
        { id: 3, contents: 'Third' },
        { id: 4, contents: 'Forth' },
        { id: 5, contents: 'Fifth' },
        { id: 6, contents: 'Sixth' },
        { id: 7, contents: 'Seventh' },
        { id: 8, contents: 'Eight' },
        { id: 9, contents: 'Qutting' },
        { id: 10, contents: 'I should never be seen' },
    ],
    reducers: {
        init: () => [],
        addComment(state, action) {
            state.push({ id: state[state.length - 1].id + 1,
            contents: action.payload.comment});
        },
    }
})

export const commendReducer = { commendReducer: commentReducer };

export default commentReducer.reducer;

export const { addComment } = commentReducer.actions;