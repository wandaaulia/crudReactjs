import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts :  JSON.parse(localStorage.getItem('posts')) || []
}

export const appSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    savePosts: (state, action) => {
        state.posts = action.payload
        localStorage.setItem('posts', JSON.stringify(action.payload));
    },
  },
})

// Action creators are generated for each case reducer function
export const { savePosts } = appSlice.actions

export default appSlice.reducer