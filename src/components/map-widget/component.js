import L from 'leaflet-headless';

import {
  LAT_INIT,
  LON_INIT,
  ZOOM_INIT,
  LAYER
} from 'constants/map';

export const MapWidget = {
  init(mapId, options={}) {
    this.mapWidget$ = document.getElementById(mapId);
    this.map = L.map(mapId);
    this.layers = [
      L.tileLayer(LAYER, options).addTo(this.map)
    ];

    this.setView(LAT_INIT, LON_INIT, ZOOM_INIT);
  },

  setView(lat, lon, zoom) {
    this.map.setView([lat, lon], zoom);
  }
};
