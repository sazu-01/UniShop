import { configureStore } from '@reduxjs/toolkit';

import variableReducer from './feauters/variable';

export const store = configureStore({
  reducer: {
    variables : variableReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch