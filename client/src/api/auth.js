import api from './axios';

export function signup(data) {
  return api.post('/auth/signup', data).then((res) => res.data);
}

export function login(data) {
  return api.post('/auth/login', data).then((res) => res.data);
}

export function fetchMe() {
  return api.get('/auth/me').then((res) => res.data);
}
