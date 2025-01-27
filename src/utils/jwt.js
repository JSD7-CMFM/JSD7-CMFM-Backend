import jwt from 'jsonwebtoken';

export const sign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY || "key", {
        algorithm: process.env.JWT_ALGORITHM || "HS384",
        expiresIn: process.env.JWT_EXPIRES || "1d",
    });
};
//test