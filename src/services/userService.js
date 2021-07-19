import tokenService from '../services/tokenService';
const AUTH_URL = '/api/auth/';
const USER_URL = '/api/users/';

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function signup(user) {
  return fetch(AUTH_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(json => {
    if(json.token) return json;
    throw new Error(`${json.err || json.message}`)
  })
  .then(({ token }) => tokenService.setToken(token));
}

function login(creds) {
  return fetch(AUTH_URL + 'login', {
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

function forgotPassword(email) {
  return fetch(AUTH_URL + 'forgot-password', {
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
  return fetch(AUTH_URL + 'reset-password',{
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

function getAllUsers() {
  return fetch(USER_URL, {
    headers: new Headers({'Content-Type': 'application/json'})
  })
  .then(res => res.json())
}

function getUserFromId(id) {
  return fetch(USER_URL + id, {
    headers: new Headers({'Content-Type': 'application/json'})
  })
  .then(res => res.json())
}

function handleFollow(follower, following) {
  return fetch(USER_URL + `follow/${follower}/${following}`, {
    headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()}),
  })
  .then(res => res.json())
  .then(json => {
    if(json.token) return json;
    throw new Error(`${json.err || json.message}`)
  })
  .then(({token}) => tokenService.setToken(token));
}

function getFollowList(id, type) {
  return fetch(USER_URL + `user/${id}/${type}`, {
    headers: new Headers({'Content-Type': 'application/json'})
  })
  .then(res => res.json())
}

const functions = {
  signup,
  getUser,
  getUserFromId,
  getAllUsers,
  logout,
  login,
  forgotPassword,
  resetPassword,
  handleFollow,
  getFollowList,
};

export default functions