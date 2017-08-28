import { DefaultStatement } from '../../constants/default-statement';
import { LearningLockerConfig } from '../../constants/learning-locker-config';
import { xAPIDataService } from '../xapi-data';

const _goToQuestions = function(event, xAPIEvent) {
  const statement = Object.assign(xAPIEvent.statement, {
    object: {
      id: `${LearningLockerConfig.OBJECTS}/interactions/#questions-page`,
      definition: {
        type: 'http://adlnet.gov/expapi/activities/link'
      }
    }
  });

  xAPIDataService.post(statement);
};

export const UserEventsService = Object.freeze({
  eventList: [
    {
      id: 'go-to-questions',
      callback: _goToQuestions,
      name: 'click',
      elementSelectors: ['#eao-questions-link'],
      isValid: false,
      status: 'OFF',
      statement: Object.assign(DefaultStatement.get(), {
        verb: {
          id: 'http://adlnet.gov/expapi/verbs/initialized',
          display: {'en-US': 'initialized'}
        }
      })
    }
  ]
});
