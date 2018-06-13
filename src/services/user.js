import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  try {
    var promisse = request('http://localhost:8000/apiv1/users/me', {
      method: 'POST',
      body: {},
    });
    return promisse;
  } catch (e) {
    console.log(e);
  }
}
