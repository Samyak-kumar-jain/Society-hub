import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Features/AuthSlice/authSlice'
import drawerReducer from '../Features/AuthSlice/slideBarSlice'
import adminSocietyReducer from "../Features/SocietySlice/SocietySlice"
import bulletinReducer from "../Features/BulletinSlice/bulletinSlice"
import userSocietyReducer from "../Features/SocietySlice/userSocietySlice"
import eachBuletinReducer from "../Features/SocietySlice/eachSocietyBulletin"

const store =  configureStore({
  reducer: {
    authen : authReducer,
    drawer: drawerReducer,
    adminSociety: adminSocietyReducer,
    bulletin: bulletinReducer,
    society : userSocietyReducer,
    eachBuletin:eachBuletinReducer,
  }
})

export default store;

