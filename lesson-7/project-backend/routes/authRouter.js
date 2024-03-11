import express from "express";

import authController from "../controllers/authController.js";

import validateBody from "../decorators/validateBody.js";

import {userSignupSchema, userSigninSchema} from "../schemas/usersSchemas.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(userSignupSchema), authController.signup);

authRouter.post("/signin", validateBody(userSigninSchema), authController.signin);

export default authRouter;