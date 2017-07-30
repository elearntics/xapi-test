export const WidgetRange = {
  init(widgetId, mapWidget, rangeValues, layerId, callback) {
    this.widget$ = document.getElementById(widgetId);
    this.mapWidget = mapWidget;
    this.layerId = layerId;
    this.rangeValues$ = [];
    this.rangeValues = rangeValues;
    this.callback = callback;
    this.setValues();
  },

  setValues() {
    this.rangeValues.forEach((rangeValue, index) => {
      let rangeValue$ = document.createElement('div');

      rangeValue$.setAttribute('data-index', index);
      rangeValue$.setAttribute('data-value', rangeValue);
      rangeValue$.style.backgroundColor = rangeValue;
      rangeValue$.classList.add('mwc-widget-range-color');
      this.rangeValues$.push(rangeValue$);
      this.widget$.appendChild(rangeValue$);
    });
  }
};
