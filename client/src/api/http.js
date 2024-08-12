import { fetch } from 'whatwg-fetch';

import Config from '../constants/Config';

export const IS_JSON_BODY = true;
const http = {};

// TODO: add all methods
['GET', 'POST'].forEach((method) => {
  http[method.toLowerCase()] = (url, data, headers, jsonBody = false) => {
    // We do that because our AI service is running on a different port
    let apiUrl;
    if (url.startsWith('http')) {
      apiUrl = url;
    } else {
      apiUrl = `${Config.SERVER_BASE_URL}/api${url}`;
    }

    const reqBody = jsonBody
      ? JSON.stringify(data)
      : data &&
        Object.keys(data).reduce((result, key) => {
          result.append(key, data[key]);

          return result;
        }, new FormData());

    const reqHeaders = jsonBody ? { ...headers, 'Content-Type': 'application/json' } : headers;

    return fetch(apiUrl, {
      method,
      headers: reqHeaders,
      body: reqBody,
    })
      .then((response) =>
        response.json().then((body) => ({
          body,
          isError: response.status !== 200 && response.status !== 201,
        })),
      )
      .then(({ body, isError }) => {
        if (isError) {
          throw body;
        }

        return body;
      });
  };
});

export default http;
