import { createSlice } from '@reduxjs/toolkit'

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    allStates:[],
  },
  reducers: {
    // 登録機能
    pushAllStates(state, action) {
      state.allStates = [...state.allStates, action.payload];
    },
    // 削除機能
    deleteAllStates(state,action) {
      state.allStates = [...action.payload];
    },
  }
})

export const { pushAllStates, deleteAllStates, } = dishesSlice.actions

export default dishesSlice.reducer
