import { reduxStore } from '../features'
import { User } from './index'

export interface AuthSliceTypes {
  value: {
    token: string | null
  }
}

export interface UserSliceTypes {
  value: {
    userData: User | null
  }
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch
