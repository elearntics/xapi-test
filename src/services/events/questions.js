import { DefaultStatement } from '../../constants/default-statement';
import { QuestionEvent } from '../../constants/events/questions';
import { LearningLockerConfig } from '../../constants/learning-locker-config';
import { InteractionType } from '../../constants/interaction-types';
import { xAPIDataService } from '../xapi-data';

const _selectOption = function(event, xAPIEvent) {
  const CORRECT = event.detail.questionsComponent.correctQuestions;
  const NUM_QUESTIONS = event.detail.questionsComponent.numQuestions;
  const ANSWERED = Object.keys(event.detail.questionsComponent.answers).length;

  const scaled = CORRECT / NUM_QUESTIONS;
  const max = NUM_QUESTIONS;
  const success = CORRECT === NUM_QUESTIONS;
  const completion = ANSWERED === NUM_QUESTIONS;

  const statement = Object.assign(DefaultStatement.get(), xAPIEvent.statement, {
    object: {
      id: `${LearningLockerConfig.OBJECTS}/interactions/#answer`,
      definition: {
        interactionType: InteractionType.CHOICE,
        type: 'http://adlnet.gov/expapi/activities/assessment',
      }
    },
    result: {
      score: { scaled, max },
      success,
      completion
    }
  });

  xAPIDataService.post(statement);
};

export const QuestionsEventsService = Object.freeze({
  eventList: [
    {
      id: 'select-option',
      callback: _selectOption,
      name: QuestionEvent.SELECT_OPTION,
      elementSelectors: ['.eao-form-input'],
      isValid: false,
      status: 'OFF',
      statement: {
        verb: {
          id: 'http://adlnet.gov/expapi/verbs/answered',
          display: {'en-US': 'answered'}
        }
      }
    },{
      id: 'submit-questions',
      callback: _selectOption,
      name: QuestionEvent.SUBMIT_QUESTIONS,
      elementSelectors: ['#eao-questions-bees'],
      isValid: false,
      status: 'OFF',
      statement: {
        verb: {
          id: 'http://adlnet.gov/expapi/verbs/attempted',
          display: {'en-US': 'attempted'}
        }
      }
    }
  ]
});
