import express from "express";

// controllers
import {
  createUser,
  loginUser,
  logCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile
} from "../controllers/userController.js"
// middlewares
import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";
const userRoutes = express.Router()

userRoutes.route('/register').post(createUser).get(authenticate,authorizeAdmin, getAllUsers);
userRoutes.post('/auth',loginUser);
userRoutes.post('/logout',logCurrentUser);


userRoutes
  .route('/profile')
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate,updateCurrentUserProfile);
export default userRoutes;