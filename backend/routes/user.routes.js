import express from "express"
import { isAuth } from "../middlewares/isAuth.js";
import { getAllUsersController, getUserSearch, profileUpdateController, userController } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";


const userRouter = express.Router()


userRouter.get('/current',isAuth,userController)
userRouter.put('/profile',isAuth,upload.single('image'), profileUpdateController)
userRouter.get('/allUsers',isAuth, getAllUsersController)
userRouter.get('/search',isAuth, getUserSearch)




export default userRouter;