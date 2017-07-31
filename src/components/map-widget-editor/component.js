export const MapWidgetEditor = {
  init(widgetId, mapWidget, initValue) {
    this.widget$ = document.getElementById(widgetId);
    this.mapWidget = mapWidget;
    this.widget$.value = initValue;
    this.layerId = this.widget$.getAttribute('data-layer');
    this.styleProperty = this.widget$.getAttribute('data-style-property');

    _updateDataShadow.call(this, initValue);

    this.widget$.addEventListener('input', this.onInput.bind(this), false);
    return this;
  },

  onInput(event) {
    let style = {};
    
    style[this.styleProperty] = this.widget$.value;
    this.mapWidget.updateGeoJSONStyle(this.layerId, style);

    _updateDataShadow.call(this, this.widget$.value);
  }
};

const _updateDataShadow = function(color) {
  this.widget$.style.setProperty('--data-shadow', color);
};
