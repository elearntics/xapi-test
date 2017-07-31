import { expect } from 'chai';

import { MapWidgetEditor } from '../../../src/components/map-widget-editor/component';
import { MapWidget } from '../../../src/components/map-widget/component';

const MAP_WIDGET_EDITOR_ID = 'map-widget-editor-id';
const MapWidgetEditorTest = Object.assign({}, MapWidgetEditor);

const inputProperty = 'fillColor';
let mapWidgetEditor$;

describe('Unit:map-widget-editor:component', function() {
  describe('MapWidgetEditor Component', function() {

    before(function() {
      const mapWidgetEditorContainer$ = document.createElement('div');

      mapWidgetEditorContainer$.innerHTML = `<input
        id="${MAP_WIDGET_EDITOR_ID}"
        type="text"
        name="${inputProperty}"
        class="mwc-map-widget-editor--color"
        data-layer="layer1"
        data-style-property="fillColor">`;

      document.body.appendChild(mapWidgetEditorContainer$);
      mapWidgetEditor$ = mapWidgetEditorContainer$.children[0];
    });

    it('should exist', function() {
      expect(MapWidgetEditor).to.be.ok;
    });

    it('should be able to be initialized', function() {
      expect(MapWidgetEditorTest.init).to.be.ok;

      MapWidgetEditorTest.init(
        MAP_WIDGET_EDITOR_ID,
        MapWidget,
        inputProperty);

      expect(MapWidgetEditorTest.widget$).to.be.ok;
      expect(MapWidgetEditorTest.widget$.value).to.be.ok;
      expect(MapWidgetEditorTest.layerId).to.be.ok;
      expect(MapWidgetEditorTest.mapWidget).to.be.ok;
    });
  });
});
