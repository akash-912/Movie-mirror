import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import asyncHandler from './asyncHandler.js'

// check if the user is authenticated or not

const authenticate = asyncHandler(async (req,res,next)=>{
  let token;
  // Read JWT from the 'jwt' cookies
  token = req.cookies.jwt;

  if(token){
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    }catch(error){
      res.status(401)
      throw new Error("Not Authorized, toke failed.")
    }
  } else{
    res.status(401);
    throw new Error("Not Authorized, toke failed.")
  }
})