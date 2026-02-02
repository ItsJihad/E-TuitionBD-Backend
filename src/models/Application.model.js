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
        ref:"Post",
        required:true
    },


    qualification: {
      type: String,
      required: true,
    },
    experience:{
      type:String,
      required:true
    },
    expectedSalary:{
      type:Number,
      required:true
    }
    ,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },




},{timestamps:true})

ApplySchema.plugin(mongooseAggregatePaginate)

export const application = mongoose.model("application",ApplySchema)