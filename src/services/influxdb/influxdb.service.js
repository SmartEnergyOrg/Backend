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

  let queryParams = {
    range: null,
    filter: null,
  };

  //Filter Range
  {
    queryParams.range = `|> range(start: -${widget.DefaultRange})`;
  }

  //Construct Filter
  {
    queryParams.filter = `|> filter(fn: (r) => r._measurement == "${widget.Graphs[0].Measurement}"`;

    for (let i = 1; i < widget.Graphs.length; ++i) {
      queryParams.filter += ` or r._measurement == "${widget.Graphs[i].Measurement}"`;
    }
    queryParams.filter += ")";
  }

  const fluxQuery = `from(bucket: "${bucket}")
  ${queryParams.range}
  ${queryParams.filter}`;

  // fluxquery teruggeven
  return fluxQuery;
}

module.exports = { getDataByWidget };
