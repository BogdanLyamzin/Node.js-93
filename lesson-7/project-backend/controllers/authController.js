import jwt from "jsonwebtoken";

import * as authServices from "../services/authServices.js";

import HttpError from "../helpers/HttpError.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const {JWT_SECRET} = process.env;

const signup = async(req, res) => {
    const {email} = req.body;
    const user = await authServices.findUser({email});
    if(user) {
        throw HttpError(409, "Email in use");
    }
    
    const newUser = await authServices.signup(req.body);

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    })
}

const signin = async(req, res) => {
    const {email, password} = req.body;
    const user = await authServices.findUser({email});
    if(!user) {
        throw HttpError(401, "Email or password valid");
    }
    const comparePassword = await authServices.validatePassword(password, user.password);
    if(!comparePassword) {
        throw HttpError(401, "Email or password valid");
    }

    const {_id: id} = user;

    const payload = {
        id,
    }

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});

    res.json({
        token,
    })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
}