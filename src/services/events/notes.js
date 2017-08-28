import { DefaultStatement } from '../../constants/default-statement';
import { LearningLockerConfig } from '../../constants/learning-locker-config';
import { InteractionType } from '../../constants/interaction-types';
import { xAPIDataService } from '../xapi-data';

const _addNote = function(event, xAPIEvent) {
  const statement = Object.assign({}, xAPIEvent.statement, {
    object: {
      id: `${LearningLockerConfig.OBJECTS}/interactions/#notes-textarea`,
      definition: {
        interactionType: InteractionType.LONG_FILL_IN,
        type: 'http://risc-inc.com/annotator/activities/highlight',
      }
    },
    result: {
      response: event.target.value
    }
  });

  xAPIDataService.post(statement);
};

const _addWord = function(event, xAPIEvent) {
  const statement = Object.assign({}, xAPIEvent.statement, {
    object: {
      id: `${LearningLockerConfig.OBJECTS}/interactions/#words-textarea`,
      definition: {
        interactionType: InteractionType.FILL_IN,
        type: 'http://risc-inc.com/annotator/activities/highlight',
      }
    },
    result: {
      response: event.target.value
    }
  });

  xAPIDataService.post(statement);
};

export const NotesEventsService = Object.freeze({
  eventList: [
    {
      id: 'add-note',
      callback: _addNote,
      name: 'keyup',
      elementSelectors: ['#eao-user-notes-notes-textarea'],
      isValid: false,
      status: 'OFF',
      statement: Object.assign(DefaultStatement.get(), {
        verb: {
          id: 'https://w3id.org/xapi/adb/verbs/annotated',
          display: {'en-US': 'annotated'}
        }
      })
    },
    {
      id: 'add-word',
      callback: _addWord,
      name: 'keyup',
      elementSelectors: ['#eao-user-notes-words-textarea'],
      isValid: false,
      status: 'OFF',
      statement: Object.assign(DefaultStatement.get(), {
        verb: {
          id: 'https://w3id.org/xapi/adb/verbs/annotated',
          display: {'en-US': 'annotated'}
        }
      })
    }
  ]
});
