import { Router } from "express";
import {
  login,
  register,
  authCheck,
  logout
} from "../controllers/authController.js";



const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/authCheck", authCheck);
authRouter.get("/logout", logout);

export default authRouter;
