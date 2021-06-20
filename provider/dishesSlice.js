import { createSlice } from '@reduxjs/toolkit'

export const dishesSlice = createSlice({
  name: 'todo',
  initialState: {
    todos:[],
  },
  reducers: {
    // 登録機能
    pushTodo(state, action) {
      state.todos = [...state.todos, action.payload];
    },
    // 削除機能
    deleteTodo(state,action, i) {
      state.todos = [...action.payload];
    },
  }
})

export const { pushTodo, deleteTodo, } = dishesSlice.actions

export default dishesSlice.reducer
