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
    pushAllStates(state, action) {
      state.allCategory = [...state.allCategory, action.payload];
    },
    pushMeatStates(state, action) {
      state.meatCategory = [...state.meatCategory, action.payload];
    },
    pushFishStates(state, action) {
      state.fishCategory = [...state.fishCategory, action.payload];
    },
    pushNoodlesStates(state, action) {
      state.noodlesCategory = [...state.noodlesCategory, action.payload];
    },
    pushSaladStates(state, action) {
      state.saladCategory = [...state.saladCategory, action.payload];
    },
    pushDessertStates(state, action) {
      state.dessertCategory = [...state.dessertCategory, action.payload];
    },
    pushCoffeeStates(state, action) {
      state.coffeeCategory = [...state.coffeeCategory, action.payload];
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
