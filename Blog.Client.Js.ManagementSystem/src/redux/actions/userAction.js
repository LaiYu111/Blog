import {SET_CURRENT_USER, USER_LOGOUT} from "../type.js";

export function SetUserDetail(userData){
  return {
    type: SET_CURRENT_USER,
    payload: userData
  }
}

export function UserLogin(userData){
  // 持久化保存在localStorage
  const expiresInOneDay = 24 * 60 * 60 * 1000; // 一天的秒数 1000是ms
  const expirationTime = new Date().getTime() + expiresInOneDay;  //设置时间


  localStorage.removeItem('token')
  localStorage.removeItem('tokenExpiration')

  localStorage.setItem('token', JSON.stringify(userData));
  localStorage.setItem('tokenExpiration', expirationTime);


  return {
    type: SET_CURRENT_USER,
    payload: userData
  }
}

export function UserLogout(){
  // 删除localStorage 的 user token
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiration');

  return {
    type: USER_LOGOUT
  }
}
