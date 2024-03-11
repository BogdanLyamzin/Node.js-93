import express from "express";

import moviesController from "../controllers/moviesController.js";

import isValidId from "../middlewares/isValidId.js";

import validateBody from "../decorators/validateBody.js";

import { movieAddSchema, movieUpdateSchema } from "../schemas/moviesSchemas.js";

const moviesRouter = express.Router();

moviesRouter.get("/", moviesController.getAll);

moviesRouter.get("/:id", isValidId, moviesController.getById);

moviesRouter.post("/", validateBody(movieAddSchema), moviesController.add);

moviesRouter.put("/:id", isValidId, validateBody(movieUpdateSchema), moviesController.updateById);

moviesRouter.delete("/:id", isValidId, moviesController.deleteById);

export default moviesRouter;