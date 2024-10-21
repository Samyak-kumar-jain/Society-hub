const cloudinary = require('cloudinary').v2;

const multer = require('multer');

cloudinary.config({
    cloud_name : 'drfwbbmlc',
    api_key : '537765998927998',
    api_secret : 'MDELw6o1Az6BleGvf6EAWTkWim0'
})

const storage = new multer.memoryStorage();

const handleIMageUpload = async (file)=>{
    const result = await cloudinary.uploader.upload(file,{resource_type:'auto'})
    return result;
}

const upload = multer({storage});
module.exports = {upload,handleIMageUpload}