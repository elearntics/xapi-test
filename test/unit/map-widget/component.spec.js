import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import fetch from 'node-fetch';
import { expect } from 'chai';

import { MapWidget } from '../../../src/components/map-widget/component';
import { CartoApiService } from '../../../src/services/carto-api';
import { GeoJSONDataset } from '../../utils/geojson-dataset';
import { LeafletSetup } from '../../utils/leaflet-setup';
import { DEFAULT_COLOR_RANGES } from 'constants/map';

const MAP_ID = 'map-widget-id';
const fetchResponse = {
  json() {
    return Promise.resolve(GeoJSONDataset);
  }
};

let sandbox, fetchStub, map$;

describe('Unit:map-widget:component', function() {
  describe('MapWidget Component Setup', function() {

    before(function() {
      LeafletSetup.addMap(map$, MAP_ID);
      chai.use(sinonChai);
      this.sinon = sandbox = sinon.sandbox.create();

      fetchStub = this.sinon
       .stub(fetch, 'Promise')
       .returns(Promise.resolve(fetchResponse));
    });


    it('should exist', function() {
      expect(MapWidget).to.be.ok;
    });

    it('should import leaflet', function() {
      expect(L).to.be.ok;
    });

    it('should have an init function', function() {
      expect(MapWidget.init).to.be.ok;
    });

    it('should have a map on init', function() {
      MapWidget.init(MAP_ID);
      expect(MapWidget.mapWidget$).to.be.ok;
      expect(MapWidget.map).to.be.ok;
    });

    it('should have defined an array of color range values', function() {
      expect(MapWidget.colorRangeValues).to.be.ok;
      expect(MapWidget.colorRangeValues.length).to.be.ok;
    });

    it('should be able to add a GeoJSON layer', function() {
      CartoApiService.initService('user', 'dataset');

      return MapWidget.getGeoJSONLayer('layer1', 'select *', '100')
        .then((data) => {
          expect(data).to.be.ok;
        });
    });

    it('should be able to set max and min property values from geojson properties', function() {
      expect(MapWidget.propertyRanges.aMax).to.equal('300');
      expect(MapWidget.propertyRanges.aMin).to.equal('100');
    });

    it('should be able to change the GeoJSON marker style', function() {
      const NewStyle = {
        fillColor: 'blue',
        color: 'red',
        shape: 'hexagon',
        radius: 10,
        fillOpacity: 0.5,
        weight: 3,
        fill: true
      };

      MapWidget.updateGeoJSONStyle('layer1', NewStyle);

      expect(MapWidget.markerStyle.fillColor).to.equal(NewStyle.fillColor);
      expect(MapWidget.markerStyle.color).to.equal(NewStyle.color);
      expect(MapWidget.markerStyle.shape).to.equal(NewStyle.shape);
      expect(MapWidget.markerStyle.radius).to.equal(NewStyle.radius);
      expect(MapWidget.markerStyle.fillOpacity).to.equal(NewStyle.fillOpacity);
      expect(MapWidget.markerStyle.weight).to.equal(NewStyle.weight);
      expect(MapWidget.markerStyle.fill).to.equal(NewStyle.fill);
    });

    it('should be able to activate color ranges for a given property if it is defined', function() {
      MapWidget.activateColorRanges('a');

      expect(MapWidget.colorRanges[0].color).to.equal(DEFAULT_COLOR_RANGES[0]);
      expect(MapWidget.colorRanges[0].value).to.equal(140);
      expect(MapWidget.colorRanges[1].color).to.equal(DEFAULT_COLOR_RANGES[1]);
      expect(MapWidget.colorRanges[1].value).to.equal(180);
      expect(MapWidget.colorRanges[2].color).to.equal(DEFAULT_COLOR_RANGES[2]);
      expect(MapWidget.colorRanges[2].value).to.equal(220);
      expect(MapWidget.colorRanges[3].color).to.equal(DEFAULT_COLOR_RANGES[3]);
      expect(MapWidget.colorRanges[3].value).to.equal(260);
      expect(MapWidget.colorRanges[4].color).to.equal(DEFAULT_COLOR_RANGES[4]);
      expect(MapWidget.colorRanges[4].value).to.equal(300);
    });

    it('should be able to update color ranges for a given property and layer if it is defined', function() {
      const NEW_COLOR_RANGES = [
        '#000000',
        '#000001',
        '#000010',
        '#000011',
        '#000101'
      ];

      MapWidget.updateGeoJSONColorRange('layer1', 'b', NEW_COLOR_RANGES);
      expect(MapWidget.propertyRanges.bMax).to.equal('500');
      expect(MapWidget.propertyRanges.bMin).to.equal('200');
      expect(MapWidget.colorRanges[0].color).to.equal(NEW_COLOR_RANGES[0]);
      expect(MapWidget.colorRanges[0].value).to.equal(260);
      expect(MapWidget.colorRanges[1].color).to.equal(NEW_COLOR_RANGES[1]);
      expect(MapWidget.colorRanges[1].value).to.equal(320);
      expect(MapWidget.colorRanges[2].color).to.equal(NEW_COLOR_RANGES[2]);
      expect(MapWidget.colorRanges[2].value).to.equal(380);
      expect(MapWidget.colorRanges[3].color).to.equal(NEW_COLOR_RANGES[3]);
      expect(MapWidget.colorRanges[3].value).to.equal(440);
      expect(MapWidget.colorRanges[4].color).to.equal(NEW_COLOR_RANGES[4]);
      expect(MapWidget.colorRanges[4].value).to.equal(500);
    });
  });
});
