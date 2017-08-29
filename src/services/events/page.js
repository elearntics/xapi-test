import {DefaultStatement} from '../../constants/default-statement';
import {LearningLockerConfig} from '../../constants/learning-locker-config';
import {xAPIDataService} from '../xapi-data';

const _switchContent = function(event, xAPIEvent) {
  const contentName = event.target.getAttribute('data-name');

  const statement = Object.assign(DefaultStatement.get(), xAPIEvent.statement, {
    object: {
      id: `${LearningLockerConfig.OBJECTS}/interactions/#${contentName}`
    }
  });

  xAPIDataService.post(statement);
};

const _goToInit = function(event, xAPIEvent) {
  if (window.location.pathname === '/questions.html') {
    event.preventDefault();

    const statement = Object.assign(DefaultStatement.get(), xAPIEvent.statement, {
      object: {
        id: `${LearningLockerConfig.OBJECTS}/interactions/#init-link`,
        definition: {
          type: 'http://adlnet.gov/expapi/activities/link'
        }
      }
    });

    xAPIDataService.post(statement);
    window.location.href = '/';
  }
};

export const PageEventsService = Object.freeze({
  eventList: [
    {
      id: 'switch-content',
      callback: _switchContent,
      name: 'click',
      elementSelectors: ['.eao-tabs-container__tab-button'],
      isValid: false,
      status: 'OFF',
      statement: {
        verb: {
          id: 'http://adlnet.gov/expapi/verbs/interacted',
          display: {
            'en-US': 'interacted'
          }
        }
      }
    }, {
      id: 'go-to-init',
      callback: _goToInit,
      name: 'click',
      elementSelectors: ['#eao-init'],
      isValid: false,
      status: 'OFF',
      statement: {
        verb: {
          id: 'http://adlnet.gov/expapi/verbs/abandoned',
          display: {
            'en-US': 'abandoned'
          }
        }
      }
    }
  ]
});
