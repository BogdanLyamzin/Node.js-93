import {Schema, model} from "mongoose";

import {handleSaveError, setUpdateSettings} from "./hooks.js";

const typeSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
}, {versionKey: false, timestamps: true});

typeSchema.post("save", handleSaveError);

typeSchema.pre("findOneAndUpdate", setUpdateSettings);

typeSchema.post("findOneAndUpdate", handleSaveError);

const Type = model("type", typeSchema);

export default Type;