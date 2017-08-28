import { PageEventsService } from './events/page';
import { UserEventsService } from './events/user';
import { AudioEventsService } from './events/audio';
import { TextEventsService } from './events/text';
import { VideoEventsService } from './events/video';
import { NotesEventsService } from './events/notes';
import { QuestionsEventsService } from './events/questions';

const _xapiEvents = xapiEvents.xapiEvents;

export const xAPIEventsService = {
  initialize(actor, appName) {
    _xapiEvents.addEvents(PageEventsService.eventList);
    _xapiEvents.addEvents(UserEventsService.eventList);
    _xapiEvents.addEvents(AudioEventsService.eventList);
    _xapiEvents.addEvents(TextEventsService.eventList);
    _xapiEvents.addEvents(VideoEventsService.eventList);
    _xapiEvents.addEvents(NotesEventsService.eventList);
    _xapiEvents.addEvents(QuestionsEventsService.eventList);

    _xapiEvents.enableAllEvents();
    _xapiEvents.listenEnabledEvents();

    _xapiEvents.init(actor, appName);
  }
};
