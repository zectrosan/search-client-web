import qs from 'querystring';
import * as auth from './auth';

function absolute(url) {
  return '/api/' + url;
}

function handleError(res) {
  if (!res.ok) {
    const error = Error(res.statusText);
    error.code = res.status;
    throw error;
  }

  return res;
}

export function get(url, { token, headers, query }) {
  url = absolute(url);
  if (query) {
    url = url + '?' + qs.stringify(query);
  }

  if (!token && token !== null) {
    token = auth.token();
  }

  headers = {
    ...headers,
    Accept: 'application/json'
  }

  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  return fetch(url, {
    method: 'GET',
    headers,
  })
    .then(handleError)
    .then(res => res.json());
}

export function post(url, { token, headers, body } = {}) {
  url = absolute(url);
  
  if (!token && token !== null) {
    token = auth.token();
  }

  headers = {
    ...headers,
    Accept: 'application/json'
  };

  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  if (body) {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  return fetch(url, {
    method: 'POST',
    headers,
    body
  })
    .then(handleError)
    .then(res => res.json());
}
