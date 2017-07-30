import { expect } from 'chai';

import { DropdownSelect } from '../../../src/components/dropdown-select/component';
import { LeafletSetup } from '../../utils/leaflet-setup';
import { MapWidget } from '../../../src/components/map-widget/component';
import { CartoApiService } from '../../../src/services/carto-api';
import { CARTO_USERNAME, CARTO_DATASET } from '../../utils/carto-user';
import { DEFAULT_COLOR_RANGES } from 'constants/map';

const MAP_ID = 'map-widget-id-edit-property';
const DROPDOWN_SELECT_ID = 'dropdown-select-edit-property';
const LAYER_ID = 'layer1';
const MapFiltered = Object.assign({}, MapWidget);

let
  map$,
  mapWidgetContainer$,
  dropdownSelect$,
  dropdownSelectList$,
  dropdownSelectFirstButton$,
  _updateColorRange;

describe('Integration:edit-map', function() {
  describe('Edit Map Filter By Property', function() {

    before(function() {
      LeafletSetup.addMap(map$, MAP_ID);

      mapWidgetContainer$ = document.createElement('div');

      _updateColorRange = function(property) {
        MapFiltered.updateGeoJSONColorRange(LAYER_ID, property);
      };

      mapWidgetContainer$.innerHTML =
        `<div id="${DROPDOWN_SELECT_ID}" class="mwc-dropdown-select" tabindex="1">
          <ul class="mwc-dropdown"></ul>
          <p>Select Property</p>
         </div>`;

      document.body.appendChild(mapWidgetContainer$);

      CartoApiService.initService(CARTO_USERNAME, CARTO_DATASET);
      MapFiltered.init(MAP_ID);
    });

    it('should be able to update the markers color filtering by property', function(done) {
      const MS_TO_SET_COLOR_RANGES = 1000;

      MapFiltered.getGeoJSONLayer(LAYER_ID, 'select *', '100')
        .then((data) => {
          DropdownSelect.init(DROPDOWN_SELECT_ID, MapFiltered.properties, _updateColorRange);

          dropdownSelect$ = mapWidgetContainer$.children[0];
          dropdownSelectList$ = dropdownSelect$.children[0];
          dropdownSelectFirstButton$ = dropdownSelectList$.children[0].children[0];

          dropdownSelectList$.click();
          dropdownSelectFirstButton$.click();

          setTimeout(() => {
            expect(MapFiltered.colorRanges[0].color).to.equal(DEFAULT_COLOR_RANGES[0]);
            expect(MapFiltered.colorRanges[0].value).to.equal(140);
            expect(MapFiltered.colorRanges[1].color).to.equal(DEFAULT_COLOR_RANGES[1]);
            expect(MapFiltered.colorRanges[1].value).to.equal(180);
            expect(MapFiltered.colorRanges[2].color).to.equal(DEFAULT_COLOR_RANGES[2]);
            expect(MapFiltered.colorRanges[2].value).to.equal(220);
            expect(MapFiltered.colorRanges[3].color).to.equal(DEFAULT_COLOR_RANGES[3]);
            expect(MapFiltered.colorRanges[3].value).to.equal(260);
            expect(MapFiltered.colorRanges[4].color).to.equal(DEFAULT_COLOR_RANGES[4]);
            expect(MapFiltered.colorRanges[4].value).to.equal(300);
            done();
          }, MS_TO_SET_COLOR_RANGES);
        });
    });
  });
});
