import {DefaultStatement} from '../../constants/default-statement';
import {LearningLockerConfig} from '../../constants/learning-locker-config';
import {InteractionType} from '../../constants/interaction-types';
import {xAPIDataService} from '../xapi-data';

const AudioPlayerObject = {
  id: `${LearningLockerConfig.OBJECTS}/interactions/#audio-player`
};

const _postAudio = function(event, xAPIEvent) {
  const statement = Object.assign(DefaultStatement.get(), xAPIEvent.statement, {
    object: Object.assign(AudioPlayerObject, {
      definition: {
        interactionType: InteractionType.OTHER,
        type: 'http://activitystrea.ms/schema/1.0/audio',
        moreInfo: event.target.currentSrc
      }
    })
  });

  xAPIDataService.post(statement);
};

const _changeVolume = function(event, xAPIEvent) {
  const statement = Object.assign(DefaultStatement.get(), xAPIEvent.statement, {
    object: Object.assign({}, AudioPlayerObject, {
      definition: {
        type: 'https://w3id.org/xapi/video/extensions/volume'
      }
    }),
    result: {
      response: event.target.volume
    }
  });

  xAPIDataService.post(statement);
};

export const AudioEventsService = Object.freeze({
  eventList: [
    {
      id: 'pause-audio',
      callback: _postAudio,
      name: 'pause',
      elementSelectors: ['#eao-content-audio'],
      isValid: false,
      status: 'OFF',
      statement: {
        verb: {
          id: 'https://w3id.org/xapi/video/verbs/paused',
          display: {
            'en-US': 'paused'
          }
        }
      }
    }, {
      id: 'play-audio',
      callback: _postAudio,
      name: 'play',
      elementSelectors: ['#eao-content-audio'],
      isValid: false,
      status: 'OFF',
      statement: {
        verb: {
          id: 'https://w3id.org/xapi/video/verbs/played',
          display: {
            'en-US': 'played'
          }
        }
      }
    }, {
      id: 'ended',
      callback: _postAudio,
      name: 'ended',
      elementSelectors: ['#eao-content-audio'],
      isValid: false,
      status: 'OFF',
      statement: {
        verb: {
          id: 'https://w3id.org/xapi/cmi5#terminated',
          display: {
            'en-US': 'terminated'
          }
        }
      }
    }, {
      id: 'volume-change',
      callback: _changeVolume,
      name: 'volumechange',
      elementSelectors: ['#eao-content-audio'],
      isValid: false,
      status: 'OFF',
      statement: {}
    }
  ]
});
