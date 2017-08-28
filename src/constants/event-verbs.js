export const VOCABULARY_URL = 'https://registry.tincanapi.com/#home/verbs';

export const EventVerbs = Object.freeze({
  User: {
    REGISTERED: {
      id: 'http://adlnet.gov/expapi/verbs/registered',
      display: {
        'en-US': 'registered'
      }
    }
  },

  Texts: {
    SELECTED: {
      id: 'http://adlnet.gov/expapi/verbs/interacted',
      display: {
        'en-US': 'interacted'
      }
    },
    COMMENTED: {
      id: 'http://adlnet.gov/expapi/verbs/commented',
      display: {
        'en-US': 'commented'
      }
    }
  },

  Video: {
    PLAY: {

    },

    PAUSE: {

    },

    RESTART: {

    },

    MOVE: {

    }
  },

  Audio: {
    PLAY: {

    },

    PAUSE: {

    },

    RESTART: {

    },

    MOVE: {

    }
  },

  Images: {

  },

  Questions: {
    FAILED: {
      id: 'http://adlnet.gov/expapi/verbs/failed',
      display: {
        'en-US': 'failed'
      }
    },
    SUCCEED: {
      id: 'http://adlnet.gov/expapi/verbs/passed',
      display: {
        'en-US': 'passed'
      }
    }
  }
});
