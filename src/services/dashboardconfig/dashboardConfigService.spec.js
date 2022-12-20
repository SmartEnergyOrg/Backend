const { SqliteDataContext } = require("../../db/sqllite.client");
const DashboardConfigService = require("./dashboardConfig.service");

describe('Test dashboard config service', ()=>{
    var SqlDb;
    var DashboardService;

    beforeAll(async ()=>{
        SqlDb = new SqliteDataContext(":memory:");
        DashboardService = new DashboardConfigService(SqlDb);
    })

    beforeEach(()=>{
      const sql = SqlDb.GetDb();
        sql.serialize(async () => {
            SqlDb.setupTables();
            sql.run("DELETE FROM Dashboards WHERE DashboardId >= 1;");
            sql.run("INSERT OR IGNORE INTO Dashboards(UserId) VALUES(1);");
            sql.run("INSERT OR IGNORE INTO Dashboards(UserId) VALUES(2);");
        })
    })

    describe('Deletion of dashboard',()=>{
        test('Successful deletion of dashboard', async  ()=>{
            const result = await DashboardService.DeleteDashboard(1);
            
            const Dashboard = await DashboardService.GetOneDashboard(1);
            expect(result).toEqual(true);
            expect(Dashboard).toEqual(undefined);
        })

        test('Default dashboard still around', async ()=>{
            const result = await DashboardService.DeleteDashboard(0);
            console.log(await DashboardService.GetDashboards());
            const Dashboard = await DashboardService.GetOneDashboard(0);
            expect(result).toEqual(true);
            expect(Dashboard).toEqual({"DashboardId": 0, "ShowNavbar": 1, "UserId": 0});
        })
    })

    describe('Update of dashboard', ()=>{
        test('Successful update of dashboard', async ()=>{
            const UpdatedBody = { ShowNavbar: 0};

            const result =  await DashboardService.UpdateDashboard("", 1, UpdatedBody);

            expect(result).toEqual(true);
        })
    })

    describe('Creation of dashboard', ()=>{
        test('Successful creation of new dashboard', async ()=>{
            //TODO If a authentication system is used. A extra user needs to be created in the beforeAll methods.
            const UserId = 1;

            const result = await DashboardService.CreateDashboard(UserId);
            
            expect(result).toEqual(3);
        })
    })

    describe('Retrieval of dashboard', ()=>{
        test('Successful retrieval of dashboard', async ()=>{
            const DashboardId = 1;

            const result = await DashboardService.GetOneDashboard(DashboardId);

            expect(result).toEqual({DashboardId: 1, UserId: 1, ShowNavbar: 1});
        })

        test('Successful retrieval of all dashboards without parameters', async ()=>{

            const result = await DashboardService.GetDashboards();

            expect(result.length).toEqual(3);
            expect(result).toEqual([
                {ShowNavbar: 1, UserId: 0, DashboardId: 0},
                {ShowNavbar: 1, UserId: 1, DashboardId: 1},
                {ShowNavbar: 1, UserId: 2, DashboardId: 2}
            ]);
        })

        test('Successful retrieval of all dashboards with parameters', async ()=>{
            const UserId = 1;

            const result = await DashboardService.GetDashboards(UserId);

            expect(result.length).toEqual(1);
            expect(result).toEqual([{ShowNavbar: 1, UserId: 1, DashboardId: 1}]);
        })

        test('Successful retrieval of all dashboards without results', async ()=>{
            const UserId = 9999;

            const result = await DashboardService.GetDashboards(UserId);

            expect(result.length).toEqual(0);
            expect(result).toEqual([]);
        })
    })
})