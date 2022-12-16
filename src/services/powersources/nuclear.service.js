const queryApi = require("../../db/client");

async function getCompleteTimeline() {
  const fluxQuery = `from(bucket: "SmartEnergy")
 |> range(start: -10h)
 |> filter(fn: (r) => r._measurement == "nuclear")
 |> sort()`;

  return await queryApi.collectRows(fluxQuery);
}

module.exports = { getCompleteTimeline };
