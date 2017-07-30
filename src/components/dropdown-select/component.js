export const DropdownSelect = {
  init(dropdownId, dataList, callback) {
    this.dropdownId = dropdownId;
    this.dropdown$ = document.getElementById(dropdownId);
    this.showValue = !!this.dropdown$.getAttribute('data-show-value');
    this.dropdownList$ = this.dropdown$.children[0];
    this.selectedItem$ = this.dropdown$.children[1];

    this.callback = callback;
    this.isActive = false;
    this.selected = null;

    this.dropdown$.addEventListener(
      'click',
      this.toggleActiveClass.bind(this),
      false);

    this.setData(dataList);
    return this;
  },

  toggleActiveClass() {
    const activeClass = 'mwc-dropdown-active';
    const toggle = this.isActive ? 'remove' : 'add';
    this.isActive = !this.isActive;
    this.dropdown$.classList[toggle](activeClass);
  },

  setData(dataList) {
    if (dataList) {
      let li$, button$;
      for (let dataElement in dataList) {
        li$ = document.createElement('li');
        button$ = document.createElement('button');
        button$.innerText = this.showValue ?  dataElement : dataList[dataElement];
        button$.setAttribute(`data-${this.dropdownId}`, dataList[dataElement]);
        button$.addEventListener('click', this._selectItem.bind(this), false);
        li$.appendChild(button$);
        this.dropdownList$.appendChild(li$);
      }
    }
  },

  _selectItem(event) {
    event.preventDefault();
    this.selected = event.target.getAttribute(`data-${this.dropdownId}`);
    this.selectedItem$.innerText = this.selected;

    if (this.callback) {
      this.callback.call(this, this.selected);
    }
  }
};
