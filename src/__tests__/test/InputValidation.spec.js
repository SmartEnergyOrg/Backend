const { AssertionError } = require("assert");
const {
  CheckWidgetInput,
  CheckGraphInput,
} = require("../../services/input-validation.service");

//Valid Models
const validGraph = {
  Type: "bar",
  Query: "FLUXQUERY",
  Interval: 30,
  Color: "#000000"
}

const validWidget = {
  Title: "Nieuwe widget",
  Icon: "IconURL",
  Position: 1,
}

describe("Test inputvalidation of entities", () => {
  describe("Test if fields of widget is correct", () => {
    test("No Title", () => {
      const Widget = { Range: "Range" };
      expect(() => CheckWidgetInput(Widget, [], Widget.ISACTIVE)).toThrow(
        AssertionError
      );
    });

    test("No Default range", () => {
      const Widget = { Title: "Nothing" };
      const list = [{ Obj: 1 }];
      expect(() => CheckWidgetInput(Widget, list, Widget.ISACTIVE)).toThrow(
        AssertionError
      );
    });

    test("No frequence", () => {
      const Widget = { Title: "Nothing", Range: "Range" };
      const list = [];
      expect(() => CheckWidgetInput(Widget, list, Widget.ISACTIVE)).toThrow(
        AssertionError
      );
    });

    test("No graphlist", () => {
      const Widget = { Title: "Nothing", Range: "Range", Frequence: 400 };
      const list = [];
      expect(() => CheckWidgetInput(Widget, list, Widget.ISACTIVE)).toThrow(
        AssertionError
      );
    });
    test("Must have a position", () => {
      const Widget = { Title: "Nothing", Range: "Range", Frequence: 400 };
      const list = [{ Obj: 1 }];
      expect(() => CheckWidgetInput(Widget, list, Widget.ISACTIVE)).toThrow(
        AssertionError
      );
    });

    test("Has correct input", () => {
      const Widget = validWidget;
      const list = [validGraph];
      expect(CheckWidgetInput(Widget, list)).toEqual(true);
    });
  });

  describe("Test if fields of Graph is correct", () => {
    test("No Graph_type", () => {
      const Widget = { Measurement: "Nothing", Name: "Range" };
      expect(() => CheckGraphInput(Widget)).toThrow(AssertionError);
    });

    test("No Measurement", () => {
      const Widget = { Name: "Range", Type: "Bar" };
      expect(() => CheckGraphInput(Widget)).toThrow(AssertionError);
    });

    test("No Name", () => {
      const Widget = { Measurement: "Nothing", Type: "Bar" };
      expect(() => CheckGraphInput(Widget)).toThrow(AssertionError);
    });

    test("No color", () => {
      const Widget = { Measurement: "Nothing", Type: "Bar", Name: "Range" };
      expect(() => CheckGraphInput(Widget)).toThrow(AssertionError);
    });

    test("Complete list", () => {
      const graph = validGraph;
      expect(CheckGraphInput(graph)).toEqual(true);
    });
  });
});
