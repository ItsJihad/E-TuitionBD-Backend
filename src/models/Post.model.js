import mongoose,{Schema} from "mongoose";

const postSchema= new Schema({

    student:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    subject: {
      type: String,
      required: true,
    },

    classLevel: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },



},{timestamps:true})

export const post=mongoose.model("post",postSchema)