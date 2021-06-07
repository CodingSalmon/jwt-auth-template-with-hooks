import tokenService from '../services/tokenService';
const BASE_URL = '/api/auth/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(async res => {
    const json = await res.json()
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
  .then(async res => {
    const json = await res.json()
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

function getAllUsers() {
  return fetch(BASE_URL + 'users', {
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
  .then(async res => {
    const json = await res.json()
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
  .then(async res => {
    const json = await res.json()
    if(json.message) return json
    throw new Error(`${json.error}`)
  })
}

function follow(follower, following) {
  return fetch(BASE_URL + `follow/${follower}/${following}`, {
    headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()}),
  })
  .then(res => res.json())
}

function unfollow(unfollower, unfollowing) {
  return fetch(BASE_URL + `unfollow/${unfollower}/${unfollowing}`, {
    headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()}),
  })
  .then(res => res.json())
}

function favorite(placeId) {
  return fetch(BASE_URL + `favorite/${placeId}`, {
    headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()}),
  })
  .then(res => res.json())
}

function unfavorite(placeId) {
  return fetch(BASE_URL + `unfavorite/${placeId}`, {
    headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()}),
  })
  .then(res => res.json())
}

let functions = {
  signup,
  getUser,
  logout,
  login,
  getUserFromId,
  forgotPassword,
  resetPassword,
  getAllUsers,
  follow,
  unfollow,
  favorite,
  unfavorite,
};

export default functions