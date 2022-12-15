const sqlLite = require("sqlite3").verbose();

const database = new sqlLite.Database("TestDb");

function TestDb() {
  database.serialize(() => {
    database.run("CREATE TABLE lorem (info TEXT)");
    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");

    for (let i = 0; i < 10; i++) {
      stmt.run(`Ipsum ${i}`);
    }

    stmt.finalize();

    database.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
      console.log(`${row.id}: ${row.info}`);
    });
  });
}

database.close();

module.exports = { TestDb };
