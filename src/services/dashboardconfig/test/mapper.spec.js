const { MapJoinResultToWidget, MapJoinResultArray } = require('../Mapping/Graph.Mapper');
function Sum(One , Two){
    return One + Two;
}
const mainData = {
    WidgetId: 2,
    DashboardId: 0,
    Title: 'Grafiek blauw',
    DefaultRange: 19,
    Color_Graph: 'Blue',
    Frequence: 40000,
  };

const DummyData =[
    {
        WidgetId: 2,
        DashboardId: 0,
        Title: 'Grafiek blauw',
        DefaultRange: 19,
        Color_Graph: 'Blue',
        SettingId: 2,
        Position: 1,
        ISACTIVE: 1,
        GraphId: 2,
        Name: 'Gaskamer',
        Type_Graph: 'Bar',
        Measurement: 'Kwh',
        Frequence: 40000,
    },
    {
      WidgetId: 2,
      DashboardId: 0,
      Title: 'Grafiek blauw',
      DefaultRange: 19,
      Color_Graph: 'Blue',
      SettingId: 2,
      Position: 1,
      ISACTIVE: 1,
      GraphId: 3,
      Name: 'Oliekamer',
      Type_Graph: 'Lijn',
      Measurement: 'Kwh',
      Frequence: 40000,
    },
  ];

const JoinResult =  [
    {
      WidgetId: 1,
      DashboardId: 0,
      Title: 'Grafiek blauw',
      DefaultRange: 19,
      Color_Graph: 'Blue',
      SettingId: 1,
      Position: 1,
      ISACTIVE: 1,
      GraphId: 1,
      Name: 'Gaskamer',
      Type_Graph: 'Bar',
      Measurement: 'Kwh',
      Frequence: 40000
    },
    {
      WidgetId: 2,
      DashboardId: 0,
      Title: 'Grafiek blauw',
      DefaultRange: 19,
      Color_Graph: 'Blue',
      SettingId: 2,
      Position: 1,
      ISACTIVE: 1,
      GraphId: 2,
      Name: 'Gaskamer',
      Type_Graph: 'Bar',
      Measurement: 'Kwh',
      Frequence: 40000
    },
    {
      WidgetId: 2,
      DashboardId: 0,
      Title: 'Grafiek blauw',
      DefaultRange: 19,
      Color_Graph: 'Blue',
      SettingId: 2,
      Position: 1,
      ISACTIVE: 1,
      GraphId: 3,
      Name: 'Oliekamer',
      Type_Graph: 'Lijn',
      Measurement: 'Kwh',
      Frequence: 40000,
    },
    {
      WidgetId: 3,
      DashboardId: 0,
      Title: 'Grafiek blauw',
      DefaultRange: 19,
      Color_Graph: 'Blue',
      SettingId: 3,
      Position: 1,
      ISACTIVE: 1,
      GraphId: 4,
      Name: 'Gaskamer',
      Type_Graph: 'Bar',
      Measurement: 'Kwh',
      Frequence: 40000,
    },
    {
      WidgetId: 3,
      DashboardId: 0,
      Title: 'Grafiek blauw',
      DefaultRange: 19,
      Color_Graph: 'Blue',
      SettingId: 3,
      Position: 1,
      ISACTIVE: 1,
      GraphId: 5,
      Name: 'Oliekamer',
      Type_Graph: 'Lijn',
      Measurement: 'Kwh',
      Frequence: 40000,
    },
    {
      WidgetId: 3,
      DashboardId: 0,
      Title: 'Grafiek blauw',
      DefaultRange: 19,
      Color_Graph: 'Blue',
      SettingId: 3,
      Position: 1,
      ISACTIVE: 1,
      GraphId: 6,
      Name: 'Windkamer',
      Type_Graph: 'Cirkel',
      Measurement: 'Kwh',
      Frequence: 40000,
    }
  ]

describe('Test join result mapper', ()=>{
    test('Map solo mapper Widgetresult', ()=>{
        const result = MapJoinResultToWidget(DummyData, mainData);
        expect(result).toEqual({
            "Color_Graph": "Blue", 
            "DashboardId": 0, 
            "DefaultRange": 19, 
            "Title": "Grafiek blauw",
            "WidgetId": 2,
            "Frequence": 40000,
            "Graphs": [
                {
                    "GraphId": 2, 
                    "Measurement": "Kwh", 
                    "Name": "Gaskamer", 
                    "Query": undefined, 
                    "Type_Graph": "Bar"
                }, 
                {
                    "GraphId": 3, 
                    "Measurement": "Kwh", 
                    "Name": "Oliekamer", 
                    "Query": undefined, 
                    "Type_Graph": "Lijn"
                }], 
                "Settings": {
                  "ISACTIVE": 1, 
                  "Position": 1, 
                  "SettingId": 2
                }, 
              });
    })
    
    test('Map list of join result mapper Widgetresult', ()=>{
        const result = MapJoinResultArray(JoinResult);

        const list = result.map(v => v.WidgetId);
        expect(list.length).toEqual(3);
        expect(result.length).toEqual(3);
    })

    test('Map list of join result mapper Widgetresult', ()=>{
        const result = MapJoinResultToWidget([{One: "Hello", Two: "Uiansad"}, {One: "Ola", Two: "IUHB"}], {Main: "Hellow"});

        expect(result).toBeDefined();
    })

    test('Test with no results', ()=>{
        const result = MapJoinResultArray([]);
        expect(result.length).toEqual(0);
    })

    test('Test with unrelated stuff', ()=>{
        const result = MapJoinResultArray([{One: "1", Two: 12}, {One: "2", Two: 12}, {One: "1", Two: 12}]);
        expect(result.length).toEqual(1);
    })
})

