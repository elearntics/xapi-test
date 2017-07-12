import fetch from 'node-fetch';

export const CartoApiService = {
  setUser(user) {
    this.user = user;
    this.url = `http://${user}.carto.com/api/v2/`;
    return this;
  },
  setDataset(dataset) {
    this.dataset = dataset;
    return this;
  },
  getQuery(query) {
    return fetch(`${this.url}sql?q=${query} from ${this.dataset}`);
  },
  getGeoJSON(query) {
    return fetch(`${this.url}sql?format=GeoJSONq=${query} from ${this.dataset}`);
  }
};
