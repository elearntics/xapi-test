import { expect } from 'chai';
import { CartoApiService } from '../../../src/services/carto-api';

describe('Get data from Carto', function() {
  it('should be defined', function() {
    expect(CartoApiService).to.be.ok;
  });

  it('should be able to get data rows from Carto', function(done) {
    CartoApiService
      .setUser('elenatorro')
      .setDataset('public.cartodb_query')
      .getQuery('select *')
      .then((data) => {
        expect(data).to.be.ok;
        done();
      });
  });

  it('should be able to get data in GeoJSON format from Carto', function(done) {
    CartoApiService
      .setUser('elenatorro')
      .setDataset('public.cartodb_query')
      .getGeoJSON('select *')
      .then((data) => {
        expect(data).to.be.ok;
        done();
      });
  });
});
