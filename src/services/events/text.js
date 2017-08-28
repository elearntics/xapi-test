import { DefaultStatement } from '../../constants/default-statement';
import { LearningLockerConfig } from '../../constants/learning-locker-config';
import { InteractionType } from '../../constants/interaction-types';
import { xAPIDataService } from '../xapi-data';

const _xapiEvents = xapiEvents.xapiEvents;

const _selectText = function(event, xAPIEvent) {

  const statement = Object.assign({}, xAPIEvent.statement, {
    object: {
      id: `${LearningLockerConfig.OBJECTS}/interactions/#content-text`,
      definition: {
        interactionType: InteractionType.OTHER,
        type: 'http://risc-inc.com/annotator/activities/highlight',
      }
    },
    result: {
      response: _xapiEvents.helpers.getSelection()
    }
  });

  xAPIDataService.post(statement);
};

export const TextEventsService = Object.freeze({
  eventList: [
    {
      id: 'select-text',
      callback: _selectText,
      name: 'click',
      elementSelectors: ['.eao-content-text'],
      isValid: false,
      status: 'OFF',
      statement: Object.assign(DefaultStatement.get(), {
        verb: {
          id: 'https://w3id.org/xapi/adb/verbs/highlighted',
          display: {'en-US': 'highlighted'}
        }
      })
    }
  ]
});
