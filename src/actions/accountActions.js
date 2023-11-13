import axios from 'src/utils/axios';
import authService from 'src/services/authService';
import { settings } from 'src/services/Settings';

export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const REGISTER = '@account/register';
export const REGISTER_SUCCESS = '@account/register-success';
export const REGISTER_FAILURE = '@account/register-failure';
export const EMAIL_VERIFY_SUCCESS = '@account/email-verify-success';
export const EMAIL_EVRIFY_FAILURE = '@account/email-verify-failure'
export const UPDATE_PROFILE_IMAGE = '@account/update-profile-image';
export const GET_USER_INFO_SUCCESS = '@accout/get-user-info-success'
export const GET_USER_INFO_FAILTURE = '@accout/get-user-info-failture'
export const SET_FOLLOW_SUCCESS = '@profile/set-follow-success';
export const SET_FOLLOW_FAILTURE = '@profile/set-follow-failture';
export const PASSWORD_RESET_REQUEST_SUCCESS = "@account/password-reset-request-success";
export const PASSWORD_RESET_REQUEST_FAILTURE = "@account/password-reset-request-failture";
export const PASSWORD_RESET_SUCCESS = "@account/password-reset-success";
export const PASSWORD_RESET_FAILTURE = "@account/password-reset-failture";

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

export async function registerUser(firstName, lastName, email, country, phone, password, confirmPassword, isOfficial) {
  try {
    const user = await authService.registerUser(firstName, lastName, email, country, phone, password, confirmPassword, isOfficial);
    return ({
      type: REGISTER_SUCCESS,
      payload: {
        user
      }
    });
  } catch (error) {
    return ({ type: REGISTER_FAILURE, error:error });
  }
}

export async function emailVerify(verifyCode) {
  try {
    const res = await authService.emailVerify(verifyCode);
    return ({
      type: EMAIL_VERIFY_SUCCESS,
      payload: {
        res
      }
    });
  } catch (error) {
    return ({ type: EMAIL_EVRIFY_FAILURE });
  }
}

export function changeProfileImage(file) {
  let formData = new FormData()
  formData.append('file', file)
  const request = axios(
    `${settings.baseUrl}${settings.profile.changeProfileImage}`, { 
      method: "POST",
      data : formData 
    }).then((response) => {
      authService.setUser({
        profile_image_path: response.data.data, 
        ...JSON.parse(authService.getUser())
      })
      return {
        type: UPDATE_PROFILE_IMAGE,
        payload: response.data
      }
    }).catch((err) => {
      console.log(err);
    });

  return request;
}

export function changeCoverImage(file, onProgress = (e) => {}) {
  let formData = new FormData()
  formData.append('file', file)
  const request = axios(
    `${settings.baseUrl}${settings.profile.changeCoverImage}`, { 
      method: "POST",
      data : formData ,
      onUploadProgress: onProgress
    }).then((response) => {
      authService.setUser({
        setting:{...authService.getUser().setting, coverImage: response.data.data}, 
        ...JSON.parse(authService.getUser())
      })
      return {
        type: UPDATE_PROFILE_IMAGE,
        payload: response.data
      }
    }).catch((err) => {
      console.log(err);
    });

  return request;
}

export async function getUserInfo( userId ) {
  try {
    const res = await axios.get(`${settings.baseUrl}${settings.profile.getUserInfo}`, {
      params: {
        userId
      }
    })
    return ({
      type: GET_USER_INFO_SUCCESS,
      payload: {
        res: res.data
      }
    });
  } catch (error) {
    return ({ type: GET_USER_INFO_FAILTURE });
  }
}

export async function follow( userId, isFollow ) {
  try {
    let res;
    if( isFollow ) res = await axios.put(`${settings.baseUrl}${settings.profile.follow}`,{
      userId: userId,
    })
    else res = await axios.delete(`${settings.baseUrl}${settings.profile.follow}`,{
      params : {
        userId: userId,
      }
    })
    if( res.data.state ) {
      return {
        type: SET_FOLLOW_SUCCESS,
        payload: {
          follows: res.data.follows
        }
      }
    }
    else throw 'ERROR'
  } catch (error) {
    return {
      type: SET_FOLLOW_FAILTURE,
      error: error
    }
  }
}


export const sendPasswordResetRequest = ( email ) => new Promise((resolve, reject) => {
  try {
    axios.post(`${settings.baseUrl}${settings.auth.passwordResetRequest}`, {
      email
    }).then((response) => {
      if(response.status) return response.data;
      else reject({
        type: PASSWORD_RESET_REQUEST_FAILTURE
      })
    }).then((response) => {
      if(response.state) resolve({
        type: PASSWORD_RESET_REQUEST_SUCCESS,
        comments: response.comments
      })
      else reject({
        type: PASSWORD_RESET_REQUEST_FAILTURE,
        message: response.message
      })
    }).catch((err) => {
      reject({
        type: PASSWORD_RESET_REQUEST_FAILTURE,
        message: err.response.data.message
      })
    })
  }
  catch {
    reject({
      type: PASSWORD_RESET_REQUEST_FAILTURE,
      message: "Error"
    })
  }
})

export const resetPassword = ( email, password, resetCode ) => new Promise((resolve, reject) => {
  try {
    axios.post(`${settings.baseUrl}${settings.auth.resetPassword}`, {
      email, password, resetCode
    }).then((response) => {
      if(response.status) return response.data;
      else reject({
        type: PASSWORD_RESET_FAILTURE
      })
    }).then((response) => {
      if(response.state) resolve({
        type: PASSWORD_RESET_SUCCESS,
        comments: response.comments
      })
      else reject({
        type: PASSWORD_RESET_FAILTURE,
        message: response.message
      })
    }).catch((err) => {
      reject({
        type: PASSWORD_RESET_FAILTURE,
        message: err.response.data.message
      })
    })
  }
  catch {
    reject({
      type: PASSWORD_RESET_FAILTURE,
      message: "Error"
    })
  }
})

export const captureGiftPayment = (orderId, token, giftID) => new Promise((resolve, reject) => {
  try {
    axios.post(`${settings.baseUrl}${settings.auth.captureGiftPayment}`, {
      orderID: orderId,
      token: token,
      giftID
    }).then( response => response.data).then((response) => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  } catch (error) {
    reject(error)    ;
  }
})

export const captureOfficalAcivatePayment = (orderId, token) => new Promise((resolve, reject) => {
  try {
    axios.post(`${settings.baseUrl}${settings.auth.captureOfficialActivatePayment}`, {
      orderID: orderId,
      token: token
    }).then( response => response.data).then((response) => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  } catch (error) {
    reject(error);
  }
})

export const captureGiftWithdraw = (orderId, token) => new Promise((resolve, reject) => {
  try {
    axios.post(`${settings.baseUrl}${settings.auth.captureGiftWitddraw}`, {
      orderID: orderId,
      token: token
    }).then( response => response.data).then((response) => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  } catch (error) {
    reject(error);
  }
})

export const getGifts = (isOfficial) => new Promise((resolve, reject) => {
  try {
    axios.get(`${settings.baseUrl}${settings.gift.get}`, {
      isOfficial
    }).then( response => response.data).then((response) => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  } catch (error) {
    reject(error)    ;
  }
});

export const getUserGifts = () => new Promise((resolve, reject) => {
  try {
    axios.get(`${settings.baseUrl}${settings.profile.gifts}`, {
      
    }).then( response => response.data).then((response) => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  } catch (error) {
    reject(error)    ;
  }
});

export const sendGift = ( giftID, postID ) => new Promise((resolve, reject) => {
  try {
    axios.put(`${settings.baseUrl}${settings.gift.send}`, {
      giftID, postID
    }).then( response => response.data).then((response) => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  } catch (error) {
    reject(error);
  }
});

export const updateUserInformation = ( data ) => new Promise((resolve, reject) => {
  try {
    axios.put(`${settings.baseUrl}${settings.profile.updateUserInfo}`, 
      data
    ).then( response => response.data).then((response) => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  } catch (error) {
    reject(error);
  }
})

export const getFollowsInfo = ( userid ) => new Promise((resolve, reject) => {
  try {
    axios.get(`${settings.baseUrl}${settings.profile.getFollows}`, {
      params: {
        userid

      }
    }
    ).then( response => response.data).then((response) => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  } catch (error) {
    reject(error);
  }
})

export const getNotification = ( ) => new Promise((resolve, reject) => {
  try {
    axios.get(`${settings.baseUrl}${settings.profile.getNotificaitons}`, {}
    ).then( response => response.data).then((response) => {
      resolve(response.data);
    }).catch(err => {
      reject(err);
    })
  } catch (error) {
    reject(error);
  }
})
