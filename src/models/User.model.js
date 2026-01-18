import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

    password: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["student", "teacher"],
    },

    phone: {
      type: Number,
      required: true,
    },

    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: false,
    },

    refreshToken:{
      type:String
    }
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


// compare or validate the password while signin using bcrypt

UserSchema.methods.ValidatePass= async function(password){
 return await bcrypt.compare(password,this.password)

 /* so mainly what happens here. we are making a custom method via using 'Schema.methods.METHODNAME'
  and as bcrypt can encrypt the pass, it can also decrypt or validate the pass.
  and what it takes a function where it uses the compare method and it takes the user inputted password and stored hashed password {this.password}
 
 */
}

 //now we'll need to use the JWT and design Token validations
 UserSchema.methods.AccessTokenGenerator= function(){
  return jwt.sign(
    {
      _id:this._id,
      email:this.email,
      username:this.username
      //this is the payload , or we can say which data we are holding in the token
    },
    process.env.ACCESS_TOKEN_SECRET, // token secret
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY // expiry secret
    }
  )
 }



 UserSchema.methods.RefreshTokenGenerator= function(){
  return jwt.sign(
    {
      _id:this._id,
      
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
 }



export const User = mongoose.model("User", UserSchema);
