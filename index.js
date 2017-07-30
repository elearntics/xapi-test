import { MapWidget } from './src/components/map-widget/component';
import { MapWidgetEditor } from './src/components/map-widget-editor/component';
import { DropdownSelect } from './src/components/dropdown-select/component';
import { ColorsRange } from './src/components/colors-range/component';
import { CartoApiService } from './src/services/carto-api';
import { EasterEgg } from './src/services/easter-egg';
import { DEFAULT_STYLE } from './src/constants/map';
import { MarkerShapes } from './src/constants/marker-shapes';

const WidgetBackgroundColor = Object.assign({}, MapWidgetEditor);
const WidgetBorderColor = Object.assign({}, MapWidgetEditor);
const WidgetOpacity = Object.assign({}, MapWidgetEditor);
const WidgetWeight = Object.assign({}, MapWidgetEditor);
const WidgetRadius = Object.assign({}, MapWidgetEditor);
const WidgetColorRange = Object.assign({}, ColorsRange);

const DropdownSelectProperty = Object.assign({}, DropdownSelect);
const DropdownSelectShape = Object.assign({}, DropdownSelect);

const MAIN_LAYER_ID = 'layer1';
const LOAD_LOCAL_DATA = false;

CartoApiService.initService('elenatorro', 'public.cartodb_query', LOAD_LOCAL_DATA);

MapWidget
  .init('mwc-map-widget')
  .getGeoJSONLayer(MAIN_LAYER_ID, 'select *', '500')
  .then(() => {
    WidgetBackgroundColor.init('mwc-marker-color', MapWidget, DEFAULT_STYLE.fillColor);
    WidgetBorderColor.init('mwc-marker-border-color', MapWidget, DEFAULT_STYLE.color);
    WidgetOpacity.init('mwc-marker-opacity', MapWidget, DEFAULT_STYLE.fillOpacity);
    WidgetWeight.init('mwc-marker-weight', MapWidget, DEFAULT_STYLE.weight);
    WidgetRadius.init('mwc-marker-radius', MapWidget, DEFAULT_STYLE.radius);
    MapWidget.calcProperties(MAIN_LAYER_ID);

    WidgetColorRange.init(
      'mwc-color-range',
      MapWidget.colorRangeValues);

    DropdownSelectProperty.init(
      'mwc-dropdown-select-property',
      MapWidget.properties,
      _updateColorRange);

    DropdownSelectShape.init(
      'mwc-dropdown-select-shape',
      MarkerShapes,
      _updateShape);
  });

  const _updateShape = function(shape) {
    MapWidget.updateGeoJSONStyle(MAIN_LAYER_ID, {shape});
  };

  const _updateColorRange = function(property) {
    MapWidget.updateGeoJSONColorRange(MAIN_LAYER_ID, property);
  };

/* Yes, this is the tiny easter egg */

window.showEmojis = function(emoji) {
  EasterEgg.showEmojis(MapWidget, emoji);
};

window.hideEmojis = function(emoji) {
  EasterEgg.hideEmojis(MapWidget);
};
