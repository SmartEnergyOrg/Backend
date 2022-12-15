require("dotenv").config();

const { InfluxDB } = require("@influxdata/influxdb-client");

/** Environment variables **/
const url = `${process.env.INFLUXDB_HOST}:${process.env.INFLUXDB_PORT}`;
const token = process.env.INFLUXDB_TOKEN;
const org = "SmartEnergy";
const bucket = "SmartEnergy";

/**
 * Instantiate the InfluxDB client
 * with a configuration object.
 **/
const influxDB = new InfluxDB({ url, token });

/**
 * Create a write client from the getWriteApi method.
 * Provide your `org` and `bucket`.
 **/
const client = influxDB.getQueryApi(org, bucket);

module.exports = client;
