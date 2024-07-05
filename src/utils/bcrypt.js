import bcrypt from "bcrypt";

export const hashed = async (password) => {
    const saltRounds = +process.env.BCRYPT_SALT || 10;
    return await bcrypt.hash(password, saltRounds);
};

export const compare = async (input, hashed) => {
    return await bcrypt.compare(input, hashed);
};