import sinon from 'sinon';
import { expect } from 'chai';

import { DropdownSelect } from '../../../src/components/dropdown-select/component';

const DROPDOWN_ID = 'dropdown-select-id';
const DropdownSelectTest = Object.assign({}, DropdownSelect);

let dropdownSelect$, dropdownSelectList$, dropdownSelectTitle$, _callback;

const DropdownData = {
  '1': 'data1',
  '2': 'data2',
  '3': 'data3',
  '4': 'data4'
};

describe('Unit:dropdown-select:component', function() {
  describe('DropdownSelect Component', function() {

    before(function() {
      dropdownSelect$ = document.createElement('div');
      dropdownSelectList$ = document.createElement('ul');
      dropdownSelectTitle$ = document.createElement('p');
      dropdownSelectTitle$.innerText = 'Dropdown Select';
      dropdownSelect$.classList.add('mwc-dropdown-select');
      dropdownSelect$.setAttribute('id', DROPDOWN_ID);
      dropdownSelect$.setAttribute('data-show-value', true);
      dropdownSelect$.appendChild(dropdownSelectList$);
      dropdownSelect$.appendChild(dropdownSelectTitle$);
      document.body.appendChild(dropdownSelect$);

      _callback = sinon.spy();
    });

    it('should exist', function() {
      expect(DropdownSelect).to.be.ok;
    });

    it('should be able to be initialized', function() {
      expect(DropdownSelectTest.init).to.be.ok;

      DropdownSelectTest.init(
        DROPDOWN_ID,
        DropdownData,
        _callback);

      expect(DropdownSelectTest.dropdown$).to.be.ok;
      expect(DropdownSelectTest.dropdownId).to.equal(DROPDOWN_ID);
      expect(DropdownSelectTest.showValue).to.be.ok;
      expect(DropdownSelectTest.dropdownList$).to.be.ok;
      expect(DropdownSelectTest.dropdownList$.length).to.equal(DropdownData.length);
      expect(DropdownSelectTest.selectedItem$).to.be.ok;
      expect(DropdownSelectTest.isActive).to.be.false;
      expect(DropdownSelectTest.selected).to.be.not;
    });

    it('should hide the dropdown list on init and show it on click', function() {
      const dropdownListStyle = window.getComputedStyle(dropdownSelectList$);
      expect(dropdownListStyle.visibility).to.equal('hidden');
      dropdownSelectList$.click();
      expect(dropdownListStyle.visibility).to.equal('visible');
      dropdownSelectList$.click();
      expect(dropdownListStyle.visibility).to.equal('hidden');
    });

    it('should select an element on click on it', function() {
      const dropdownListStyle = window.getComputedStyle(dropdownSelectList$);
      const firstListButton = dropdownSelectList$.children[0].children[0];

      /* Open Dropdown */
      dropdownSelectList$.click();

      /* Select Item */
      firstListButton.click();

      expect(dropdownListStyle.visibility).to.equal('hidden');
      expect(dropdownSelectTitle$.innerText).to.equal('data1');
      expect(_callback.called).to.be.ok;
    });
  });
});
