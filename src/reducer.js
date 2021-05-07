import { combineReducers, createSlice } from "@reduxjs/toolkit";

import Comments, { commendReducer } from './Comments';

const blogReducer = createSlice({
    name: 'BlogReducer',
    initialState: [
        {
            blogPostId: 1,
            Content: ['This is some content in a blogpost', 'It is even split into multiple paragraphs',],
            title: ['Awsome first post'],
            comments: { id: [1, 4, 7] },
            times: { created: 1620382126834 },
            author: { first: 'John', lastName: 'Doe', id: 1337, other: [2, 5] },
        },
        {
            blogPostId: 2,
            Content: ['This is my second blog post.', 'What is it even worth writing about anymore? I guess you will figure out in the future.',],
            title: ['What to do?'],
            comments: { id: [2, 3] },
            times: { created: 1620382155612, posted: '07 May 2021 12:12:57 GMT'},
            author: { first: 'John', lastName: 'Doe', id: 1337, other: [1, 5] },
        },
        {
            blogPostId: 3,
            Content: ['Hi, I am Jane.', 'I am here to help [John](/users/1337) with running of this Blogg',],
            title: ['I am Jane'],
            comments: { id: 5 },
            times: { created: 1620382446229, modified: '07 May 2021 12:15:27 GMT'},
            author: { name: 'Jane Doe', id: 2, other: [4] },
        },
        {
            blogPostId: 4,
            Content: ['This is my second blog post.', 'What should I help [John](/users/1337) with in the future',],
            title: ['I will help John'],
            comments: { id: [6, 9] },
            times: { created: 1620382476600, posted: '07 May 2021 12:16:30 GMT'},
            author: { first: 'Jane', lastName: 'Doe', id: 2, other: [3] },
        },
        {
            blogPostId: 5,
            Content: 'Wohooo. We are 2 persons now. Please welcome [Jane](/users/2) to the staff.',
            title: 'Please welcome Jane',
            comments: { id: [8] },
            times: { created: 1620382509782, posted: '07 May 2021 12:15:57 GMT'},
            author: { name: 'Doe, John', id: 1337, other: [1, 2] },
        }
    ],
    reducers: {
        init: () => [],
        addPost: (state, action) => state.push(action.payload),
        addPosts: (state, action) => {
            const posts = action.payload;
            for (let i = 0; i < posts.length; i++) {
                state.push(posts[i]);
            }
        }
    },
    extraReducers: {
        [commendReducer.commendReducer.actions.addComment]: function(state, action) {
            const existingCommentIds = state.map(post => post.comments.id).flat();
            const highestId = existingCommentIds.reduce(function(acc, val) { return Math.max(acc, val); } , -1);
            // eslint-disable-next-line
            const bloggPost = state.findIndex(post => post.blogPostId ==/* Does not work with === */ action.payload.postId);
            state[bloggPost].comments.id = [...state[bloggPost].comments.id, highestId + 1];
        }
    }
});

const rootReducer = combineReducers({
    blogreducer: blogReducer.reducer,
    comment: Comments,
});

export const { addPost, addPosts } = blogReducer.actions;

export default rootReducer;