const { SqliteDataContext } = require("./sqlite.client");

var Single;
function CreateDb() {
  return new SqliteDataContext("DashboardConfigDB");
}

function DatabaseInstance() {
  if (!Single) {
    Single = CreateDb();
  }
  return Single;
}

module.exports = { DatabaseInstance };
