
const MapJoinResultToWidget = (JoinResult, main)=>{
    try {
        let Widget = { 
            WidgetId: main.WidgetId,
            DashboardId: main.DashboardId,
            Title: main.Title,
            Time_Period: main.Time_Period,
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
                PowerSource: widget.PowerSource})
        });
        return Widget;
    } catch (error) {
        //Als er niks gevonden is.
        return null;
    }
    
}

module.exports = { MapJoinResultToWidget };