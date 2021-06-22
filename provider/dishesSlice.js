import { createSlice } from '@reduxjs/toolkit'

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    allStates:[],
    meatStates:[],
  },
  reducers: {
    // 登録機能
    pushAllStates(state, action) {
      state.allStates = [...state.allStates, action.payload];
    },
    pushMeatStates(state, action) {
      state.meatStates = [...state.meatStates, action.payload];
    },
    // 削除機能
    deleteAllStates(state,action) {
      state.allStates = [...action.payload];
    },
    deleteMeatStates(state,action) {
      state.meatStates = [...action.payload];
    }
  }
})

export const { pushAllStates, deleteAllStates, pushMeatStates, deleteMeatStates } = dishesSlice.actions

export default dishesSlice.reducer
