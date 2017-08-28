import { TabsContainer } from './src/components/tabs-container/component';
import { ContentText } from './src/components/content-text/component';
import { ContentVideo } from './src/components/content-video/component';
import { Questions } from './src/components/questions/component';
import { UserEmail } from './src/components/user-email/component';
import { UserNotes } from './src/components/user-notes/component';
import { xAPIEventsService } from './src/services/xapi-events';
import { QUESTIONS_BEES } from './src/constants/questions-bees';
import Cookies from 'js-cookie';

const WidgetTabsContent = Object.assign({}, TabsContainer);
const WidgetContentText = Object.assign({}, ContentText);
const WidgetContentTextImages = Object.assign({}, ContentText);
const WidgetContentVideo = Object.assign({}, ContentVideo);
const WidgetQuestionsBees = Object.assign({}, Questions);
const WidgetUserEmail = Object.assign({}, UserEmail);
const WidgetUserNotes = Object.assign({}, UserNotes);
const userEmail = Cookies.get('elaio-email');

const BEES_VIDEO_ID = 'GqA42M4RtxE';
const CONTENTS = [{
    name: 'audio',
    content: 'audio'
  },{
    name: 'text',
    content: 'texto'
  },{
    name: 'images',
    content: 'texto con imágenes'
  },{
    name: 'video',
    content: 'video'
}];

WidgetTabsContent.initialize('eao-tabs-content', CONTENTS);
WidgetContentText.initialize('eao-tabs-content-text-widget');
WidgetContentTextImages.initialize('eao-tabs-content-images-widget');
WidgetContentVideo.initialize('eao-content-video', BEES_VIDEO_ID);
WidgetQuestionsBees.initialize('eao-questions-bees', QUESTIONS_BEES);
WidgetUserEmail.initialize('eao-user-email', 'eao-content');
WidgetUserNotes.initialize('eao-user-notes');

if (userEmail) {
  xAPIEventsService.initialize(userEmail, 'elaio-test');
}
