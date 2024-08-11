import http, { IS_JSON_BODY } from './http';

const AI_BASE_URL = 'http://localhost:3001/v1/ai';

const createChatCompletion = (data, headers) =>
  http.post(`${AI_BASE_URL}/completion/chat`, data, headers, IS_JSON_BODY).then((body) => body);

export default {
  createChatCompletion,
};
