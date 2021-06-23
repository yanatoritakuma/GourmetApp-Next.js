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
      const newAllStates = [...state.allCategoryStates, action.payload];
      newAllStates.splice(i,1);
    },
    deleteMeatStates(state,action) {
      state.meatCategoryStates = [...action.payload];
    }
  }
})

export const { pushAllStates, deleteAllStates, pushMeatStates, deleteMeatStates } = dishesSlice.actions

export default dishesSlice.reducer
