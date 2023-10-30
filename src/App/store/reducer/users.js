import { createSlice } from "@reduxjs/toolkit";
// import {useState} from 'react';
import internjson from './internjson1.json'
// import UserData from "../../Main/user/UserData";

const initialState={
    UserData:[...internjson.students]

}
// creating slice it has three priciple it should have name,set intialState,reducer
// reducer= purefunction
const user=createSlice({
    name:"user",
    initialState,
    reducers :{
        addUserData(state,action){
            // state ref here intialState 
            // action like update or add
            state.UserData.unshift(action.payload);
        },
        UpdateUserData(state,action){
            const setId=state.UserData.findIndex((t)=>t.id===action.payload.id);
      if (setId > -1) {
        state.UserData[setId] = {
          ...state.UserData[setId],
          name: action.payload.name,
          email: action.payload.email,
          father_name: action.payload.father_name,
          mother_name: action.payload.mother_name,
          degree:action.payload.degree,
          address: action.payload.address,
          college:action.payload.college,
          batch:action.payload.batch,

        };
      }
        },
        DeleteUserData(state,action){
            const deleteId = state.UserData.findIndex((item) => item.id === action.payload);
      state.UserData.splice(deleteId,1);

        }


    }
})
export const {addUserData,UpdateUserData,DeleteUserData}=user.actions;
export default user.reducer;