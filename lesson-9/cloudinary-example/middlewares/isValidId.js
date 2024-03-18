import { isValidObjectId } from "mongoose";

import HttpError from "../helpers/HttpError.js";

const isValidId = (req, _, next)=> {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        return next(HttpError(404, `${id} not valid id`));
    }
    next();
}

export default isValidId;