const {
  MapWidgetsToArray,
  MapWidgetToObject,
} = require("../../services/mapping/widget.mapper");

const data = {
  data: `{"WidgetId":1,"DashboardId":12,"Title":"sblauw","Range":"34h","Frequence":40000,"IsActive":1,"Position":1,"Graphs":[{"Name":"Gasverbruik volgend jaar","Measurement":"Gas","Type":"Cirs","Color":"red"},{"Name":"Gertjan","Measurement":"wind","Type":"Cirs","Color":"red"},{"Name":"Josef","Measurement":"solar","Type":"Bar","Color":"red"}]}`,
};
const dataList = [
  {
    data: '{"WidgetId":1,"DashboardId":12,"Title":"sblauw","Range":"34h","Frequence":40000,"IsActive":1,"Position":1,"Graphs":[{"Name":"Gasverbruik volgend jaar","Measurement":"Gas","Type":"Cirs","Color":"red"},{"Name":"Gertjan","Measurement":"wind","Type":"Cirs","Color":"red"},{"Name":"Josef","Measurement":"solar","Type":"Bar","Color":"red"}]}',
  },
  {
    data: '{"WidgetId":2,"DashboardId":12,"Title":"sblauw","Range":"34h","Frequence":40000,"IsActive":1,"Position":1,"Graphs":[{"Name":"Gasverbruik volgend jaar","Measurement":"Gas","Type":"Cirs","Color":"red"},{"Name":"Gertjan","Measurement":"wind","Type":"Cirs","Color":"red"},{"Name":"Josef","Measurement":"solar","Type":"Bar","Color":"red"}]}',
  },
];
const noResult = {
  data: '{"WidgetId":null,"DashboardId":null,"Title":null,"Range":null,"Frequence":null,"IsActive":null,"Position":null,"Graphs":[]}',
};
describe("Test join result mapper", () => {
  test("Map solo mapper Widgetresult", () => {
    const result = MapWidgetToObject(data);
    expect(result).toEqual({
      WidgetId: 1,
      DashboardId: 12,
      Title: "sblauw",
      Range: "34h",
      Frequence: 40000,
      Position: 1,
      IsActive: false,
      Graphs: [
        {
          Name: "Gasverbruik volgend jaar",
          Measurement: "Gas",
          Type: "Cirs",
          Color: "red",
        },
        {
          Name: "Gertjan",
          Measurement: "wind",
          Type: "Cirs",
          Color: "red",
        },
        { Name: "Josef", Measurement: "solar", Type: "Bar", Color: "red" },
      ],
    });
  });

  test("Map list of join result mapper Widgetresult", () => {
    const result = MapWidgetsToArray(dataList);
    const list = result.map((v) => v.WidgetId);
    expect(list.length).toEqual(2);
  });

  test("Test with no results", () => {
    const result = MapWidgetToObject(noResult);
    expect(result.WidgetId).toEqual(null);
  });

  test("Map list of join result mapper Widgetresult", () => {
    const result = MapWidgetsToArray(dataList);
    expect(result).toBeDefined();
  });
});
