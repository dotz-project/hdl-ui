export function getAuthority() {
  return localStorage.getItem('Authorization') || false;
}

export function setAuthority(authority) {
  return localStorage.setItem('Authorization', authority);
}

export function getMe() {
  return JSON.parse(localStorage.getItem('Me')) || false;
}

export function setMe(me) {
  return localStorage.setItem('Me', JSON.stringify(me));
}


