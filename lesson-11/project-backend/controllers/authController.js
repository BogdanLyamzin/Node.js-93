import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

import * as authServices from "../services/authServices.js";

import HttpError from "../helpers/HttpError.js";
import sendEmail from "../helpers/sendEmail.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const { JWT_SECRET, BASE_URL } = process.env;

const signup = async (req, res) => {
    const { email } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const verificationCode = nanoid();

    const newUser = await authServices.signup({ ...req.body, verificationCode });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/api/auth/verify/${verificationCode}" target="_blank">Click to verify</a>`
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    })
}

const verify = async(req, res)=> {
    const {verificationCode} = req.params;
    const user = await authServices.findUser({verificationCode});
    if(!user) {
        throw HttpError(404, "verificationCode not found");
    }
    await authServices.updateUser({_id: user._id}, {verify: true, verificationCode: ""});

    res.json({
        message: "Email verify success"
    })
}

const resendVerify = async(req, res)=> {
    const {email} = req.body;
    const user = await authServices.findUser({email});
    if(!user) {
        throw HttpError(404, "Email not found");
    }
    if(user.verify) {
        throw HttpError(400, "Email already verify");
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationCode}" target="_blank">Click to verify</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: "Verify email send success"
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password valid");
    }
    if(!user.verify) {
        throw HttpError(401, "Email not vefify");
    }
    const comparePassword = await authServices.validatePassword(password, user.password);
    if (!comparePassword) {
        throw HttpError(401, "Email or password valid");
    }

    const { _id: id } = user;

    const payload = {
        id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await authServices.updateUser({ _id: id }, { token });

    res.json({
        token,
    })
}

const getCurrent = async (req, res) => {
    const { username, email } = req.user;

    res.json({
        username,
        email,
    })
}

const signout = async (req, res) => {
    const { _id } = req.user;
    await authServices.updateUser({ _id }, { token: "" });

    res.json({
        message: "Signout success"
    })
}

export default {
    signup: ctrlWrapper(signup),
    verify: ctrlWrapper(verify),
    resendVerify: ctrlWrapper(resendVerify),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
}