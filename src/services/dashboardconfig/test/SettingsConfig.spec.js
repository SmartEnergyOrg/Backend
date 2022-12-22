const { SqliteDataContext } = require("../../../db/sqllite.client");
const WidgetSettingsService = require("../SettingsConfig.service");

describe('Test Settings retrieval', ()=>{
    var SqlDb;
    var SettingsService;
    var Database;

    beforeEach(()=>{
        SqlDb = new SqliteDataContext(":memory:");
        SettingsService = new WidgetSettingsService(SqlDb);
        Database = SqlDb.GetDb();
        Database.serialize(() => {
              SqlDb.setupTables();
              Database.run('DELETE FROM WidgetSettings;');
              Database.run("REPLACE INTO  Widgets(WidgetId, Title, DefaultRange, Color_Graph) VALUES(1, 'Widget voor gasverbruik', '24h', 'Blue');");
              Database.run("REPLACE INTO  Widgets(WidgetId, Title, DefaultRange, Color_Graph) VALUES(2, 'Widget voor gasverbruik', '24h', 'Blue');");
              Database.run('REPLACE INTO  WidgetSettings (SettingId, Position, ISACTIVE, WidgetId) VALUES(12, 1, 1, 2)');
          })
      })

      describe('Create', ()=>{
        test('Test creation', async()=>{
            const Params = { Position: 1, WidgetId: 1 };
            const result = await SettingsService.CreateSettings(Params);

            expect(result).toEqual(13);
        })
      })

      describe('Update', ()=>{
        test('Test update settings', async()=>{
            const Params = { Position: 5, ISACTIVE: 0 };

            const res = await SettingsService.UpdateSettings(12, Params);
            expect(res).toEqual(true);
        })
        
      })

      describe('Read', ()=>{
        test('Get one settings', async()=>{
            const result = await SettingsService.GetSettings(2);

            expect(result.SettingId).toEqual(12);
            expect(result.Position).toEqual(1);
            expect(result.ISACTIVE).toEqual(1);
            expect(result.WidgetId).toEqual(2);
        })
      })
      afterAll(async()=>{
        await Database.close();
    })
})