import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setMessageData } from "../redux/messageSlice";
import { useDispatch ,useSelector} from "react-redux";


const getMessage= ()=>{
      const { selectedUser ,userData} = useSelector((state) => state.user);
    
    const dispatch= useDispatch()
   
   
    useEffect(()=>{

const fetchuser= async()=>{
    try{

    
    const result= await axios.get(`${serverUrl}/api/message/get/${selectedUser?._id}`,{withCredentials:true})
    console.log(result,"result")

    dispatch(setMessageData(result.data))
    }
    catch(error){
console.log(error)
    }
}
fetchuser()
    },[selectedUser,userData])
}

export default getMessage