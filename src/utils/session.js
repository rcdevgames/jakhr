import {SESSION} from './constants';

export const setSession =  (name = '', data = '') => {
  return  sessionStorage.setItem(name, data);
};
export const getSession =  (name = '') => {
  return sessionStorage.getItem(name);
};
export const getToken = () => {
  return sessionStorage.getItem(SESSION.ACCESS_TOKEN);
};

export const clearSession =  () => {
  sessionStorage.clear();
};
