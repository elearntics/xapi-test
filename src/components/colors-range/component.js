export const ColorsRange = {
  init(widgetId, rangeValues) {
    this.widget$ = document.getElementById(widgetId);
    this.rangeValues$ = [];
    this.rangeValues = rangeValues;
    this.setValues();
  },

  setValues() {
    this.rangeValues.forEach((rangeValue, index) => {
      let rangeValue$ = document.createElement('div');

      rangeValue$.setAttribute('data-index', index);
      rangeValue$.setAttribute('data-value', rangeValue);
      rangeValue$.style.backgroundColor = rangeValue;
      rangeValue$.classList.add('mwc-colors-range-squares');
      this.rangeValues$.push(rangeValue$);
      this.widget$.appendChild(rangeValue$);
    });
  }
};
