import { ApiError } from "./ApiError.js";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  /** 🔒 MongoDB duplicate key error */
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "No Duplicates allowed",
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
