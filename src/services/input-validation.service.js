const assert = require("assert");

const Input = {
  CheckWidgetInput(Widget, GraphsList, ISACTIVE) {
    try {
      assert(typeof Widget.Title == 'string', 'A title must be filled in');
      assert(typeof Widget.Range == 'string', 'A range must be filled in');
      assert(typeof Widget.Frequence == 'number', 'Frequence must be filled in');
      assert(typeof Widget.Position == 'number', 'Must have a postion');
      assert(GraphsList.length > 0, 'Must have at least one graph');
      assert(typeof ISACTIVE == 'boolean' || typeof ISACTIVE == 'number', 'ISACTIVE needs to be filled in');

      return true;
    } catch (error) {
      throw error;
    }
  },

  CheckGraphInput(Graph) {
    try {
      assert(typeof Graph.Measurement == 'string', 'Measurement needs to be filled in');
      assert(typeof Graph.Name == 'string', 'Name needs to be filled in');
      assert(typeof Graph.Type == 'string', 'Type needs to be filled in');
      assert(typeof Graph.Color == 'string', 'Color needs to be filled in');

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Input;
