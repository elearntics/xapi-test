/* Inspired by: https://github.com/Esri/Leaflet.shapeMarkers/blob/master/src/ShapeMarker.js */

import L from 'leaflet';

L.shapeMarker = function(latlng, options) {
  return new L.ShapeMarker(latlng, options);
};

const Shapes = {
  triangle(p, r) {
    const point1 = `${(p.x - r)} ${ (p.y + r)}`;
    const point2 = `${(p.x)} ${ (p.y - r)}`;
    const point3 = `${(p.x + r)} ${ (p.y + r)}`;

    return `M${point1} L${point2} L${point3} Z`;
  },

  square(p, r) {
    const point1 = `${(p.x - r)} ${ (p.y - r)}`;
    const point2 = `${(p.x + r)} ${ (p.y - r)}`;
    const point3 = `${(p.x + r)} ${ (p.y + r)}`;
    const point4 = `${(p.x - r)} ${ (p.y + r)}`;

    return `M${point1} L${point2} L${point3} L${point4} L${point1}`;
  },

  hexagon(p, r) {
    const alpha = r / 2;
    const beta = Math.sqrt(3) * alpha;

    const point1 = `${p.x - beta} ${p.y - alpha}`;
    const point2 = `${p.x} ${p.y - (2 * alpha)}`;
    const point3 = `${p.x + beta} ${p.y - alpha}`;
    const point4 = `${p.x + beta} ${p.y + alpha}`;
    const point5 = `${p.x} ${p.y + (2 * alpha)}`;
    const point6 = `${p.x - beta} ${p.y + alpha}`;

    return `M${point1} L${point2} L${point3} L${point4} L${point5} L${point6} L${point1}`;
  }
};

L.SVG.include({
  _updateShape(layer) {
    const shape = layer.options.shape;

    if (Shapes[shape]) {
      const p = layer._point;
      const r = layer._radius * 1;
      const d = Shapes[shape](p, r);

      this._setPath(layer, d);
    } else {
      this._updateCircle(layer);
    }
  }
});

L.ShapeMarker = L.Path.extend({
  options: {
    fill: true
  },

  initialize: function(latlng, options) {
    L.setOptions(this, options);
    this._latlng = L.latLng(latlng);
    this._radius = this.options.radius;
  },

  setLatLng: function(latlng) {
    this._latlng = L.latLng(latlng);
    this.redraw();
    return this.fire('move', { latlng: this._latlng });
  },

  getLatLng: function() {
    return this._latlng;
  },

  setRadius: function(radius) {
    this.options.radius = this._radius = radius;
    return this.redraw();
  },

  getRadius: function() {
    return this._radius;
  },

  setStyle: function(options) {
    var radius = options && options.radius || this._radius;
    L.Path.prototype.setStyle.call(this, options);
    this.setRadius(radius);
    return this;
  },

  _project: function() {
    this._point = this._map.latLngToLayerPoint(this._latlng);
    this._updateBounds();
  },

  _updateBounds: function() {
    var r = this._radius,
      r2 = this._radiusY || r,
      w = this._clickTolerance(),
      p = [ r + w, r2 + w ];

    this._pxBounds = new L.Bounds(this._point.subtract(p), this._point.add(p));
  },

  _update: function() {
    if (this._map) {
      this._updatePath();
    }
  },

  _updatePath: function() {
    this._renderer._updateShape(this);
  },

  _empty: function() {
    return this._size && !this._renderer._bounds.intersects(this._pxBounds);
  },

  toGeoJSON: function() {
    return L.GeoJSON.getFeature(this, {
      type: 'Point',
      coordinates: L.GeoJSON.latLngToCoords(this.getLatLng())
    });
  }
});

export default Shapes;
