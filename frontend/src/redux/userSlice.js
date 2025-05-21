import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
      userData: null,
      allUsers:null,
      selectedUser:null,
      socket:null,
      onlineUsers:null,
      searchUser:[]
  
    },

    reducers: {
      setUserData: (state, action) => {
        state.userData = action.payload;
        
      },
      setAllUsersData: (state, action) => {
        state.allUsers = action.payload;
        
      },
      setSelectedData: (state, action) => {
        state.selectedUser = action.payload;
        
      },
      setSocket:(state,action)=>{
      state.socket=action.payload
      },
      setOnlineUsers:(state,action)=>{
        state.onlineUsers=action.payload
              },
       setSearchUser:(state,action)=>{
        state.searchUser=action.payload
              },
      clearUserData:(state)=>{
      state.userData = null;

      }
    },
  });

export const { setUserData,clearUserData,setAllUsersData,setSelectedData,setSocket,setOnlineUsers,setSearchUser } = userSlice.actions;
export default userSlice.reducer;
