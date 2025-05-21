import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
  try {
    console.log(req.cookies.token,"d")
    const token = req.cookies.token;
    if (!token) {
      return res.status(402).json({
        success: false,
        message: "user is not authorized",
      });
    }

    const isVerifyToken = jwt.verify(token, process.env.jwt_secret_token);
    req.userId = isVerifyToken.userId;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};
