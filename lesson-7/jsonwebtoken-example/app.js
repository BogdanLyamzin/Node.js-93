import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    id: "65ef4c33bd912d22db188c16"
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);
try {
    const {id} = jwt.verify(token, JWT_SECRET);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWY0YzMzYmQ5MTJkMjJkYjE4OGMxNiIsImlhdCI6MTcxMDE4MjUzNCwiZXhwIjoxNzEwMjY1MzM0fQ.T2WNF2a2hkV0qbHYexJFpuhiRAqxmu4A84pSRLZf5Z2";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}