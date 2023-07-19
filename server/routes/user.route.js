import  { Router } from "express";
import { userSignup, userLogin, getUserDetails } from "../controllers/user.controller.js";
import signupValidator from "../middlewares/signupValidator.js";
import loginValidator from "../middlewares/loginValidator.js";
import authenticateUser from "../middlewares/authenticateUser.js";


// create an instance of router
const userRoutes = Router();

// create routes for user
userRoutes.post('/signup',signupValidator,userSignup);
userRoutes.post('/login',loginValidator,userLogin);
userRoutes.get('/',authenticateUser,getUserDetails);



export default userRoutes;