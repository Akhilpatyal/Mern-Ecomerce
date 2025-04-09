import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';

dotenv.config();
const router=express.Router();

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// multer setup using memory storage
const storage=multer.memoryStorage();
const upload=multer({storage});

// create router
router.post('/', upload.array('images', 10), async (req, res) => {
    // handle file upload
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // function to handle stream upload to cloudinary
        const streamUpload=(fileBuffer)=>{
            return new Promise((resolve,reject)=>{
                const stream=cloudinary.uploader.upload_stream((error,result)=>{
                    if (result) {
                        resolve(result);
                    }else{
                        reject(error);
                    }
                })
                // use streamifier to convert file buffer to stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };

        // call the stream upload function for each file
        const result=await streamUpload(req.file.buffer);

        // respond with the upload images url
        res.json({imageUrl:result.secure_url});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal error' });
        
    }
});
export default router;