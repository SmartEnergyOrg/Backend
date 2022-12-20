// const widgetController = require("./widget.controller");
//
// describe("WidgetController", () => {
//   let influxdbService;
//
//   beforeAll(async () => {
//     const getDataByWidget = jest.fn();
//     influxdbService = {
//       getDataByWidget,
//     };
//   });
//
//   describe("poll", () => {
//     test("It should return solar information if ID is 1", async () => {
//       const exampleData = [
//         {
//           result: "_result",
//           table: 0,
//           _start: "2022-12-18T17:09:00.79819052Z",
//           _stop: "2022-12-19T17:09:00.79819052Z",
//           _time: "2022-12-18T21:17:05.213Z",
//           _value: 357,
//           _field: "amount",
//           _measurement: "solar",
//         },
//       ];
//
//       influxdbService.getDataByWidget.mockImplementation(
//         async () => exampleData
//       );
//
//       const result = await widgetController.poll();
//
//       expect(result[0]).toHaveProperty("_measurement", "solar");
//     });
//   });
// });
const InfluxDbService = require("../../services/influxdb/influxdb.service");
describe("widget controller", () => {
  test("it should return solar information if ID is correct", async () => {
    const exampleData = [
      {
        result: "_result",
        table: 0,
        _start: "2022-12-18T17:09:00.79819052Z",
        _stop: "2022-12-19T17:09:00.79819052Z",
        _time: "2022-12-18T21:17:05.213Z",
        _value: 357,
        _field: "amount",
        _measurement: "solar",
      },
    ];

    const getDataByWidgetServiceMock = jest
      .spyOn(InfluxDbService, "getDataByWidget")
      .mockImplementation(async () => exampleData);

    await InfluxDbService.getDataByWidget(1);

    expect(getDataByWidgetServiceMock).toBeCalledTimes(1);
  });
});
