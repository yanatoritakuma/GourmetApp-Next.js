import { createSlice } from '@reduxjs/toolkit'

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    allCategoryStates:[],
    meatCategoryStates:[],
  },
  reducers: {
    // 登録機能
    pushAllStates(state, action) {
      state.allCategoryStates = [...state.allCategoryStates, action.payload];
    },
    pushMeatStates(state, action) {
      state.meatCategoryStates = [...state.meatCategoryStates, action.payload];
    },
    // 削除機能
    deleteAllStates(state,action) {
      state.allCategoryStates.splice(action.payload,1);
      state.meatCategoryStates.splice(action.payload,1);
    },
  }
})

export const { pushAllStates, deleteAllStates, pushMeatStates, deleteMeatStates } = dishesSlice.actions

export default dishesSlice.reducer
