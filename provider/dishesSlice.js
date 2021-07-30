import { createSlice } from '@reduxjs/toolkit'

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    categories:[],
  },
  reducers: {
    // 登録機能
    pushRegistration(state, action) {
      if(action.payload.name === ""){
        return alert("Please enter StoreName");
      }
      state.categories = [...state.categories, action.payload];
      console.log("action.payload",action.payload);
    },
    

    // 削除機能
    deleteCategory(state,action) {
      const targetDelete = state.categories.filter(v => v.id !== action.payload);
      state.categories = [...targetDelete];
    }
  }
})

export const { pushRegistration, deleteCategory } = dishesSlice.actions

export default dishesSlice.reducer
