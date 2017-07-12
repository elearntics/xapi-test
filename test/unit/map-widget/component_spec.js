import { expect } from 'chai';

import jsdom from 'jsdom';
import { MapWidget } from '../../../src/components/map-widget/component';


describe('It should be a MapWidget Component', function() {
  before(function() {
    const MAP_HTML = '<div id="map-id"></div>';
    global.document = jsdom.jsdom(MAP_HTML);
    global.window = document.defaultView;
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
    MapWidget.init('map-id');
    expect(MapWidget.mapWidget$).to.be.ok;
    expect(MapWidget.map).to.be.ok;
  });
});
