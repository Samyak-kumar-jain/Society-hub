const cloudinary = require('cloudinary').v2;

const multer = require('multer');

cloudinary.config({
    cloud_name : 'dfcmfu0im',
    api_key : '666231456234892',
    api_secret : '_nKRTzz9JMxLxheRd5zXbIJyMdI'
})

const storage = new multer.memoryStorage();

const handleImageUpload = async (file)=>{
    const result = await cloudinary.uploader.upload(file,{resource_type:'auto'})
    return result;
}

const upload = multer({storage});
module.exports = {upload,handleImageUpload}