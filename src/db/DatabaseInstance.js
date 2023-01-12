const { SqliteDataContext } = require("./sqlite.client");

var Single;
function CreateDb() {
  return new SqliteDataContext("DashboardConfigDB");
}

function InstanceOfDB() {
  if (!Single) {
    Single = CreateDb();
  }
  return Single;
}

module.exports = { InstanceOfDB };
