import { cloudinaryUpload } from "../config/cloudinary.js";
import User from "../models/user.model.js";
export const userController = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Signup error: ${error.message}`,
    });
  }
};

export const profileUpdateController = async (req, res) => {
  try {
    const userId = req.userId;
    const {name}= req.body
    let image;
    if(req.file){
      image= await cloudinaryUpload(req.file.path)
    }

    const user = await User.findByIdAndUpdate(userId,{
      name,image
    },{new:true});
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error: ${error.message}`,
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.find({_id:{$ne:userId}}).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error: ${error.message}`,
    });
  }
};
export const getUserSearch = async (req, res) => {
  try {
    const {query} = req.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "query is required",
      });
    }
    const searchUser = await User.find({$or:[{
      name:{$regex:query,$options:"i"},
      username:{$regex:query,$options:"i"}
    }]});
   console.log(searchUser,"dkkddkdk")
    return res.status(200).json(searchUser);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error: ${error.message}`,
    });
  }
};
