import jwt from "jsonwebtoken";
export const tokenGenerator = async (userId) => {
  try {
    const token = await  jwt.sign({ userId }, process.env.jwt_secret_token, {
      expiresIn: "7d",
    });
 
    return token;
  } catch (error) {
    console.log("token generation failed");
  }
};
