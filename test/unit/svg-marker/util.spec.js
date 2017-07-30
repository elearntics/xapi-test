import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { expect } from 'chai';

import L from 'leaflet';
import '../../../src/utils/leaflet/svg-marker';
import Shapes from '../../../src/utils/leaflet/svg-marker';

const setOptionsStub = sinon.stub(L, 'setOptions');

const FLOAT_RGX = /\-?\d*\.?\d*/g;
const SPACE_RGX = /\s/g;
const M_RGX = /\M/g;
const L_RGX = /\L/g;
const Z_RGX = /\Z/g;

describe('Utils:leaflet:svg-marker', function() {
  describe('ShapeMarker Leaflet Extension', function() {
    before(function() {
      chai.use(sinonChai);
    });

    it('should be defined', function() {
      expect(L.ShapeMarker).to.be.ok;
      expect(setOptionsStub).to.have.been.called;
    });

    it('should have been a triangle shape', function() {
      expect(Shapes.triangle).to.be.ok;
    });

    it('should build a correct svg triangle', function() {
      const TriangleRegex = new RegExp(
        M_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        L_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        L_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        Z_RGX.source
      );

      const radius = 10;
      const triangle = Shapes.triangle({x: 0, y: 0}, radius);

      expect(triangle.match(TriangleRegex)).to.be.ok;
    });


    it('should have been a square shape defined', function() {
      expect(Shapes.square).to.be.ok;
    });

    it('should build a correct svg square', function() {
      const SquareRegex = new RegExp(
        M_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        L_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        L_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        L_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        L_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        FLOAT_RGX.source
      );

      const radius = 10;
      const square = Shapes.square({x: 0, y: 0}, radius);

      expect(square.match(SquareRegex)).to.be.ok;
    });

    it('should have been a hexagon shape defined', function() {
      expect(Shapes.hexagon).to.be.ok;
    });

    it('should build a correct svg hexagon', function() {
      const HexagonRegex = new RegExp(
        M_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        L_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        L_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        L_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        L_RGX.source +
        FLOAT_RGX.source +
        SPACE_RGX.source +
        FLOAT_RGX.source
      );

      const radius = 10;
      const hexagon = Shapes.hexagon({x: 0, y: 0}, radius);

      expect(hexagon.match(HexagonRegex)).to.be.ok;
    });
  });
});
