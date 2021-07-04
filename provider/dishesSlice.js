import { createSlice } from '@reduxjs/toolkit'

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    categorysState:[{
      allCategory:[],
      meatCategory:[],
      fishCategory:[],
      noodlesCategory:[],
      saladCategory:[],
      dessertCategory:[],
      coffeeCategory:[]
    }]

    // allCategory:[],
    // meatCategory:[],
    // fishCategory:[],
    // noodlesCategory:[],
    // saladCategory:[],
    // dessertCategory:[],
    // coffeeCategory:[]
  },
  reducers: {
    // 登録機能
    pushRegistration(state, action) {
      if(action.payload.name === ""){
        return alert("Please enter StoreName");
      }
      state.categorysState = [...state.categorysState, action.payload];
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
    deleteAllCategoryStates(state,action) {
      state.categorysState.splice(action.payload,1);
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
