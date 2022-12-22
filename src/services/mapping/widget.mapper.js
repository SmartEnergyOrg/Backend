
const MapWidgetsToArray = (widgets) => {
  let list = []
  widgets.forEach(widget => {
    widget = JSON.parse(widget.data)

    let Widget = {
      WidgetId: widget.WidgetId,
      DashboardId: widget.DashboardId,
      Title: widget.Title,
      Range: widget.Range,
      Frequence: widget.Frequence,
      Position: widget.Position,
      IsActive: !!widget.ISACTIVE,
      Graphs: widget.Graphs
    };

    list.push(Widget);
  });

  return list;
}

const MapWidgetToObject = (widget) => {
  widget = JSON.parse(widget.data)

  let Widget = {
    WidgetId: widget.WidgetId,
    DashboardId: widget.DashboardId,
    Title: widget.Title,
    Range: widget.Range,
    Frequence: widget.Frequence,
    Position: widget.Position,
    IsActive: !!widget.ISACTIVE,
    Graphs: widget.Graphs
  };
  console.log(Widget);
  return Widget
}

module.exports = { MapWidgetToObject, MapWidgetsToArray };
