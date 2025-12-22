import express from "express";

// controllers
import {createUser} from "../controllers/userController.js"
// middlewares

const userRoutes = express.Router()

userRoutes.route('/').post(createUser);


export default userRoutes;