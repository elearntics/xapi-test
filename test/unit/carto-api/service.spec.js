import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import fetch from 'node-fetch';
import { expect } from 'chai';

import { CartoApiService } from '../../../src/services/carto-api';
import { GeoJSONDataset } from '../../utils/geojson-dataset';

const fetchResponse = {
  json() {
    return Promise.resolve(GeoJSONDataset);
  }
};

let sandbox, fetchStub;

describe('Unit:carto-api:service', function() {
  describe('Carto Api Service Setup', function() {

    before(function() {
      chai.use(sinonChai);
      this.sinon = sandbox = sinon.sandbox.create();

      fetchStub = this.sinon
       .stub(fetch, 'Promise')
       .returns(Promise.resolve(fetchResponse));
    });

    after(function() {
      sandbox.restore();
    });

    it('should be defined', function() {
      expect(CartoApiService).to.be.ok;
    });

    it('should have a set function to set both the user and the url', function() {
      expect(CartoApiService.setUser).to.be.ok;

      CartoApiService.setUser('user');
      expect(CartoApiService.user).to.be.equal('user');
      expect(CartoApiService.url).to.be
        .equal('http://user.carto.com/api/v2/sql?');
    });

    it('should have a set function to set the dataset', function() {
      expect(CartoApiService.setDataset).to.be.ok;
      CartoApiService.setDataset('dataset');
      expect(CartoApiService.dataset).to.be.equal('dataset');
    });

    it('should have a set function to get a query', function(done) {
      expect(CartoApiService.getQuery).to.be.ok;

      CartoApiService
        .setUser('user')
        .setDataset('dataset')
        .getQuery('select *')
        .then(() => {
          expect(fetchStub).to.have.been.called;
          done();
        });
    });

    it('should have a set function to get a GeoJSON object', function(done) {
      expect(CartoApiService.getGeoJSON).to.be.ok;

      CartoApiService
        .setUser('user')
        .setDataset('dataset')
        .getGeoJSON('select *')
        .then(() => {
          expect(fetchStub).to.have.been.called;
          done();
        });
    });
  });
});
