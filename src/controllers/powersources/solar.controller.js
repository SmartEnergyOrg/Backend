const solarService = require("../../services/powersources/solar.service");

const getCompleteTimeline = async (req, res) => {
  const completeTimeline = await solarService.getCompleteTimeline();
  res.status(200).json(completeTimeline);
};

module.exports = { getCompleteTimeline };
