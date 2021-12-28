import {fetchWrapper} from './fetch-wrapper';
import Constants from 'expo-constants';

const apiUrl = Constants.manifest.extra.apiUrl;
const baseUrl = `${apiUrl}${
  apiUrl.substring(apiUrl.length - 1) === '/' ? 'events' : '/events'
}`;

export const eventService = {
  getAll,
  attend,
};

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function attend(id, student_id) {
  return fetchWrapper.post(`${baseUrl}/${id}/attend/${student_id}`, {});
}
