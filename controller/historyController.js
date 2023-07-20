const History = require("../model/Histories");

// @desc - all histories
// @route - POST '/history/gethistory'
// @access - public
const getHistory = async (req, res) => {
    const { adminId } = req?.body;
    if (!adminId) return res.status(400).json({ message: "adminId is required" });


    try {
        const histories = await History.find({ adminId });

        if (!histories) return res.status(204).json({ message: "No history found" });

        const result = [];
        histories?.map(history => {
            result.push({
                title: history?.title,
                type: history?.type,
                date: history?.date,
                adminId: history?.adminId,
                modificationId: history?._id?.toString(),
                members: history?.members,
            })
        })

        res.json(result);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getHistory,
};
