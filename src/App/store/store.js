import { configureStore } from '@reduxjs/toolkit'
import users from './reducer/users'
// to set all slice from store
// it is  store so all slice init
export const Store=configureStore({
    reducer:{
        name:users

    }
})