const Society = require("../../Models/SocietyForm")
const bulletin = require("../../Models/bulletin")

const addBulletin = async (req, res) => {
    try {
        const { title, venue, societyName, description, link } = req.body;
        const userId = req.user.id;

        // Use findOne instead of find to get a single society document
        const society = await Society.findOne({ createdBy: userId });
        if (!society) {
            return res.status(404).json({
                success: false,
                message: "Society does not exist",
            });
        }

        // Create a new bulletin
        const newBulletin = new bulletin({ // Make sure the model is named Bulletin
            title,
            venue,
            societyName,
            description,
            link,
        });
        
        const saveBulletin = await newBulletin.save();

        // Push the new bulletin's ID into the society's bulletins array
        society.bulletins.push(saveBulletin._id);

        // Save the updated society document
        await society.save();

        // Return success response
        res.status(201).json({
            success:true,
            message: 'Bulletin added successfully',
            bulletin: saveBulletin,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while adding bulletin",
        });
    }
};

const deleteBulletin = async (req, res) => {
    const { bulletinId } = req.params;
    console.log('Bulletin ID to delete:', bulletinId);
    const userId = req.user.id;

    try {
        const society = await Society.findOne({ createdBy: userId });

        if (!society) {
            return res.status(404).json({ message: 'Society not found or you do not have permission to delete the bulletin' });
        }

        const findBulletin = await bulletin.findById(bulletinId);

        if (!findBulletin) {
            return res.status(404).json({ message: 'Bulletin not found' });
        }

        // Check if the bulletin belongs to the society
        if (!society.bulletins.includes(bulletinId)) {
            return res.status(403).json({ message: 'This bulletin does not belong to the specified society' });
        }

        // Remove the bulletin from the society's bulletins array
        console.log('Before pulling bulletin from society:', society.bulletins);
        society.bulletins.pull(bulletinId);
        console.log('After pulling bulletin from society:', society.bulletins);
        await society.save();
        console.log('Society updated successfully with bulletins:', society.bulletins);

        // Delete the bulletin from the Bulletins collection
        const deleteResult = await bulletin.deleteOne({ _id: bulletinId });
        console.log('Bulletin deletion result:', deleteResult);

        res.status(200).json({success:true, message: 'Bulletin deleted successfully' });
    } catch (error) {
        console.error('Error deleting bulletin:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getUserBulletins = async (req, res) => {
    const userId = req.user.id; 

    try {
        const societies = await Society.find({ createdBy: userId}).populate('bulletins');

        if (!societies.length) {
            return res.status(404).json({ message: 'No societies found for this user' });
        }

        const bulletins = societies.map(society => society.bulletins).flat();

        res.status(200).json({ data: bulletins });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const UpdateBulletin = async (req, res) => {
    try {
        const { id } = req.params; 
        console.log(`Bulletin ID: ${id}`); // Log the bulletin ID

        const { title, venue, description, link } = req.body; // Extract updated data from the request body
        console.log('Updated data:', { title, venue, description, link }); // Log the incoming update data

        // Find the society created by the user
        const society = await Society.findOne({ createdBy: req.user.id }).populate("bulletins");
        console.log('Society found:', society); // Log the found society

        // Check if the society exists
        if (!society) {
            console.log("Society not found");
            return res.status(404).json({
                success: false,
                message: "Society not found",
            });
        }

        // Find the bulletin by ID
        const bulletinToUpdate = await bulletin.findById(id);
        console.log('Bulletin found:', bulletinToUpdate); // Log the found bulletin

        // Check if the bulletin exists
        if (!bulletinToUpdate) {
            console.log("Bulletin not found");
            return res.status(404).json({
                success: false,
                message: "Bulletin not found",
            });
        }

       

        // Update the bulletin fields
        bulletinToUpdate.title = title || bulletinToUpdate.title;
        bulletinToUpdate.venue = venue || bulletinToUpdate.venue;
        bulletinToUpdate.description = description || bulletinToUpdate.description;
        bulletinToUpdate.link = link || bulletinToUpdate.link;
        console.log('Updated bulletin fields:', bulletinToUpdate); // Log the updated bulletin

        // Save the updated bulletin
        const updatedBulletin = await bulletinToUpdate.save();
        console.log('Bulletin updated successfully:', updatedBulletin); // Log the successfully updated bulletin

        // Respond with the updated bulletin
        res.status(200).json({
            success: true,
            message: "Bulletin updated successfully",
            bulletin: updatedBulletin,
        });
    } catch (error) {
        console.error("Error updating bulletin:", error); // Log the error
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};



module.exports = {addBulletin,deleteBulletin,getUserBulletins,UpdateBulletin};