const express = require('express');
const router = express.Router();
const {
    fetchAllUserSocieties,
    getSocietyById,
    joinSociety,
    leaveSociety,
    getBulletinsById
} = require("../../Controllers/User/userSocietyController");
const AuthMiddleware = require("../../Middleware/authMid/authMiddleware");

router.get("/societies", AuthMiddleware, fetchAllUserSocieties);
router.get("/societies/:id", AuthMiddleware, getSocietyById);
router.get("/societies/:id/bulletins", AuthMiddleware, getBulletinsById);
router.post("/societies/:id/join", AuthMiddleware, joinSociety);
router.post("/societies/:id/leave", AuthMiddleware, leaveSociety);

module.exports = router;
