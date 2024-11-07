const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../../Middleware/authMid/authMiddleware')
const {addBulletin,deleteBulletin,UpdateBulletin,getUserBulletins} = require("../../Controllers/Admin/bulletinController")

router.post('/add', AuthMiddleware ,addBulletin);
router.put('/edit/:id',AuthMiddleware ,UpdateBulletin);
router.delete('/delete/:bulletinId',AuthMiddleware ,deleteBulletin);
router.get('/get-All-bulletins', AuthMiddleware , getUserBulletins);









module.exports = router;