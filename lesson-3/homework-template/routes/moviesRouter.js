import express from "express";

import moviesController from "../controllers/moviesController.js";

const moviesRouter = express.Router();

moviesRouter.get("/", moviesController.getAll);

export default moviesRouter;