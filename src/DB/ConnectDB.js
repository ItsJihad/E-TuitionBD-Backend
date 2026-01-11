import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const DBinstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.MONGOUSER}`
    );

    console.log(`DB connected successfully at : ${DBinstance.connection.host}`);
  } catch (error) {
    console.log(`${process.env.MONGODB_URI}/${DB_Name}`);

    console.log(`mongoDB connection ERROR : ${error}`);
    process.exit(1);
  }
};

export { connectDB };
