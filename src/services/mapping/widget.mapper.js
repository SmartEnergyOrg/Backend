const MapWidgetsToArray = (widgets) => {
  let list = [];
  widgets.forEach((widget) => {
    widget = MapWidgetToObject(widget);
    list.push(widget);
  });

  return list;
};

const MapWidgetToObject = (widget) => {
  widget = JSON.parse(widget.data);

  let Widget = {
    WidgetId: widget.WidgetId,
    Title: widget.Title,
    Position: widget.Position,
    Icon: widget.Icon,
    Graphs: widget.Graphs,
  };
  console.log(Widget);
  return Widget;
};

module.exports = { MapWidgetToObject, MapWidgetsToArray };
