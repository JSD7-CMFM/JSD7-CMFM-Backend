// const notFound = (req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl} on the Server`);
//   error.status = "Not Found";
//   error.statuscode = 404;
//   next(error);
// };

// const errorAll = (err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     status: "error",
//     message: err.message,
//     field: err.field,
//   });
// };

// const errorMiddleware = { notFound, errorAll };

// export default errorMiddleware;

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl} on the Server`);
  error.status = "Not Found";
  error.statusCode = 404;
  next(error);
};

const errorAll = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    field: err.field,
  });
};

const errorMiddleware = { notFound, errorAll };

export default errorMiddleware;
