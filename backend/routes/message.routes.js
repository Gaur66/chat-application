import express from "express"
import { sendMessageController,getMessageController } from "../controllers/message.controller.js";
import { upload } from "../middlewares/multer.js";
import { isAuth } from "../middlewares/isAuth.js";

const messageRouter = express.Router()


messageRouter.post('/send/:receiver',isAuth,upload.single('image'),sendMessageController)
messageRouter.get('/get/:receiver',isAuth,getMessageController)



export default messageRouter;