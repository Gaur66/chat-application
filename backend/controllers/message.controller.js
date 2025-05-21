import Message from "../models/message.modal.js"
import Conversation from "../models/conversation.modal.js"
import { cloudinaryUpload } from "../config/cloudinary.js"
import { getReceiverSocketId, io } from "../socket/socket.js"
export const sendMessageController= async(req,res)=>{
    try{
const sender= req.userId
const {receiver}= req.params

const {message}= req.body

let image;

if(req.file){
  image= await cloudinaryUpload(req.file.path)
}

 let conversation= await Conversation.findOne({
    participants:{$all:[sender,receiver]}
 })




 let newMessage= await Message.create({
    sender,receiver,message,image
 })

  if(!conversation){
  
 conversation = await Conversation.create({
    participants:[sender,receiver],
    messages:[newMessage._id]
})
  }
  else {
   
conversation.messages.push(newMessage._id)
 await conversation.save()
  }
const receiverSocketId= getReceiverSocketId(receiver)
if(receiverSocketId){
    io.to(receiverSocketId).emit("newMessage",newMessage)
}
  return res.status(201).json(newMessage)
    }
    catch(error){
res.status(500).json({
    success:false,
    message:"server error"

})
    }


}
export const getMessageController= async(req,res)=>{
    try{
const sender= req.userId
const {receiver}= req.params



 let conversation= await Conversation.findOne({
    participants:{$all:[sender,receiver]}
 }).populate('messages')

console.log(conversation,"kdkdk")
  if(!conversation){
res.status(400).json({
    success:false,
    message:'conversation not found'
})
  }
  
 
  return res.status(200).json(conversation?.messages)
    }
    catch(error){
res.status(500).json({
    success:false,
    message:"server error"

})
    }


}