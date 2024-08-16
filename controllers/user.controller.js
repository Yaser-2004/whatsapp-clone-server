import userModel from "../models/user.model.js";

async function getUsersForSideBar(req, res) {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await userModel.find({_id: {$ne: loggedInUserId}}).select("-password") //all users without the self

        return res.status(200).json(filteredUsers);

    } catch (error) {
        console.log((error));
    }
}

export {getUsersForSideBar};