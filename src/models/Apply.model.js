import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const ApplySchema= new Schema({

    teacher:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },


    posts:{
        type:mongoose.Types.ObjectId,
        ref:"post",
        required:true
    },


    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },




},{timestamps:true})

UserSchema.plugin(mongooseAggregatePaginate)

export const application = mongoose.model("application",ApplySchema)