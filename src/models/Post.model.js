import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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

UserSchema.plugin(mongooseAggregatePaginate)

export const post=mongoose.model("post",postSchema)