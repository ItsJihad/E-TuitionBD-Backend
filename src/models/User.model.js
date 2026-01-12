import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password:{
        type:String,
        required:true,
        trim:true,
    },
    name:{
        type:String,
        required:true,
        trim:true
    },

    role: {
      type: String,
      required: true,
      enum: ["student", "teacher"],
    },

    Phone:{
      type:Number,
      required:true
    },

    avatar:{
      type:String,
      required:true
    },
    coverImage:{
      type:String,
      required:false
    }

  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
