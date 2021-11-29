import {getToken, removeUser} from '../auth/async-storage';
import {API_URL} from '@env';

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

function get(url) {
  const requestOptions = {
    method: 'GET',
  };
  return fetchUrl(url, requestOptions);
}

function post(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetchUrl(url, requestOptions);
}

function put(url, body) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  };
  return fetchUrl(url, requestOptions);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: 'DELETE',
  };
  return fetchUrl(url, requestOptions);
}

// helper functions

async function fetchUrl(url, requestOptions) {
  let headers = requestOptions?.headers;
  const TOKEN = await getToken();

  requestOptions.headers = {...headers, ...authHeader(url, TOKEN)};

  return fetch(url, requestOptions).then(handleResponse);
}

function authHeader(url, token) {
  // return auth header with jwt if user is logged in and request is to the api url
  const isApiUrl = url.startsWith(API_URL);

  if (token && isApiUrl) {
    console.log('in header', token);
    return {Authorization: `Bearer ${token}`};
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        removeUser();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
