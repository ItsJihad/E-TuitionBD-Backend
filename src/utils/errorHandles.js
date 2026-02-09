import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  /** 🔒 MongoDB duplicate key error */
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "You have already applied to this post",
    });
  }

  /** Custom API errors */
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
    });
  }

  /** Fallback */
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export default errorHandler;
