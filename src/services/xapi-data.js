import { LearningLockerConfig } from '../constants/learning-locker-config';

const UserBase64 = btoa(`${LearningLockerConfig.USERNAME}:${LearningLockerConfig.PASSWORD}`);
const LearningLockerAuth = `Basic ${UserBase64}`;
const ContentType = 'application/json;charset=UTF-8';

export const xAPIDataService = {
  post(statement) {
    const request = new XMLHttpRequest();

    request.open('POST', LearningLockerConfig.ENDPOINT);

    request.setRequestHeader('Content-Type', ContentType);
    request.setRequestHeader('Authorization', LearningLockerAuth);
    request.setRequestHeader('X-Experience-API-Version', LearningLockerConfig.VERSION);

    request.send(JSON.stringify(statement));
  }
};
