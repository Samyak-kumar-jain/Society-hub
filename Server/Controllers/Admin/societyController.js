const { handleImageUpload } = require("../../Config/Cloudinary");
const Society = require('../../Models/SocietyForm'); // Make sure to adjust the path as needed

const handleImgUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64'); // Use `toString` instead of `toLocaleString`
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await handleImageUpload(url);
        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Error occurred during image upload',
        });
    }
};

const addSociety = async (req, res) => {
    try {
        const { image, logo, description, societyName, societyType, contactPersonName, contactEmail, contactPhone, socialMediaLinks, societyGoals, meetingFrequency, feedback, responsibilities } = req.body;

        // Log the received data for debugging
        console.log("Received data:", {
            image,
            logo,
            
            description,
            societyName,
            societyType,
            contactPersonName,
            contactEmail,
            contactPhone,
            socialMediaLinks,
            societyGoals,
            meetingFrequency,
            feedback,
            responsibilities,
        });

        const newSociety = new Society({
            image,
         
            description,
            societyName,
            societyType,
            contactPersonName,
            contactEmail,
            contactPhone,
            socialMediaLinks,
            societyGoals,
            meetingFrequency,
            feedback,
            responsibilities,
            logo,
        });
        
        await newSociety.save();
        console.log(newSociety, "newSociety");
        
        res.status(201).json({
            success: true,
            data: newSociety,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while adding society",
        });
    }
};


const fetchAllSocieties = async (req, res) => {
    try {
        const societyList = await Society.find({});
        return res.status(200).json({
            success: true,
            data: societyList,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching societies",
        });
    }
};

const editSociety = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, societyName, societyType, contactPersonName, contactEmail, contactPhone, socialMediaLinks, societyGoals, meetingFrequency, feedback, responsibilities } = req.body;

        const findSociety = await Society.findById(id);
        if (!findSociety) return res.status(404).json({
            success: false,
            message: "Society not found",
        });

        findSociety.image = image || findSociety.image;
      
        findSociety.description = description || findSociety.description;
        findSociety.societyName = societyName || findSociety.societyName;
        findSociety.societyType = societyType || findSociety.societyType;
        findSociety.contactPersonName = contactPersonName || findSociety.contactPersonName;
        findSociety.contactEmail = contactEmail || findSociety.contactEmail;
        findSociety.contactPhone = contactPhone || findSociety.contactPhone;
        findSociety.socialMediaLinks = socialMediaLinks || findSociety.socialMediaLinks;
        findSociety.societyGoals = societyGoals || findSociety.societyGoals;
        findSociety.meetingFrequency = meetingFrequency || findSociety.meetingFrequency;
        findSociety.feedback = feedback || findSociety.feedback;
        findSociety.responsibilities = responsibilities || findSociety.responsibilities;

        await findSociety.save();
        res.status(200).json({
            success: true,
            data: findSociety,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while editing society",
        });
    }
};

const deleteSociety = async (req, res) => {
    try {
        const { id } = req.params;
        const society = await Society.findByIdAndDelete(id);

        if (!society) {
            return res.status(404).json({
                success: false,
                message: "Society not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Society deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while deleting society",
        });
    }
};

module.exports = {
    handleImgUpload,
    fetchAllSocieties,
    addSociety,
    editSociety,
    deleteSociety,
};
