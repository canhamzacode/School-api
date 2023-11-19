const { CustomApiError } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.log(err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Something Went Wrong!!!" });
};

module.exports = errorHandlerMiddleware;
