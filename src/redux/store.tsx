import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects'
import { configureStore  } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import posts, { GET_POSTS, getPostsSaga } from './posts'
import users, { GET_USERS, getUsersSaga } from './users'

const sagaMiddleware = createSagaMiddleware();

function* sagas() {
  yield takeEvery(GET_POSTS, getPostsSaga)
  yield takeEvery(GET_USERS, getUsersSaga)
}

export const store = configureStore({
  devTools: true,
  reducer: {
    posts,
    users,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export const useStoreDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>

  