const { SqliteDataContext } = require("../../db/sqllite.client");
const DashboardConfigService = require("../../services/dashboard.service");

describe('Test dashboard config service', ()=>{
    var SqlDb;
    var DashboardService;
    var Database;
    
    //TODO -> Inserts dummy widgets to dashboards.
    beforeEach(()=>{
        SqlDb = new SqliteDataContext(":memory:");
        DashboardService = new DashboardConfigService(SqlDb);
        Database = SqlDb.GetDb();
        Database.serialize(async () => {
            SqlDb.setupTables();
            Database.run("DELETE FROM Dashboards WHERE DashboardId >= 1;");
            Database.run("INSERT OR IGNORE INTO Dashboards(UserId) VALUES(1);");
            Database.run("INSERT OR IGNORE INTO Dashboards(UserId) VALUES(2);");
        })
    })

    describe('Deletion of dashboard',()=>{
        test('Successful deletion of dashboard', async  ()=>{
            const result = await DashboardService.Delete(1);
            
            const Dashboard = await DashboardService.GetOne(1);
            expect(result).toEqual(true);
            expect(Dashboard).toEqual(undefined);
        })

        test('Default dashboard still around', async ()=>{
            const result = await DashboardService.Delete(0);
            console.log(await DashboardService.GetAll());
            const Dashboard = await DashboardService.GetOne(0);
            expect(result).toEqual(true);
            expect(Dashboard).toEqual({
                "DashboardId": 0, 
                "ShowNavbar": 1, 
                "UserId": 0, 
                "NormalTariff": 0,
                "PeakTariff": 0,
                "PeakTariffOn": 0,
                "ShowWeather": 0
            });
        })
    })

    describe('Update of dashboard', ()=>{
        test('Successful update of dashboard', async ()=>{
            const UpdatedBody = { ShowNavbar: 0, PeakTariffOn: true, ShowWeather: true, NormalTariff: 19, PeakTariff: 21};

            const result =  await DashboardService.Update("", 1, UpdatedBody);
            const Dashboard = await DashboardService.GetOne(1);

            expect(result).toEqual(true);

            expect(Dashboard.ShowNavbar).toEqual(0);
            expect(Dashboard.PeakTariffOn).toEqual(1);
            expect(Dashboard.ShowWeather).toEqual(1);
            expect(Dashboard.NormalTariff).toEqual(19);
            expect(Dashboard.PeakTariff).toEqual(21);
        })
    })

    describe('Creation of dashboard', ()=>{
        test('Successful creation of new dashboard', async ()=>{
            //TODO If a authentication system is used. A extra user needs to be created in the beforeAll methods.
            const UserId = 1;
            const CreationBody = { ShowNavbar: 0, PeakTariffOn: true, ShowWeather: true, IdleTariff: 19, PeakTariff: 21};

            const result = await DashboardService.Create(UserId);

            //Checks if dashboard is present in the database
            const Dashboard = await DashboardService.GetOne(result);
            expect(result).toEqual(3);

            expect(Dashboard.DashboardId).toEqual(3);
            expect(Dashboard.UserId).toEqual(1);
            expect(Dashboard.ShowNavbar).toEqual(1);
            expect(Dashboard.PeakTariffOn).toEqual(0);
            expect(Dashboard.ShowWeather).toEqual(0);
            expect(Dashboard.NormalTariff).toEqual(0);
            expect(Dashboard.PeakTariff).toEqual(0);

        })
    })

    describe('Retrieval of dashboard', ()=>{
        test('Successful retrieval of dashboard', async ()=>{
            const DashboardId = 1;

            const result = await DashboardService.GetOne(DashboardId);

            expect(result).toEqual({
                DashboardId: 1, UserId: 1, ShowNavbar: 1, 
                "NormalTariff": 0,
                "PeakTariff": 0,
                "PeakTariffOn": 0,
                "ShowWeather": 0
            });
        })

        test('Successful retrieval of all dashboards without parameters', async ()=>{

            const result = await DashboardService.GetAll();

            expect(result.length).toEqual(3);
            expect(result).toEqual([
                {ShowNavbar: 1, UserId: 0, DashboardId: 0, 
                    "NormalTariff": 0,
                    "PeakTariff": 0,
                    "PeakTariffOn": 0,
                    "ShowWeather": 0},
                {ShowNavbar: 1, UserId: 1, DashboardId: 1, 
                    "NormalTariff": 0,
                    "PeakTariff": 0,
                    "PeakTariffOn": 0,
                    "ShowWeather": 0},
                {ShowNavbar: 1, UserId: 2, DashboardId: 2, 
                    "NormalTariff": 0,
                    "PeakTariff": 0,
                    "PeakTariffOn": 0,
                    "ShowWeather": 0}
            ]);
        })

        test('Successful retrieval of all dashboards with parameters', async ()=>{
            const UserId = 1;

            const result = await DashboardService.GetAll(UserId);

            expect(result.length).toEqual(1);
            expect(result).toEqual([{ShowNavbar: 1, UserId: 1, DashboardId: 1, 
                "NormalTariff": 0,
                "PeakTariff": 0,
                "PeakTariffOn": 0,
                "ShowWeather": 0}]);
        })

        test('Successful retrieval of all dashboards without results', async ()=>{
            const UserId = 9999;

            const result = await DashboardService.GetAll(UserId);

            expect(result.length).toEqual(0);
            expect(result).toEqual([]);
        })
    })

    afterEach(async ()=>{
        await Database.close();
    })
})