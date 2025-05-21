import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setAllUsersData,clearUserData } from "../redux/userSlice";
import { useDispatch ,useSelector} from "react-redux";


const getAllUsers= ()=>{
    const dispatch= useDispatch()

    const { selectedUser ,userData} = useSelector((state) => state.user);
   
   
    useEffect(()=>{

const fetchuser= async()=>{
    try{

    
    const result= await axios.get(`${serverUrl}/api/user/allUsers`,{withCredentials:true})

    dispatch(setAllUsersData(result.data))
    }
    catch(error){
dispatch(clearUserData())
    }
}
fetchuser()
    },[userData])
}

export default getAllUsers