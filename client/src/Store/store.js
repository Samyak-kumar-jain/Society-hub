import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Features/AuthSlice/authSlice'
import drawerReducer from '../Features/AuthSlice/slideBarSlice'
import adminSocietyReducer from "../Features/SocietySlice/SocietySlice"



const store =  configureStore({
  reducer: {
    authen : authReducer,
    drawer: drawerReducer,
    adminSociety: adminSocietyReducer,
   
  }
})

export default store;

