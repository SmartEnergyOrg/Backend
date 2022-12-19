const influxdbService = require("../../services/influxdb/influxdb.service");

const id1 = {
  id: 1,
  measurement: "solar",
  defaultRange: "24h",
};

const id2 = {
  id: 2,
  measurement: "wind",
  defaultRange: "3d",
};

const poll = async (req, res) => {
  if (req.params.id == 1) {
    const result = await influxdbService.getDataByWidget(id1);

    res.status(200).json(result);
  } else if (req.params.id == 2) {
    const result = await influxdbService.getDataByWidget(id2);

    res.status(200).json(result);
  } else if (req.params.id == 3) {
    res.status(200).send("hello world");
  } else {
    res.status(400).end();
  }
};

module.exports = { pollWidget };
