import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

// cloudinary.config({
//     cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
//     api_key: `${process.env.CLOUDINARY_API_KEY}`,
//     api_secret: `${process.env.CLOUDINARY_API_SECRET}`
// });

cloudinary.config({ 
    cloud_name: 'serverbox', 
    api_key: '329361482385493', 
    api_secret: '6fYZJJmwkFVFectBLCpQNZpZ2yY' 
  });

async function uploadOnCloudinary(localFilePath) {
    try {
        if(!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });
        // console.log(`FILE UPLOADED ON CLOUDINARY ${response.url}`);

        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlink(localFilePath);
        console.log(error);
        return null;
    }
}

export {uploadOnCloudinary}

