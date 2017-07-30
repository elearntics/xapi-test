export const LeafletSetup = {
  id: 0,

  addMap(map$, mapId) {
    map$ = document.createElement('div');
    map$.setAttribute('id', mapId);
    document.body.appendChild(map$);
  },

  default() {
    let map$;
    this.id = this.id + 1;
    this.addMap(map$, this.id);
  }
};
