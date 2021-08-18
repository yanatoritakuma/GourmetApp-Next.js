import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface DishesState {
  categories: string[]
  loginID: string[]
}

const initialState: DishesState = {
  categories: [],
  loginID:[]
}

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    // 登録機能
    pushRegistration(state, action:PayloadAction<string>) {
      if(action.payload.name === ""){
        return alert("Please enter StoreName");
      }
      state.categories = [...state.categories, action.payload];
    },
    
    // 削除機能
    deleteCategory(state,action:PayloadAction<any>) {
      const targetDelete = state.categories.filter(v => v.id !== action.payload);
      state.categories = [...targetDelete];
    },

    // ログインID保持
    loginIDStates(state,action){
      state.loginID = action.payload;
    }
  }
})

export const { pushRegistration, deleteCategory, loginIDStates } = dishesSlice.actions
export const selectCount = (state: RootState) => state.dishes.categories
export default dishesSlice.reducer
