import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setUserData,clearUserData } from "../redux/userSlice";
import { useDispatch ,useSelector} from "react-redux";


const getCurrentUser= ()=>{
    const dispatch= useDispatch()
   
   
    useEffect(()=>{

const fetchuser= async()=>{
    try{

    
    const result= await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})

    dispatch(setUserData(result.data))
    }
    catch(error){
dispatch(clearUserData())
    }
}
fetchuser()
    },[])
}

export default getCurrentUser