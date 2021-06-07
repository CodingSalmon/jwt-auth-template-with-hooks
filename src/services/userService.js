import tokenService from '../services/tokenService';
const BASE_URL = '/api/auth/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    console.log(res, '<-- response object')
    return res.json();
  })
  .then(json => {
    if(json.token) return json;
    throw new Error(`${json.err || json.message}`)
  })
  .then(({ token }) => {
    tokenService.setToken(token);
  });
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => res.json())
  .then(json => {
    if(json.token) return json;
    throw new Error(`${json.err || json.message}`)
  })
  .then(({token}) => tokenService.setToken(token));
}

function getUserFromId(id) {
  return fetch(BASE_URL + 'user/' + id, {
    headers: new Headers({'Content-Type': 'application/json'})
  })
  .then(res => res.json())
}

function forgotPassword(email) {
  return fetch(BASE_URL + 'forgot-password', {
    method: 'PUT',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({email})
  })
  .then(res => res.json())
  .then(json => {
    if (json.message) return json
    throw new Error(`${json.error}`)
  })
}

function resetPassword(password, token) {
  return fetch(BASE_URL + 'reset-password',{
    method:'PUT',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({password, token})
  })
  .then(res => res.json())
  .then(json => {
    if(json.message) return json
    throw new Error(`${json.error}`)
  })
}

let functions = {
  signup,
  getUser,
  logout,
  login,
  getUserFromId,
  forgotPassword,
  resetPassword
};

export default functions