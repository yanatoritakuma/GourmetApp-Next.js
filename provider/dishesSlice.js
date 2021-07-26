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
    },
    

    // 削除機能
    deleteCategory(state,action) {
      // const targetDelete = state.categories.filter((state) => state.id === action.payload)
      state.categories = [...state.categories, action.payload];
      const test = state.categories.filter(state => state.id !== action.payload);
      console.log("test",test);
      console.log("action.payload",action.payload);
      
    }
  }
})

export const { pushRegistration, deleteCategory } = dishesSlice.actions

export default dishesSlice.reducer
