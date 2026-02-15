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
    location:{
      type:String,
      required:true
    },

    status: {
      type: String,
      enum: ["pending", "approved","rejected"],
      default: "pending",
    },



},{timestamps:true})

postSchema.plugin(mongooseAggregatePaginate)

export const Post = mongoose.model("Post",postSchema)