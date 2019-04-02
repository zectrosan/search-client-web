import * as api from './api';

export function currentUser() {
  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');

  if (token) {
    return JSON.parse(userInfo);
  }
}

export function token() {
  return localStorage.getItem('token');
}

export function logOut() {
  return api.post('auth/logout')
    .then(res => {
      localStorage.clear('token');
      localStorage.clear('userInfo');
      return res;
    });
}

export function login(username, password) {
  return api
    .post('auth/login', {
      token: null,
      body: { username, password }
    })
    .then(response => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userInfo', JSON.stringify(response.user));
      return response;
    });
}
