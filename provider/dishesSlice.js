import { createSlice } from '@reduxjs/toolkit'

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    allCategory:[],
  },
  reducers: {
    // 登録機能
    pushRegistration(state, action) {
      if(action.payload.name === ""){
        return alert("Please enter StoreName");
      }
      state.allCategory = [...state.allCategory, action.payload];
    },
    

    // 削除機能
    deleteCategory(state,action) {
      state.allCategory.splice(action.payload,1);
    },
  }
})

export const { pushRegistration, deleteCategory } = dishesSlice.actions

export default dishesSlice.reducer
