const { DatabaseInstance } = require("../db/InstanceOfDatabase");
const { CheckWeatherInput } = require("../services/input-validation.service");
const {
  mapWeatherSqlModelToJsModel,
} = require("../services/mapping/weather.mapper");
const WeatherService = require("../services/weather.service");

const database = DatabaseInstance();
const weatherService = new WeatherService(database);

const Validate = (req, res, next) => {
  try {
    const weather = req.body;
    CheckWeatherInput(weather);
    next();
  } catch (error) {
    res.status(400).json({ message: "Input failure", result: error.message });
  }
};

const GetOne = async (req, res) => {
  try {
    //Will return a single weather configuration, since an frontend owns one weather and runs on one device at a time.
    let weather = await weatherService.GetOne();
    weather = mapWeatherSqlModelToJsModel(weather);
    res.status(201).json({ message: "Search result", result: weather });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Search has failed", result: false, error });
  }
};

const Update = async (req, res) => {
  try {
    const weather = req.body;
    let newWeather = await weatherService.Update(weather);
    newWeather = mapWeatherSqlModelToJsModel(newWeather);
    res
      .status(201)
      .json({ message: "Update is completed", result: newWeather });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Update has failed", result: false, error });
  }
};

module.exports = { Validate, GetOne, Update };
