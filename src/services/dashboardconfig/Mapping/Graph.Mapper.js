
const MapJoinResultToWidget = (JoinResult, main)=>{
    try {
        let Widget = { 
            WidgetId: main.WidgetId,
            DashboardId: main.DashboardId,
            Title: main.Title,
            DefaultRange: main.DefaultRange,
            Type_Graph: main.Type_Graph,
            Color_Graph: main.Color_Graph,
            Graphs: [],
            Settings: {
                SettingId: JoinResult[0].SettingId,
                Position: JoinResult[0].Position,
                ISACTIVE: JoinResult[0].ISACTIVE
            } };
        
            JoinResult.forEach(widget => {
            Widget.Graphs.push({
                GraphId:widget.GraphId,
                Name: widget.Name,
                Query: widget.Query,
                Type_Graph: widget.Type_Graph,
                Measurement: widget.Measurement})
        });
        return Widget;
    } catch (error) {
        //Als er niks gevonden is.
        return null;
    }
    
}


const MapJoinResultArray = (JoinResult) => {
    let List = [];

    JoinResult.forEach(widget =>{

        if(List.length == 0 || List[List.length -1].WidgetId != widget.WidgetId){
            let Widget = {
                WidgetId: widget.WidgetId, 
                DashboardId: widget.DashboardId, 
                Title: widget.Title, 
                DefaultRange: widget.DefaultRange, 
                Type_Graph: widget.Type_Graph,
                Color_Graph: widget.Color_Graph,
                Settings: {
                    SettingId: widget.SettingId,
                    Position: widget.Position,
                    ISACTIVE: widget.ISACTIVE,
                    GraphId: widget.GraphId
                },
                Graphs: [{
                    Name: widget.Name,
                    Type_Graph: widget.Type_Graph,
                    Measurement: widget.Measurement
                }]
                };
            List.push(Widget);
        }else if(List[List.length -1].WidgetId == widget.WidgetId){
            let PickedWidget = List.pop();
            PickedWidget.Graphs.push({Name: widget.Name, Type_Graph: widget.Type_Graph, Measurement: widget.Measurement});
            List.push(PickedWidget);
        } 
    })

    return List;
}
module.exports = { MapJoinResultToWidget, MapJoinResultArray };