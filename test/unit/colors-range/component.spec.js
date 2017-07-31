import { expect } from 'chai';

import { ColorsRange } from '../../../src/components/colors-range/component';

const COLORS_RANGE_ID = 'colors-range';
const COLORS_RANGE = [
  '#38e8aa',
  '#38bde8',
  '#0a55e6',
  '#8a0ae6',
  '#e60ad2'
];

let colorsRange$;
describe('Unit:colors-range:component', function() {
  describe('Colors Range Component', function() {
    before(function() {
      colorsRange$ = document.createElement('div');
      colorsRange$.setAttribute('id', COLORS_RANGE_ID);
      document.body.appendChild(colorsRange$);
    });

    it('should be defined', function() {
      expect(ColorsRange).to.be.ok;
    });

    it('should be able to be initialized', function() {

      expect(ColorsRange.init).to.be.ok;

      ColorsRange.init(COLORS_RANGE_ID, COLORS_RANGE);

      expect(ColorsRange.widget$).to.be.ok;
      expect(ColorsRange.widget$.children.length).to.be.equal(
        COLORS_RANGE.length);
      expect(ColorsRange.rangeValues).to.be.equal(COLORS_RANGE);

      ColorsRange.widget$.childNodes.forEach((colorBox$, index) => {
        expect(colorBox$.getAttribute('data-value')).to.be.equal(
          COLORS_RANGE[index]);
      });
    });
  });
});
