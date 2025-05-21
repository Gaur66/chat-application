import React, { useState } from "react";
import { FaCamera,FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import avatar from '../assets/avatar2.webp'
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../main";

const Profile = () => {
const {userData} = useSelector(state=>state.user)
const navigate = useNavigate();
const dispatch= useDispatch()
const [name,setName] = useState(userData?.name|| "")
const [showImage,setShowImage] = useState(userData.image|| avatar)
const [imageUrl,setImageUrl] = useState(null)
const [loading,setLoading] = useState(false)
 let image =  useRef(null)

 function handleImage (e){
let files = e.target.files[0]

setImageUrl(files)
setShowImage(URL.createObjectURL(files))
 }

 async function handleSubmit(e){
  setLoading(true)
     e.preventDefault()
     try{
  const formData= new FormData() 
  formData.append('name',name)
  if(imageUrl){
    formData.append('image',imageUrl)
  }
  let result = await axios.put(
    `${serverUrl}/api/user/profile`,
    formData,
    { withCredentials: true }
  );

  dispatch(setUserData(result.data))

  setLoading(false)
  navigate("/")
}
catch(error){
  setLoading(false)
console.log(error)
}
 }



  return (
    <div className="w-full h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex justify-center items-center px-4">
       <button
        className="absolute top-6 left-6 text-white text-2xl hover:text-indigo-200 transition"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </button>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Edit Profile
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mb-6 relative">
          <div className="w-28 h-28 rounded-full bg-gray-200 border-4 border-indigo-500 flex items-center justify-center overflow-hidden" onClick={()=>image.current.click()}>
            <img
              src={showImage}
              alt="avatar"
              className="w-full h-full object-cover "
            />
          </div>
          <div className="absolute bottom-2 right-[calc(50%-56px)] bg-white p-1 rounded-full border shadow-md cursor-pointer">
            <FaCamera className="text-indigo-600" />
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
        <input type="file" accept="image/*" hidden ref={image} onChange={handleImage}/>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          
          <input
              type="text"
              id="username"
              readOnly
              name="username"
              placeholder="username"
              value={userData.username}
           
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
    
            <input
              type="email"
              id="email"
              readOnly
              name="email"
              placeholder=" email"
              value={userData.email}
            
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            {loading? "Saving....":"Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
