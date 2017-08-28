import { LearningLockerConfig } from './learning-locker-config';
import Cookies from 'js-cookie';

export const DefaultStatement = {
  get() {
    return {
      version: LearningLockerConfig.VERSION,

      actor: {
        mbox: `mailto:${Cookies.get('elaio-email')}`
      },

      verb: {
        id: 'http://adlnet.gov/expapi/verbs/interacted',
        display: {
          'en-US': 'interacted'
        }
      },

      object: {
        id: 'http://adlnet.gov/expapi/activities/interaction',
        display: {
          'en-US': 'interaction'
        }
      },

      authority: {
        objectType: 'Agent',
        name: "Elena Torro",
        mbox: "mailto:elenatorro@gmail.com"
      }
    };
  }
};
