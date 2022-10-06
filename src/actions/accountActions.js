import axios from 'src/utils/axios';
import authService from 'src/services/authService';

export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const REGISTER = '@account/register';
export const UPDATE_PROFILE = '@account/update-profile';

export async function login(email, password) {
  try {
    const user = await authService.loginWithEmailAndPassword(email, password);
    return ({
      type: LOGIN_SUCCESS,
      payload: {
        user
      }
    });
  } catch (error) {
    return ({ type: LOGIN_FAILURE });
  }
}

export function setUserData(user) {
  return ({
    type: SILENT_LOGIN,
    payload: {
      user
    }
  });
}

export function logout() {
  authService.logout();

  return ({
    type: LOGOUT
  });
}

export function register() {
  return true;
}

export function updateProfile(update) {
  const request = axios.post('/api/account/profile', { update }).then((response) => ({
    type: UPDATE_PROFILE,
    payload: response.data
  }));

  return request;
}
