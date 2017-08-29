import {DefaultStatement} from '../../constants/default-statement';
import {VideoEvents} from '../../constants/events/video';
import {LearningLockerConfig} from '../../constants/learning-locker-config';
import {InteractionType} from '../../constants/interaction-types';
import {xAPIDataService} from '../xapi-data';

const _changeVideo = function(event, xAPIEvent) {
  const statement = Object.assign(DefaultStatement.get(), xAPIEvent.statement, {
    object: {
      id: `${LearningLockerConfig.OBJECTS}/interactions/#content-video`,
      definition: {
        interactionType: InteractionType.OTHER,
        type: 'https://w3id.org/xapi/video/activity-type/video',
        moreInfo: event.detail.player.getVideoUrl()
      }
    },
    result: {
      response: event.detail.player.getCurrentTime().toString()
    }
  });

  xAPIDataService.post(statement);
};

export const VideoEventsService = Object.freeze({
  eventList: [
    {
      id: 'play-video',
      callback: _changeVideo,
      name: VideoEvents.PLAY,
      elementSelectors: ['#eao-content-video'],
      isValid: false,
      status: 'OFF',
      statement: {
        verb: {
          id: 'https://w3id.org/xapi/adb/verbs/played',
          display: {
            'en-US': 'played'
          }
        }
      }
    }, {
      id: 'pause-video',
      callback: _changeVideo,
      name: VideoEvents.PAUSE,
      elementSelectors: ['#eao-content-video'],
      isValid: false,
      status: 'OFF',
      statement: {
        verb: {
          id: 'https://w3id.org/xapi/adb/verbs/paused',
          display: {
            'en-US': 'paused'
          }
        }
      }
    }, {
      id: 'end-video',
      callback: _changeVideo,
      name: VideoEvents.END,
      elementSelectors: ['#eao-content-video'],
      isValid: false,
      status: 'OFF',
      statement: {
        verb: {
          id: 'https://w3id.org/xapi/adb/verbs/ended',
          display: {
            'en-US': 'ended'
          }
        }
      }
    }
  ]
});
