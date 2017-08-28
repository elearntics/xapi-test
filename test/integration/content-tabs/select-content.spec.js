import { expect } from 'chai';

import { MapWidgetEditor } from '../../../src/components/map-widget-editor/component';
import { MapWidget } from '../../../src/components/map-widget/component';
import { LeafletSetup } from '../../utils/leaflet-setup';

const MAP_WIDGET_EDITOR_ID = 'map-widget-editor-id';
const MapWidgetFillColor = Object.assign({}, MapWidgetEditor);
const MapWidgetColor = Object.assign({}, MapWidgetEditor);
const MapWidgetFillOpacity = Object.assign({}, MapWidgetEditor);
const MapWidgetWeight = Object.assign({}, MapWidgetEditor);
const MapWidgetRadius = Object.assign({}, MapWidgetEditor);
const MAP_ID = 'map-widget-id-markers';

let
  mapWidgetEditorFillColor$,
  mapWidgetEditorColor$,
  mapWidgetEditorFillOpacity$,
  mapWidgetEditorWeight$,
  mapWidgetEditorRadius$,
  map$;

describe('Integration:edit-map', function() {
  describe('Edit Map Markers', function() {

    before(function() {
      LeafletSetup.addMap(map$, MAP_ID);
      let mapWidgetEditorContainer$ = document.createElement('div');

      mapWidgetEditorContainer$.innerHTML = `
        <input
          id="${MAP_WIDGET_EDITOR_ID}-fill-color"
          type="text"
          name="fillColor"
          class="eao-map-widget-editor--color"
          data-layer="layer1"
          data-style-property="fillColor">

        <input
          id="${MAP_WIDGET_EDITOR_ID}-color"
          type="text"
          name="color"
          class="eao-map-widget-editor--color"
          data-layer="layer1"
          data-style-property="color">

        <input
          id="${MAP_WIDGET_EDITOR_ID}-weight"
          type="text"
          name="weight"
          data-layer="layer1"
          data-style-property="weight">

        <input
          id="${MAP_WIDGET_EDITOR_ID}-fill-opacity"
          type="text"
          name="fillOpacity"
          data-layer="layer1"
          data-style-property="fillOpacity">

        <input
          id="${MAP_WIDGET_EDITOR_ID}-radius"
          type="text"
          name="radius"
          data-layer="layer1"
          data-style-property="radius">
        `;

      document.body.appendChild(mapWidgetEditorContainer$);
      mapWidgetEditorFillColor$ = mapWidgetEditorContainer$.children[0];
      mapWidgetEditorColor$ = mapWidgetEditorContainer$.children[1];
      mapWidgetEditorWeight$ = mapWidgetEditorContainer$.children[2];
      mapWidgetEditorFillOpacity$ = mapWidgetEditorContainer$.children[3];
      mapWidgetEditorRadius$ = mapWidgetEditorContainer$.children[4];

      MapWidgetFillColor.init(`${MAP_WIDGET_EDITOR_ID}-fill-color`, MapWidget, 'fillColor');
      MapWidgetColor.init(`${MAP_WIDGET_EDITOR_ID}-color`, MapWidget, 'color');
      MapWidgetWeight.init(`${MAP_WIDGET_EDITOR_ID}-weight`, MapWidget, 'weight');
      MapWidgetFillOpacity.init(`${MAP_WIDGET_EDITOR_ID}-fill-opacity`, MapWidget, 'fillOpacity');
      MapWidgetRadius.init(`${MAP_WIDGET_EDITOR_ID}-radius`, MapWidget, 'radius');
    });

    it('should be able to edit the fillColor property in the map', function(done) {
      const fillColor = 'red';
      const SECONDS_TO_FILL_COLOR = 1000;

      MapWidgetFillColor.widget$.value = fillColor;
      MapWidgetFillColor.onInput();

      setTimeout(function() {
        expect(MapWidget.markerStyle.fillColor).to.equal(fillColor);
        done();
      }, SECONDS_TO_FILL_COLOR);
    });

    it('should be able to edit the color property in the map', function(done) {
      const color = 'red';
      const MS_TO_SET_COLOR = 1000;

      MapWidgetColor.widget$.value = color;
      MapWidgetColor.onInput();

      setTimeout(function() {
        expect(MapWidget.markerStyle.color).to.equal(color);
        done();
      }, MS_TO_SET_COLOR);
    });

    it('should be able to edit the fillOpacity property in the map', function(done) {
      const fillOpacity = '0.5';
      const MS_TO_FILL_OPACITY = 1000;

      MapWidgetFillOpacity.widget$.value = fillOpacity;
      MapWidgetFillOpacity.onInput();

      setTimeout(function() {
        expect(MapWidget.markerStyle.fillOpacity).to.equal(fillOpacity);
        done();
      }, MS_TO_FILL_OPACITY);
    });

    it('should be able to edit the weight property in the map', function(done) {
      const weight = '10';
      const MS_TO_SET_WEIGHT = 1000;

      MapWidgetWeight.widget$.value = weight;
      MapWidgetWeight.onInput();

      setTimeout(function() {
        expect(MapWidget.markerStyle.weight).to.equal(weight);
        done();
      }, MS_TO_SET_WEIGHT);
    });

    it('should be able to edit the radius property in the map', function(done) {
      const radius = '5';
      const MS_TO_SET_RADIUS = 1000;

      MapWidgetRadius.widget$.value = radius;
      MapWidgetRadius.onInput();

      setTimeout(function() {
        expect(MapWidget.markerStyle.radius).to.equal(radius);
        done();
      }, MS_TO_SET_RADIUS);
    });
  });
});
