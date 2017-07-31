import L from 'leaflet';
import 'utils/leaflet/svg-marker';
import { EmojiIcon } from 'utils/leaflet/emoji-marker';
import { CartoApiService } from 'services/carto-api';

import {
  LAYER,
  LAT_INIT,
  LON_INIT,
  ZOOM_INIT,
  DEFAULT_STYLE,
  DEFAULT_COLOR_RANGES
} from 'constants/map';

const EMOJI_LAYER = 'emojis';

export const MapWidget = {
  init(mapId, options={}) {
    this.mapWidget$ = document.getElementById(mapId);
    this.map = L.map(mapId);
    this.layers = {};
    this.data = {};
    this.properties = {};
    this.propertyRanges = {};
    this.colorRangeProperty = null;
    this.colorRangeValues = DEFAULT_COLOR_RANGES;
    this.markerStyle = DEFAULT_STYLE;

    L.tileLayer(LAYER, options).addTo(this.map);
    this.setView(LAT_INIT, LON_INIT, ZOOM_INIT);

    return this;
  },

  setView(lat, lon, zoom) {
    this.map.setView([lat, lon], zoom);
  },

  getGeoJSONLayer(layerId, query, limit) {
    return CartoApiService.getGeoJSON(query, limit)
      .then((data) => {
        this.data = data;
        this._setGeoJSONMarkers(layerId);
        return data;
    });
  },

  updateGeoJSONStyle(layerId, style) {
    let layer = this.layers[layerId];

    if (style) {
      this.markerStyle = Object.assign(this.markerStyle, style);
    }

    if (layer) {
      layer.eachLayer((marker) => {
        marker.setStyle(this.markerStyle);
        marker.options.shape = style.shape || marker.options.shape;
      });
    }

    return layer;
  },

  updateGeoJSONColorRange(layerId, property, rangeValues) {
    const layer = this.layers[layerId];
    const rangeColorPromises = [];
    this.colorRangeProperty = property || this.colorRangeProperty;
    this.colorRangeValues = rangeValues || this.colorRangeValues;

    if (layer && this.colorRangeProperty) {
      this.activateColorRanges();

      layer.eachLayer((marker) => {
        rangeColorPromises.push(this._updateRangeColor(marker));
      });
    }

    return Promise.all(rangeColorPromises);
  },

  calcProperties(layerId) {
    let layer = this.layers[layerId];

    if (layer) {
      layer.eachLayer((marker) => {
        this._updateMaxMinPropertyRanges(marker);
      });
    }

    return layer;
  },

  activateColorRanges(property) {
    property = property || this.colorRangeProperty;

    const RANGES_LENGTH = this.colorRangeValues.length;
    const maxValue = this.propertyRanges[`${property}Max`] * 1;
    const minValue = this.propertyRanges[`${property}Min`] * 1;

    if (RANGES_LENGTH && property && maxValue && minValue) {
      const rangeValue = (maxValue - minValue) / RANGES_LENGTH;
      this.colorRanges = [];

      for (let i = 0; i < RANGES_LENGTH; i++) {
        this.colorRanges.push({
          value: minValue + rangeValue * (i + 1),
          color: this.colorRangeValues[i]
        });
      }
    }
  },

  _setEmojiMarkers(emoji) {
    const icon = EmojiIcon.getIcon(emoji);

    const pointToLayer = function(feature, latlng) {
      return L.marker(latlng, { icon });
    };

    const options = { pointToLayer };

    this.layers[EMOJI_LAYER] = L.geoJSON(this.data, options).addTo(this.map);
  },

  _removeEmojiMarkers() {
    this.map.removeLayer(this.layers[EMOJI_LAYER]);
  },

  _setGeoJSONMarkers(layerId) {
    const pointToLayer = this._shapeMarker.bind(this);
    const onEachFeature = this._getProperties.bind(this);
    const options = { pointToLayer, onEachFeature };

    this.layers[layerId] = L.geoJSON(this.data, options).addTo(this.map);

    this.calcProperties(layerId);
  },

  _shapeMarker(feature, latlng) {
    return L.shapeMarker(latlng, this.markerStyle);
  },

  _getProperties(feature, layer) {
    if (feature.properties) {
      let properties = Object.keys(feature.properties);
      Object.assign(this.properties, properties);
    }
  },

  _getMaxProperty(property, marker) {
    const markerProperty = marker.feature.properties[property];
    const maxProperty = this.propertyRanges[`${property}Max`];

    return maxProperty && maxProperty > markerProperty
      ? maxProperty
      : markerProperty;
  },

  _getMinProperty(property, marker) {
    const markerProperty = marker.feature.properties[property];
    const minProperty = this.propertyRanges[`${property}Min`];

    return minProperty && minProperty <= markerProperty
      ? minProperty
      : markerProperty;
  },

  _getRangeColor(marker) {
    const value = marker.feature.properties[this.colorRangeProperty];

    return new Promise((resolve, reject) => {
      this.colorRanges.forEach((color) => {
        if (value && value <= color.value) {
          resolve(color.color);
        }
      });

      reject();
    });
  },

  _updateRangeColor(marker) {
    return new Promise((resolve, reject) => {
      this._getRangeColor(marker)
        .then((color) => {
          marker.setStyle({
            color: this.markerStyle.color,
            fillColor: color
          });
          resolve(marker);
        })
        .catch(() => {
          marker.setStyle({
            color: 'transparent',
            fillColor: 'transparent'
          });
          resolve(marker);
        });
    });
  },

  _updateMaxMinPropertyRanges(marker) {
    for (let property in marker.feature.properties) {
      this.propertyRanges[`${property}Max`] =
        this._getMaxProperty(property, marker);

      this.propertyRanges[`${property}Min`] =
        this._getMinProperty(property, marker);
    }
  }
};
