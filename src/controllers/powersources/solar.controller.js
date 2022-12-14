const solarService = require("../../services/powersources/solar.service");

/**
 * Calls the getCompleteTimeline function on the service. Returns the result as a http response
 * @param req
 * @param res
 */
const getCompleteTimeline = (req, res) => {
  const completeTimeline = solarService.getCompleteTimeline();
  res.status(200).json({ completeTimeline });
};

module.exports = { getCompleteTimeline };
