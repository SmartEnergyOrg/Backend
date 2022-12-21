const assert = require("assert");

const Input = {

    CheckGraphInput(Graph){
        try {
            assert(typeof Graph.Measurement == 'string', 'Measurement needs to be filled in');
            assert(typeof Graph.Name == 'string', 'Measurement needs to be filled in');
            assert(typeof Graph.Type_Graph == 'string', 'Measurement needs to be filled in');
            return true;
        } catch (error) {
            throw error;
        }
    },

    CheckSettingsInput(Settings){
        try {
            assert(typeof Settings.Position == 'number', 'A position needs to be filled in');
            assert(typeof Settings.ISACTIVE == 'boolean' || typeof Settings.ISACTIVE == 'number', 'ISACTIVE needs to be filled in');
            return true;
        } catch (error) {
            throw error;
        }
    },

    CheckWidgetInput(Widget, GraphsList){
        try {
            //Checks if input is valid.
            assert(typeof Widget.Title == 'string', 'A title must be filled in');
            assert(typeof Widget.DefaultRange == 'string', 'A range must be filled in');
            assert(typeof Widget.Frequence == 'number', 'Frequence must be filled in');
            assert(GraphsList.length > 0, 'Must have at least one graph');
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Input;