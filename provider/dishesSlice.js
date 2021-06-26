import { createSlice } from '@reduxjs/toolkit'

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    allCategoryStates:[],
    meatCategoryStates:[],
    fishCategoryStates:[],
    noodlesCategoryStates:[],
    saladCategoryStates:[],
    dessertCategoryStates:[],
    coffeeCategoryStates:[]
  },
  reducers: {
    // 登録機能
    pushAllStates(state, action) {
      state.allCategoryStates = [...state.allCategoryStates, action.payload];
    },
    pushMeatStates(state, action) {
      state.meatCategoryStates = [...state.meatCategoryStates, action.payload];
    },
    pushFishStates(state, action) {
      state.fishCategoryStates = [...state.fishCategoryStates, action.payload];
    },
    pushNoodlesStates(state, action) {
      state.noodlesCategoryStates = [...state.noodlesCategoryStates, action.payload];
    },
    pushSaladStates(state, action) {
      state.saladCategoryStates = [...state.saladCategoryStates, action.payload];
    },
    pushDessertStates(state, action) {
      state.dessertCategoryStates = [...state.dessertCategoryStates, action.payload];
    },
    pushCoffeeStates(state, action) {
      state.coffeeCategoryStates = [...state.coffeeCategoryStates, action.payload];
    },

    // 削除機能
    deleteAllStates(state,action) {
      state.allCategoryStates.splice(action.payload,1);
    },
    deleteMeatStates(state,action) {
      state.meatCategoryStates.splice(action.payload,1);
    },
    deleteFishStates(state,action) {
      state.fishCategoryStates.splice(action.payload,1);
    },
    deleteNoodlesStates(state,action) {
      state.noodlesCategoryStates.splice(action.payload,1);
    },
    deleteSaladStates(state,action) {
      state.saladCategoryStates.splice(action.payload,1);
    },
    deleteDessertStates(state,action) {
      state.dessertCategoryStates.splice(action.payload,1);
    },
    deleteCoffeeStates(state,action) {
      state.coffeeCategoryStates.splice(action.payload,1);
    }
  }
})

export const { pushAllStates, deleteAllStates, deleteMeatStates, deleteFishStates, deleteNoodlesStates,deleteSaladStates,deleteDessertStates,deleteCoffeeStates } = dishesSlice.actions

export default dishesSlice.reducer
