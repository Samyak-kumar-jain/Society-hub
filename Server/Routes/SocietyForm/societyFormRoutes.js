const express = require('express');
const router = express.Router();
const {handleImgUpload, addSociety,editSociety,deleteSociety,fetchAllSocieties} = require('../../Controllers/Admin/societyController')
const {upload} = require('../../Config/Cloudinary')

router.post('/upload-image', upload.single('my_file'),handleImgUpload)
router.post('/add',addSociety);
router.put('/edit/:id',editSociety);
router.delete('/delete/:id',deleteSociety);
router.get('/get-All-Society', fetchAllSocieties);


module.exports = router;