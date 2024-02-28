import express from "express";

import moviesController from "../controllers/moviesController.js";

const moviesRouter = express.Router();

moviesRouter.get("/", moviesController.getAll);

moviesRouter.get("/:id", moviesController.getById);

moviesRouter.post("/", moviesController.add);

moviesRouter.put("/:id", moviesController.updateById);

moviesRouter.delete("/:id", moviesController.deleteById);

export default moviesRouter;