const Society = require("../../Models/SocietyForm")
const Bulletin = require("../../Models/bulletin")

const fetchAllUserSocieties = async (req, res) => {
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
const getSocietyById = async (req,res) =>{
    try{
     const {id} = req.params;
    const findSociety = await Society.findById(id);

    if(!findSociety){
        res.status(404).json({
            success:false,
            message:"society Not Found"
        })
    }

    res.status(200).json({
        success:true,
        messgae:"society found",
        data: findSociety
    })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in getting society"
        })
    }


}
const joinSociety = async (req, res) => {
    try {
        const { id } = req.params; 
        const userId = req.user?.id; 

      

        // Check if `userId` is undefined, indicating an issue with authentication
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const society = await Society.findById(id);

        // Log if the society is not found
        if (!society) {
            return res.status(404).json({
                success: false,
                message: "Society not found"
            });
        }

        // Log if the user is already a member
        if (society.members.includes(userId)) {
            return res.status(200).json({
                success: true,
                message: "You are already a member of this society"
            });
        }

        // Add user ID to the members array and save
        society.members.push(userId);
        await society.save();

        // Log successful membership addition

        res.status(200).json({
            success: true,
            message: "You have successfully joined the society",
            data: society
        });

    } catch (error) {
        // Log any unexpected errors
        res.status(500).json({
            success: false,
            message: "Error joining society"
        });
    }
};

const leaveSociety = async (req, res) => {
    try {
        const { id } = req.params; // Society ID from request parameters
        const userId = req.user?.id; // User ID from authentication middleware

        // Find the society by ID
        const society = await Society.findById(id);

        if (!society) {
            return res.status(404).json({
                success: false,
                message: "Society not found"
            });
        }

        // Check if the user is a member
        const isMember = society.members.includes(userId);
        if (!isMember) {
            return res.status(400).json({
                success: false,
                message: "You are not a member of this society"
            });
        }

        society.members = society.members.filter(memberId => !memberId.equals(userId));
        await society.save();

        res.status(200).json({
            success: true,
            message: "You have successfully left the society",
            data: society
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error leaving society"
        });
    }
};
const getBulletinsById = async (req,res) =>{
    try {
        const { id } = req.params;
        const userId = req.user.id; // Assumes user ID is available on req.user from the auth middleware

        // Find the society by ID and populate only the bulletins field
        const society = await Society.findById(id).populate('bulletins'); // `-__v` excludes version field

        if (!society) {
            return res.status(404).json({
                success: false,
                message: "Society not found"
            });
        }

        // Check if the user is a member of the society
        const isMember = society.members.includes(userId);

        if (!isMember) {
            return res.status(403).json({
                success: false,
                message: "You must join the society to view its bulletins"
            });
        }

        // Return only the bulletins if the user is a member
        res.status(200).json({
            success: true,
            message: "Bulletins found",
            data: society.bulletins
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in fetching bulletins"
        });
    }
}






module.exports = {fetchAllUserSocieties, getSocietyById, joinSociety,leaveSociety,getBulletinsById }
