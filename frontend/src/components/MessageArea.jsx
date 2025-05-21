import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiImage, FiSend, FiSmile } from "react-icons/fi";
import { setSelectedData } from "../redux/userSlice";
import avatar from '../assets/avatar2.webp';
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { serverUrl } from "../main";
import { setMessageData } from "../redux/messageSlice";

const MessageArea = () => {
  const { selectedUser,userData,socket } = useSelector((state) => state.user);
  
  const { messageData, } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleSend = async () => {
   if(message.length==0 && imageUrl==null){
    return 
   }
  
    try {
      const formData = new FormData();
      formData.append("message", message);
      if (imageUrl) {
        formData.append("image", imageUrl);
      }
  
      let result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );
      console.log(result,'resau')
  
 dispatch(setMessageData([...messageData,result.data]))

      // Reset input fields after sending
      setMessage("");
      setSelectedImage(null);
      setImageUrl(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];


    if (file) {
      setImageUrl(file)
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  useEffect(()=>{
socket.on("newMessage",(message)=>{
dispatch(setMessageData([...messageData,message]))
return()=>{
  socket.off("newMessage")
}
})
  },[messageData,setMessageData])


  return (
    <div className={`h-screen w-full lg:w-[70%] ${selectedUser ? 'flex' : 'hidden'} lg:flex flex-col bg-slate-200`}>
      {/* Header */}
      {selectedUser && (
        <div className="p-4 border-b border-gray-300 bg-slate-300 w-full h-[70px] flex items-center">
          <button
            onClick={() => dispatch(setSelectedData(null))}
            className="block lg:hidden mr-4 text-black"
          >
            <FiArrowLeft size={24} />
          </button>
          <div className="flex gap-3 items-center w-full">
            <img
              src={selectedUser?.image || avatar}
              alt={selectedUser?.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
            />
            <span className="font-large">{selectedUser?.name || "unknown user"}</span>
          </div>
        </div>
      )}

      {/* Message Area or Welcome Screen */}
      {selectedUser ? (
        <>
          {/* Messages Display Placeholder */}
          <div className="flex-1 overflow-y-auto p-4 ">
            {/* Replace with actual messages */}
            {messageData.length>0 && messageData.map((msg) =>
        msg.sender === userData._id ? (
          <SenderMessage key={msg._id} text={msg.message} image={msg.image} />
        ) : (
          <ReceiverMessage key={msg._id} text={msg.message} image={msg.image} />
        )
      )}
          </div>

          {/* Chat Input Area */}
          <div className="p-4 border-t bg-white relative">
            {showEmojiPicker && (
              <div className="absolute bottom-16 left-4 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}

            {selectedImage && (
              <div className="mb-2">
                <img
                  src={selectedImage}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded"
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
                <FiSmile size={24} className="text-gray-700" />
              </button>

              <button onClick={() => fileInputRef.current.click()}>
                <FiImage size={24} className="text-gray-700" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 p-2 border rounded-full outline-none"
              />

              <button onClick={handleSend}>
                <FiSend size={24} className="text-purple-600" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 inline-block text-transparent bg-clip-text">
            Welcome to Chit-Chat
          </h1>
          <p className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 inline-block text-transparent bg-clip-text">
            Chat with Friends!!
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
