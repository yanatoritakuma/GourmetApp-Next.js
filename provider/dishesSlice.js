import { createSlice } from '@reduxjs/toolkit'

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    allCategory:['all000'],
    meatCategory:['meat999'],
    fishCategory:[],
    noodleCategory:[],
    saladCategory:[],
    dessertCategory:[],
    coffeeCategory:[],
  },
  reducers: {
    // 登録機能
    pushRegistration(state, action) {
      if(action.payload.name === ""){
        return alert("Please enter StoreName");
      }
      state.allCategory = [...state.allCategory, action.payload];
      switch(action.payload.category){
        case "meatDish":
        state.meatCategory = [...state.meatCategory, action.payload];
        break;

        case "fishDish":
        state.fishCategory = [...state.fishCategory, action.payload];
        break;

        case "noodles":
        state.noodlesCategory = [...state.noodlesCategory, action.payload];
        break;

        case "salad":
        state.saladCategory = [...state.saladCategory, action.payload];
        break;

        case "dessert":
        state.dessertCategory = [...state.dessertCategory, action.payload];
        break;

        case "coffee":
        state.coffeeCategory = [...state.coffeeCategory, action.payload];
        break;
      }
    },
    

    // 削除機能
    deleteCategory(state,action) {
      state.allCategory.splice(action.payload,1);
    },
  }
})

export const { pushAllStates, deleteCategory } = dishesSlice.actions

export default dishesSlice.reducer
