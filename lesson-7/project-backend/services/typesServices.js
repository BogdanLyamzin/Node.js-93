import Type from "../models/Type.js";

export const getAllTypes = ()=> Type.find();

export const addType = data => Type.create(data);