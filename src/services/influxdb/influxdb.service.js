require("dotenv").config();

const queryApi = require("../../db/client");
const bucket = process.env.INFLUXDB_BUCKET ?? "SmartEnergy";

async function getDataByWidget(widget) {
  //query bouw functie aanroepen
  const fluxQuery = buildFluxQuery(widget);

  //query uitvoeren
  return await queryApi.collectRows(fluxQuery);
}

// query bouw functie
function buildFluxQuery(widget) {
  // fluxquery bouwen
  const fluxQuery = `from(bucket: "${bucket}")
  |> range(start: -${widget.defaultRange})
  |> filter(fn: (r) => r._measurement == "${widget.measurement}")`;

  // fluxquery teruggeven
  return fluxQuery;
}

module.exports = { getDataByWidget };
