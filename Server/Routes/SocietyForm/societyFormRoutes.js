const express = require('express');
const router = express.Router();
const {handleImgUpload, addSociety,editSociety,deleteSociety,fetchAllSocieties,fetchAdminSocieties} = require('../../Controllers/Admin/societyController')
const {upload} = require('../../Config/Cloudinary')
const AuthMiddleware = require('../../Middleware/authMid/authMiddleware')

router.post('/upload-image', upload.single('my_file'),handleImgUpload)
router.post('/add', AuthMiddleware ,addSociety);
router.put('/edit/:id',editSociety);
router.delete('/delete/:id',deleteSociety);
router.get('/get-All-Society', fetchAllSocieties);
router.get('/admin-societies', AuthMiddleware, fetchAdminSocieties);

module.exports = router;