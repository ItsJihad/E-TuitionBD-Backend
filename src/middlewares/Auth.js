import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { admin } from "./firebaseAuthCreds.js";
const FirebaseVerification = asyncHandler(async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization?.startsWith("Bearer ")) {
    throw new ApiError(401, "No token provided");
  }

  const token = authorization.split(" ")[1];

  const decoded = await admin.auth().verifyIdToken(token);

  const CurrentUser = {
    email: decoded.email,
    name: decoded.name,
  };

  console.log(`user from firebase Auth.js ${CurrentUser.email}`);

  return res.status(200).json(200, "user");
});

export default FirebaseVerification;
