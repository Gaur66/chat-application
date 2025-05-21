import { tokenGenerator } from "../config/tokenGenerator.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;



    const isUserExist = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be 6 characters",
      });
    }
    const hashedPasword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPasword,
    });


    const token = await tokenGenerator(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false,
    });

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      data:user
    });
  } catch (error) {
   
    console.log("Signup error:", error);
    
      return res.status(500).json({
        success: false,
        message: `Signup error: ${error.message}`,
      });
    }
  
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await  User.findOne({
      email,
    });
    if (!isUserExist) {
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    }

    const isPasswordMatch = await bcryptjs.compare(password, isUserExist.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "incorrect user details",
      });
    }

    const token = await tokenGenerator(isUserExist._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false,
    });

   return  res.status(200).json({
      success: true,
      message: "user login successfully",
      data: isUserExist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ` login error ${error}`,
    });
  }
};


export const logOut = async(req,res)=>{
    try{
res.clearCookie("token")
return res.status(200).json({
    success:true,
    message:'user logout successfully'
})
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'something wrong'
        }) 
    }
}
