import { expect } from 'chai';

import { MapWidget } from '../../../src/components/map-widget/component';
import { CartoApiService } from '../../../src/services/carto-api';

import { CARTO_USERNAME, CARTO_DATASET } from '../../utils/carto-user';
import { LeafletSetup } from '../../utils/leaflet-setup';

let map$;

describe('Integration:carto-map-data', function() {
  describe('Get data from Carto', function() {
    before(function() {
      LeafletSetup.addMap(map$, 'map-id');
    });

    it('should be able to get data rows from Carto', function(done) {
      CartoApiService
        .initService(CARTO_USERNAME, CARTO_DATASET)
        .getQuery('select *')
        .then((data) => {
          expect(data).to.be.ok;
          done();
        });
    });

    it('should be able to get data in GeoJSON format from Carto', function(done) {
      CartoApiService
        .setUser(CARTO_USERNAME)
        .setDataset(CARTO_DATASET)
        .getGeoJSON('select *')
        .then((data) => {
          expect(data).to.be.ok;
          done();
        });
    });

    it('should be able to add a GeoJSOn layer', function(done) {
      MapWidget
        .init('map-id')
        .getGeoJSONLayer('layer1', 'select *', '100')
        .then((data) => {
          expect(data).to.be.ok;
          done();
        });
    });
  });
});
