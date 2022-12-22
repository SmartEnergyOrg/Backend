const { AssertionError } = require("assert");
const { CheckSettingsInput, CheckWidgetInput, CheckGraphInput } = require("../InputValidation.service")


describe('Test inputvalidation of entities', ()=>{
    describe('Test if fields of setting is correct', ()=>{
        test('No Position', ()=>{
            const Settings = {ISACTIVE: 1};
            expect(() => CheckSettingsInput(Settings)).toThrow(AssertionError);
        })

        test('ISACTIVE is not a boolean or number', ()=>{
            const Settings = {Position: 1, ISACTIVE: "True"};
            expect(() => CheckSettingsInput(Settings)).toThrow(AssertionError);
        })

        test('ISACTIVE is a boolean', ()=>{
            const Settings = {Position: 1, ISACTIVE: true};
            expect(CheckSettingsInput(Settings)).toEqual(true);
        })

        test('ISACTIVE is a number', ()=>{
            const Settings = {Position: 1, ISACTIVE: 1};
            expect(CheckSettingsInput(Settings)).toEqual(true);
        })
    })

    describe('Test if fields of widget is correct', ()=>{
        test('No Title', ()=>{
            const Widget = {DefaultRange: "Range"};
            expect(() => CheckWidgetInput(Widget)).toThrow(AssertionError);
        })

        test('No Default range', ()=>{
            const Widget = {Title: "Nothing"};
            const list = [{Obj: 1}]
            expect(() => CheckWidgetInput(Widget, list)).toThrow(AssertionError);
        })

        test('No frequence', ()=>{
            const Widget = {Title: "Nothing", DefaultRange: "Range"};
            const list = [];
            expect(() => CheckWidgetInput(Widget, list)).toThrow(AssertionError);
        })

        test('No graphlist', ()=>{
            const Widget = {Title: "Nothing", DefaultRange: "Range", Frequence: 400};
            const list = [];
            expect(() => CheckWidgetInput(Widget, list)).toThrow(AssertionError);
        })
        test('Complete list', ()=>{
            const Widget = {Title: "Nothing", DefaultRange: "Range",  Frequence: 400};
            const list = [{Obj: 1}]
            expect(CheckWidgetInput(Widget, list)).toEqual(true);
        })
    })

    describe('Test if fields of Graph is correct', ()=>{
        test('No Graph_type', ()=>{
            const Widget = {Measurement: "Nothing", Name: "Range"};
            expect(() => CheckGraphInput(Widget)).toThrow(AssertionError);
        })

        test('No Measurement', ()=>{
            const Widget = {Name: "Range", Type_Graph:"Bar"};
            expect(() => CheckGraphInput(Widget)).toThrow(AssertionError);
        })

        test('No Name', ()=>{
            const Widget = {Measurement: "Nothing", Type_Graph:"Bar"};
            expect(() => CheckGraphInput(Widget)).toThrow(AssertionError);
        })

        test('Complete list', ()=>{
            const Widget = {Measurement: "Nothing", Name: "Range", Type_Graph:"Bar"};
            expect(CheckGraphInput(Widget)).toEqual(true);
        })
    })
})