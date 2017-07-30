import fetch from 'node-fetch';
import { GeoJSONDataset } from '/utils/geojson-dataset';

export const CartoApiService = {
  user: null,

  dataset: null,

  url: null,

  local: false,

  initService(user, dataset, local) {
    return this
      .setUser(user)
      .setDataset(dataset)
      .setLocal(local);
  },

  setUser(user) {
    this.user = user;
    this.url = `http://${user}.carto.com/api/v2/sql?`;
    return this;
  },

  setDataset(dataset) {
    this.dataset = dataset;
    return this;
  },

  setLocal(local=false) {
    this.local = local;
    return this;
  },

  getQuery(query) {
    const QUERY = `q=${query} from ${this.dataset}`;
    return fetch(`${this.url}${QUERY}`);
  },

  getGeoJSON(query, limit) {
    const LIMIT = limit ? `limit ${limit}` : 'limit 500';
    const FORMAT = 'format=GeoJSON';
    const QUERY = `q=${query} from ${this.dataset} ${LIMIT}`;

    return this.local
      ? _getLocalGeoJson()
      : fetch(`${this.url}${FORMAT}&${QUERY}`)
        .then((res) => res.json())
        .catch((err) => err);

  }
};

const _getLocalGeoJson = function() {
  return new Promise((resolve, reject) => {
    resolve(GeoJSONDataset);
  });
};
