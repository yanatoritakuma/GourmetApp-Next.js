import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface DishesType {
  categories: {
    category: string
    id: string
    name: string
    note: string
    photoUrl: string
    streetAddress: string
  }[],
  loginIDs: string,
}

const initialState: DishesType = {
  categories: [{
    category: "",
    id: "",
    name: "",
    note: "",
    photoUrl: "",
    streetAddress: ""
  }],
  loginIDs:"",
}

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
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
      const targetDelete = state.categories.filter(v => v.id !== action.payload);
      state.categories = [...targetDelete];
    },

    // ログインID保持
    loginIDStates(state,action){
      state.loginIDs = action.payload;
    }
  }
})

export const { pushRegistration, deleteCategory, loginIDStates } = dishesSlice.actions;

export const selectDishes = (state: RootState) => state.dishes.categories;

export default dishesSlice.reducer;
