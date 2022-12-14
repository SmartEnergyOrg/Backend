const solarService = require("../../services/solar.service");

const getCompleteTimeline = (req, res) => {
  const completeTimeline = solarService.getCompleteTimeline();
  res.status(200).json({ completeTimeline });
};

module.exports = { getCompleteTimeline };
