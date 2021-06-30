import { createSlice } from '@reduxjs/toolkit'

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    allCategory:[],
    meatCategory:[],
    fishCategory:[],
    noodlesCategory:[],
    saladCategory:[],
    dessertCategory:[],
    coffeeCategory:[]
  },
  reducers: {
    // 登録機能
    pushRegistration(state, action) {
      state.allCategory = [...state.allCategory, action.payload];
      console.log("action.payload",action.payload);
      switch(category){
        case "meatDish":
        state.meatCategory = [...state.meatCategory, action.payload];
        break;
      }
    },
    

    // 削除機能
    deleteAllCategoryStates(state,action) {
      state.allCategory.splice(action.payload,1);
    },
    deleteMeatStates(state,action) {
      state.meatCategory.splice(action.payload,1);
    },
    deleteFishStates(state,action) {
      state.fishCategory.splice(action.payload,1);
    },
    deleteNoodlesStates(state,action) {
      state.noodlesCategory.splice(action.payload,1);
    },
    deleteSaladStates(state,action) {
      state.saladCategory.splice(action.payload,1);
    },
    deleteDessertStates(state,action) {
      state.dessertCategory.splice(action.payload,1);
    },
    deleteCoffeeStates(state,action) {
      state.coffeeCategory.splice(action.payload,1);
    }
  }
})

export const { pushAllStates, deleteAllCategoryStates, deleteMeatStates, deleteFishStates, deleteNoodlesStates,deleteSaladStates,deleteDessertStates,deleteCoffeeStates } = dishesSlice.actions

export default dishesSlice.reducer
