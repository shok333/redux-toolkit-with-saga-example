import { createAction, createSlice } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects'
import { getUsersApi } from '../api/users';
import { IUser } from '../components/User/IUser';

interface IUsersState {
  current: IUser;
  list: Array<IUser>;
}

const initialCurrent: IUser = {
  name: '',
  id: 0,
  avatar: '',
}

const initialState: IUsersState = {
  current: initialCurrent,
  list: []
};

export function* getUsersSaga(): any {
  const payload = yield getUsersApi().then((response) => response.json());

  yield put(getUsersSuccess(payload));
}


// export const getUsers = createAsyncThunk(
//   'getUsers',
//   async () => {
//     const response = await getUsersApi()

//     return await response.json()
//   }
// )


const counterSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersSuccess: (state, action) => {
      state.list = action.payload;
      state.current = action.payload[0]
    },
    changeCurrent: (state, action) => {
      state.current = state.list.find(({id}) => id === action.payload) || initialCurrent;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getUsers.fulfilled, (state, action) => {
  //     state.list = action.payload
  //     state.current = action.payload[0]
  //   })
  // },
});

export const GET_USERS = 'users/getUsers';
export const getUsers = createAction(GET_USERS)

export const { changeCurrent, getUsersSuccess } = counterSlice.actions;
export default counterSlice.reducer;