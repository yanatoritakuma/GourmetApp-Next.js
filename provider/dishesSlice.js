import { createSlice } from '@reduxjs/toolkit'

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    all:[
      {id:"meat"},
      {id:"fish"},
      {id:"noodle"},
      {id:"salad"},
      {id:"dessert"},
      {id:"coffee"}
    ],
  },
  reducers: {
    // 登録機能
    pushRegistration(state, action) {
      if(action.payload.name === ""){
        return alert("Please enter StoreName");
      }
      state.all = [...state.all, action.payload];

      console.log("category",action.payload);

      // switch(action.payload.category){
      //   case "meat":
      //   state.all = [...state.all, action.payload];
      //   break;

      //   case "fish":
      //   state.all = [...state.fish, action.payload];
      //   break;

      //   case "noodle":
      //   state.all = [...state.noodle, action.payload];
      //   break;

      //   case "salad":
      //   state.all = [...state.salad, action.payload];
      //   break;

      //   case "dessert":
      //   state.all = [...state.dessert, action.payload];
      //   break;

      //   case "coffee":
      //   state.all = [...state.coffee, action.payload];
      //   break;
      // }
    },
    

    // 削除機能
    deleteCategory(state,action) {
      state.allCategory.splice(action.payload,1);
    },
  }
})

export const { pushRegistration, deleteCategory } = dishesSlice.actions

export default dishesSlice.reducer
