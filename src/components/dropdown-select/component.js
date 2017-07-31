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

    this.dropdown$.addEventListener('click',
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

  setData(list) {
    if (list) {
      for (const element in list) {
        const liButton$ = _createListButton.call(this, element, list);
        this.dropdownList$.appendChild(liButton$);
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

const _createListButton = function(element, list) {
  const li$ = document.createElement('li');
  const button$ = document.createElement('button');

  li$.appendChild(button$);

  button$.innerText = this.showValue ? element : list[element];
  button$.setAttribute(`data-${this.dropdownId}`, list[element]);

  button$.addEventListener('click', this._selectItem.bind(this), false);
  return li$;
};
