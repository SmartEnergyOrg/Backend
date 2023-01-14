const mapWeatherSqlModelToJsModel = (weatherSqlModel)=>{
    return { name: weatherSqlModel.Name, country: weatherSqlModel.Country, lat: weatherSqlModel.Lat, lon: weatherSqlModel.Lon };
}

module.exports = {mapWeatherSqlModelToJsModel}