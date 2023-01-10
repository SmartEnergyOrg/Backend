const assert = require("assert");


const Input = {
  CheckWidgetInput(widget, graphsList) {
    try {
      assert(typeof widget.Title == "string", "A Title must be filled in");
      assert(typeof widget.Position == "number", "A Position must be filled in");
      assert(typeof widget.Icon == "string", "Icon must be filled in");
      assert(graphsList.length > 0, "Must have at least one graph");

      return true;
    } catch (error) {
      throw error;
    }
  },

  CheckGraphInput(graph) {
    try {
      assert(typeof graph.Type == "string", "Type needs to be filled in");
      assert(typeof graph.Query == "string", "Query needs to be filled in");
      assert(typeof graph.Interval == "number", "Interval needs to be filled in");
      assert(typeof graph.Color == "string", "Color needs to be filled in");

      return true;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Input;
