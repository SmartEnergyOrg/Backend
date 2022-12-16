const batteryService = require("../../services/powersources/battery.service");

const getCompleteTimeline = async (req, res) => {
  const completeTimeline = await batteryService.getCompleteTimeline();
  res.status(200).json({ completeTimeline });
};

module.exports = { getCompleteTimeline };
