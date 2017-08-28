import { xAPIEventsService } from '../../services/xapi-events';
import Cookies from 'js-cookie';

export const UserEmail = {
  initialize(id, contentId) {
    this.form$ = document.getElementById(id);
    this.content$ = document.getElementById(contentId);

    if (this.form$ && this.content$) {
      const userEmail = Cookies.get('elaio-email');

      this.submitButton$ = document.getElementById(`${id}-button`);
      this.inputEmail$ = document.getElementById(`${id}-input-email`);
      this.userSavedInfo$ = document.getElementById(`${id}-info`);

      if (userEmail) {
        this.inputEmail$.value = userEmail;
        _saveEmailCookie.call(this);
        _showContent.call(this);
      }

      this.form$.addEventListener('submit', (event) => {
        event.preventDefault();

        if (this.inputEmail$.value) {
          _saveEmailCookie.call(this, event);
          _showContent.call(this);
        }
      }, false);
    }
  }
};

const _saveEmailCookie = function(event) {
  Cookies.set('elaio-email', this.inputEmail$.value);

  this.userSavedInfo$.classList.remove('eao-info__not-saved');
  this.userSavedInfo$.classList.add('eao-info__saved');
  this.userSavedInfo$.innerText = 'Email guardado';

  xAPIEventsService.initialize(this.inputEmail$.value, 'elaio-test');
};

const _showContent = function() {
  this.content$.classList.remove('eao-content--hidden');
  this.content$.classList.add('eao-content--visible');
};
