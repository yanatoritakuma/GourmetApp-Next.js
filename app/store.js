import { configureStore } from '@reduxjs/toolkit'
// import todoReducer from '../provider/todoSlice'

export default configureStore({
  reducer: {
    dishes: dishesSlice,
  },
})