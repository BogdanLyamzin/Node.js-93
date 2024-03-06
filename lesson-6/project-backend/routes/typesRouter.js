import express from "express";

import typesController from "../controllers/typesController.js";

import isValidId from "../middlewares/isValidId.js";

import validateBody from "../decorators/validateBody.js";

import {typeAddSchema} from "../schemas/typeSchemas.js";

const typesRouter = express.Router();

typesRouter.get("/", typesController.getAll);

typesRouter.post("/", validateBody(typeAddSchema), typesController.add);

export default typesRouter;