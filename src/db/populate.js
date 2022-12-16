require("dotenv").config();

const { InfluxDB, Point } = require("@influxdata/influxdb-client");
const { DeleteAPI } = require("@influxdata/influxdb-client-apis");

/** Environment variables **/
const url = `${process.env.INFLUXDB_HOST}:${process.env.INFLUXDB_PORT}`;
const token = process.env.DOCKER_INFLUXDB_INIT_ADMIN_TOKEN;
const org = "SmartEnergy";
const bucket = "SmartEnergy";

console.log(`variables:
url: ${url}
token: ${token}
org: ${org}
bucket: ${bucket}\n`);

/**
 * Instantiate the InfluxDB client
 * with a configuration object.
 **/
const influxDB = new InfluxDB({ url, token });

/**
 * create a variable holding the DeleteAPI
 **/
const deleteApi = new DeleteAPI(influxDB);

/**
 * This function will delete all the data from the database
 */
async function deleteAllSolarData() {
  // define time interval for delete operation
  const stop = new Date();
  const start = new Date(1970);

  await deleteApi.postDelete({
    org,
    bucket,
    body: {
      start: start.toISOString(),
      stop: stop.toISOString(),
      predicate: '_measurement="solar"',
    },
  });
}

const MINUTE_IN_MILLISECONDS = 60000;

async function addSolarData() {
  /**
   * Create a write client from the getWriteApi method.
   * Provide your `org` and `bucket`.
   **/
  const writeApi = influxDB.getWriteApi(org, bucket);

  /**
   * Create a point and write it to the buffer.
   **/
  let pointArray = [];
  const currentTime = new Date();
  for (let i = 0; i < 100; i++) {
    const measurement = "solar";
    const amount = Math.floor(Math.random() * 1000);
    const timestamp = new Date(currentTime - i * MINUTE_IN_MILLISECONDS);

    const point = new Point(measurement)
      .floatField("amount", amount)
      .timestamp(timestamp);
    console.log(`${point}`);
    pointArray.push(point);
  }
  writeApi.writePoints(pointArray);

  /**
   * Flush pending writes and close writeApi.
   **/
  writeApi.close().then(() => {
    console.log("WRITE FINISHED");
  });
}

deleteAllSolarData()
  .then(() => {
    console.log("Sucessfully deleted");
  })
  .catch((err) => {
    console.log(err);
    console.log("\nError during deletion");
  });

addSolarData().catch((err) => {
  console.log(err);
  console.log("/nError during write");
});
