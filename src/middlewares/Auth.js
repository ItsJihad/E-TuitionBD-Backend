import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { admin } from "./firebaseAuthCreds.js";

const FirebaseVerification = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization?.startsWith("Bearer ")) {
    throw new ApiError(401, "No token provided");
  }

  const token = authorization.split(" ")[1];
  const decoded = await admin.auth().verifyIdToken(token);

  const userDetails = await admin.auth().getUser(decoded.uid);

  if (!userDetails) {
    throw new ApiError(401, "forbidden");
  }

  req.CurrentUser = userDetails;

  next();
});

export default FirebaseVerification;
