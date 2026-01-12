import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import { connectDB } from "./DB/ConnectDB.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`Server is Running at :${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`DB Connect failed : ${error}`);
  });
