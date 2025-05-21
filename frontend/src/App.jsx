import React,{useEffect} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import getCurrentUser from "./hooks/getCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import getAllUsers from "./hooks/getAllUsers";
import {io} from 'socket.io-client'
import { serverUrl } from "./main";
import { setOnlineUsers, setSocket } from "./redux/userSlice";
const App = () => {
   const { userData,socket,onlineUsers } = useSelector((state) => state.user);
   const dispatch = useDispatch()
   getCurrentUser()
   getAllUsers()

   useEffect(()=>{
    if(userData){
const socketio = io(`${serverUrl}`,{
  query:{
    userId:userData?._id
  }
  
})
dispatch(setSocket(socketio))
socketio.on("getOnlineUsers",(message)=>{
  dispatch(setOnlineUsers(message))
})

return ()=>{
  socketio.close()
}
    }
    else{
if(socket){
  socket.close()
  dispatch(setSocket(null))
}
    }
   },[userData])
 
    
  return (
    <Routes>
      <Route path="/login" element={!userData?<Login />:<Navigate to="/"/>}></Route>
      <Route path="/signup" element={!userData?<SignUp />:<Navigate to="/profile"/>}></Route>
      <Route path="/" element={userData?<Home />:<Navigate to="/login"/>}></Route>
     <Route path="/profile" element={userData?<Profile />:<Navigate to="/signup"/>}></Route>
    
  
    </Routes>
  );
};

export default App;
