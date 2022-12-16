const windService = require("../../services/powersources/wind.service");

const getCompleteTimeline = async (req, res) => {
  const completeTimeline = await windService.getCompleteTimeline();
  res.status(200).json({ completeTimeline });
};

module.exports = { getCompleteTimeline };
