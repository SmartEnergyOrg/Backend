const assert = require("assert");

const Input = {
  CheckWidgetInput(widget, graphsList, ISACTIVE) {
    try {
      assert(typeof widget.Title == "string", "A Position must be filled in");
      assert(typeof widget.Position == "number", "A Position must be filled in");
      assert(typeof widget.Icon == "string", "Icon must be filled in");
      assert(graphsList.length > 0, "Must have at least one graph");
      assert(
        typeof ISACTIVE == "boolean" || typeof ISACTIVE == "number",
        "ISACTIVE needs to be filled in"
      );

      return true;
    } catch (error) {
      throw error;
    }
  },

  CheckGraphInput(graph) {
    try {
      assert(
        typeof graph.Measurement == "string",
        "Measurement needs to be filled in"
      );
      assert(typeof graph.Name == "string", "Name needs to be filled in");
      assert(typeof graph.Type == "string", "Type needs to be filled in");
      assert(typeof graph.Color == "string", "Color needs to be filled in");

      return true;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Input;
