const createCustomError = (message, name, status) => {
    const error = new Error(message);
    error.name = name;
    error.status = status;
    return error;
};

export { createCustomError };