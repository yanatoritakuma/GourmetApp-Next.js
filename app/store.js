import { configureStore } from '@reduxjs/toolkit'
import dishesSlice from '../provider/dishesSlice'

export default configureStore({
  reducer: {
    dishes: dishesSlice,
  },
}) 