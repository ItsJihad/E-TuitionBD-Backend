import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: false,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["student", "teacher","admin"],
    },

    phone: {
      type: Number,
      required: false,
    },


    refreshToken:{
      type:String
    },
  },
  { timestamps: true }
);

UserSchema.plugin(mongooseAggregatePaginate);
// Aggregate paginate is a plugin that helps to CRUD in the DB files. thats all i know for now.
// lets see later how it works.

// need to hash the password while saving (use of bcrypt)
UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});




export  const User = mongoose.model("User", UserSchema);
