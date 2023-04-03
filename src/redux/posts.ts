import { createAction, createSlice } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects'
import { getPostsApi } from '../api/posts';
import { IPost } from '../components/Post/IPost';

interface IPostState {
  list: Array<IPost>
}

const initialState: IPostState = {
  list: []
};

export function* getPostsSaga(): any {
  const payload = yield getPostsApi().then((response) => response.json());

  yield put(getPostsSuccess(payload));
}

// export const getPosts = createAsyncThunk(
//   'getPosts',
//   async () => {
//     const response = await getPostsApi()

//     return await response.json()
//   }
// )

const counterSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPostsSuccess: (state, action) => {
      state.list = action.payload;
    },
    addPost: (state, action) => {
      state.list.push({
        id: state.list.length,
        date: new Date(),
        text: action.payload.text,
        authorId: action.payload.authorId,
      });
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getPosts.fulfilled, (state, action) => {
  //     state.list = action.payload
  //   })
  // },
});

export const GET_POSTS = 'posts/getPosts';
export const getPosts = createAction(GET_POSTS)

export const { addPost, getPostsSuccess } = counterSlice.actions;
export default counterSlice.reducer;