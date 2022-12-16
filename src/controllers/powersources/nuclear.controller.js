const nuclearService = require("../../services/powersources/nuclear.service");

const getCompleteTimeline = async (req, res) => {
  const completeTimeline = await nuclearService.getCompleteTimeline();
  res.status(200).json({ completeTimeline });
};

module.exports = { getCompleteTimeline };
