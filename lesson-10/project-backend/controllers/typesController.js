import * as typesServices from "../services/typesServices.js";

import HttpError from "../helpers/HttpError.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAll = async(_, res)=> {
    const result = await typesServices.getAllTypes();

    res.json(result);
}

const add = async(req, res)=> {
    const result = await typesServices.addType(req.body);

    res.status(201).json(result);
}

export default {
    getAll: ctrlWrapper(getAll),
    add: ctrlWrapper(add),
}