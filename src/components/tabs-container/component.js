const VISIBLE = 'visible';
const ACTIVE = 'active';

export const TabsContainer = {
  initialize(id, tabInfo) {
    this.id = id;
    this.element$ = document.getElementById(id);

    if (this.element$) {
      this.contents$ = document.getElementById(`${this.id}-contents`).children;

      tabInfo.forEach((info) => {
        let button$ = document.createElement('button');
        button$.innerText = info.content;
        button$.setAttribute('data-name', info.name);
        button$.classList.add('eao-tabs-container__tab-button');
        button$.addEventListener('click', (event) => {
          this.openTab(event, info.name);
        }, false);

        this.element$.appendChild(button$);
      });

      this.buttons$ = this.element$.children;
      this.buttons$[0].classList.add(ACTIVE);
      this.contents$[0].classList.add(VISIBLE);
    }
  },

  openTab(event, name) {
    for (let i = 0; i < this.contents$.length; i++) {
      this.contents$[i].classList.remove(VISIBLE);
    }

    for (let i = 0; i < this.buttons$.length; i++) {
      this.buttons$[i].classList.remove(ACTIVE);
    }

    event.currentTarget.classList.add(ACTIVE);
    document.getElementById(`${this.id}-${name}`).classList.add(VISIBLE);
  }
};
