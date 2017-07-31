export const ColorsRange = {
  init(widgetId, rangeValues) {
    this.widget$ = document.getElementById(widgetId);
    this.rangeValues = rangeValues;
    this.setRangeValues();
  },

  setRangeValues() {
    this.rangeValues.forEach((rangeValue, index) => {
      const rangeValue$ = document.createElement('div');

      rangeValue$.setAttribute('data-index', index);
      rangeValue$.setAttribute('data-value', rangeValue);
      rangeValue$.classList.add('mwc-colors-range-squares');
      rangeValue$.style.backgroundColor = rangeValue;

      this.widget$.appendChild(rangeValue$);
    });
  }
};
