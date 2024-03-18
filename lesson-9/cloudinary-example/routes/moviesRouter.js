import express from "express";

import moviesController from "../controllers/moviesController.js";

import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

import validateBody from "../decorators/validateBody.js";

import { movieAddSchema, movieUpdateSchema } from "../schemas/moviesSchemas.js";

const moviesRouter = express.Router();

moviesRouter.use(authenticate);

moviesRouter.get("/", moviesController.getAll);

moviesRouter.get("/:id", isValidId, moviesController.getById);

// upload.fields([{name: "poster", maxCount: 1}])
// upload.array("poster", 8);
moviesRouter.post("/", upload.single("poster"), validateBody(movieAddSchema), moviesController.add);

moviesRouter.put("/:id", isValidId, validateBody(movieUpdateSchema), moviesController.updateById);

moviesRouter.delete("/:id", isValidId, moviesController.deleteById);

export default moviesRouter;