/* eslint-disable max-len */
import { settings as s } from '../Settings';
import {
  deleteData,
  getData,
  getDataAnonymously,
  patchData,
  postData,
  postDataAnonymously,
  postFormData,
  putData
} from './ApiCalls';

export const register = async data => {
  try {
    const response = await postDataAnonymously(`${s.auth.registerUser}`, data);
    return response;
  } catch (err) {
    return null;
  }
};

export const login = async data => {
  try {
    const response = await postDataAnonymously(`${s.auth.login}`, data);
    return response;
  } catch (err) {
    return null;
  }
};
