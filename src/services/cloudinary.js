import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
// Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_cloud_name, 
        api_key:process.env.CLOUDINARY_api_key, 
        api_secret:process.env.CLOUDINARY_api_secret
        
    });
   

    const uploaderOnCloudinary = async(localFilePath)=>{

        try {
            if(!localFilePath) return null

       const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type:'auto'

                // here we are calling the cloudinary uploader.upload function and passing filepath and file type into it and storing the response into a variable and returning the variable.url
            })
            fs.unlinkSync(localFilePath)
            return response.url
        } catch (error) {
            console.log("Cloudinary upload error:", error);
            fs.unlinkSync(localFilePath)
            return null

            // here we are unlinking or deleting the file from the temp folder if any error happens
        }

    }

    export default uploaderOnCloudinary