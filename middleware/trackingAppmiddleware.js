import { v2 as cloudinary } from "cloudinary";

var seecret = process.env.CLOUDINARYAPISECRET;
cloudinary.config({
  cloud_name: process.env.CLOUDINARYCLOUDNAME,
  api_key: process.env.CLUDINARYAPIKEY,
  api_secret: seecret,
  secure: true,
});

export default { cloudinary };
