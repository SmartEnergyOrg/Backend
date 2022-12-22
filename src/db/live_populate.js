require("dotenv").config();

const { InfluxDB, Point } = require("@influxdata/influxdb-client");

/** Environment variables **/
const url = `${process.env.INFLUXDB_HOST || "http://localhost"}:${process.env.INFLUXDB_PORT}`;
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


const MINUTE_IN_MILLISECONDS = 60000;

async function addData() {
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
    const measurement = "solar";
    const solarAmount = Math.floor(Math.random() * 1000);
    const windAmount = Math.floor(Math.random() * 1000);
    
    const timestamp = new Date(currentTime);

    const windPoint = new Point("wind")
      .floatField("amount", windAmount)
      .timestamp(timestamp);
    console.log(`${windPoint}`);

    const point = new Point(measurement)
      .floatField("amount", solarAmount)
      .timestamp(timestamp);
    console.log(`${point}`);
      pointArray.push(windPoint)
    pointArray.push(point);
  writeApi.writePoints(pointArray);

  /**
   * Flush pending writes and close writeApi.
   **/
  writeApi.close().then(() => {
    console.log("WRITE FINISHED");
  });
}


const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
const livePopulate = async () => {
var error = false;
  while(!error){
    //Wait 5 secconds
    await snooze(5000);
    addData().catch((err) => {
      console.log(err);
      console.log("\nError during write");
      error = true;
    });
  }
};

livePopulate();
