import { VideoEvents } from '../../constants/events/video';

const WIDTH = '100%';
const HEIGHT = '600';

let _id, _videoId, _element$, _player, _playVideoEvent, _pauseVideoEvent, _endVideoEvent;

export const ContentVideo = {
  initialize(id, videoId) {
    _element$ = document.getElementById(id);
    _videoId = videoId;
    _id = id;
  },

  onYoutubeIframeApiReady() {
    _player = new YT.Player(`${_id}`, {
      height: HEIGHT,
      width: WIDTH,
      videoId: _videoId,
      events: {
        onStateChange: _onPlayerStateChange
      }
    });

    _playVideoEvent = new CustomEvent(VideoEvents.PLAY, { detail: {
        player: _player
      }
    });

    _pauseVideoEvent = new CustomEvent(VideoEvents.PAUSE, { detail: {
        player: _player
      }
    });

    _endVideoEvent = new CustomEvent(VideoEvents.END, { detail: {
        player: _player
      }
    });
  }
};

const _onPlayerStateChange = function(event) {
  const PlayerStates = {
    1: _playVideoEvent,
    2: _pauseVideoEvent,
    0: _endVideoEvent
  };

  if (PlayerStates[event.data]) {
    _element$.dispatchEvent(PlayerStates[event.data]);
  }
};

window.onYouTubeIframeAPIReady = ContentVideo
  .onYoutubeIframeApiReady
  .bind(ContentVideo);
