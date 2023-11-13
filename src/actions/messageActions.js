import axios from 'src/utils/axios';
import { settings } from "src/services/Settings"

export const GET_MESSAGE_SUCCESS   = '@message/get/success';
export const GET_MESSAGE_FAILTURE  = '@message/get/failture';
export const GET_CONTACT_SUCCESS   = '@contact/get/success';
export const GET_CONTACT_FAILTURE  = '@contact/get/failture';
export const SEND_MESSAGE_SUCCESS  = '@message/send/success';
export const SEND_MESSAGE_FAILTURE = '@message/send/failture';
export const ADD_CONTACT_SUCCESS   = '@contact/add/success';
export const ADD_CONTACT_FAILTURE  = '@contact/add/failture';
export const MARK_AS_READ_SUCCESS = '@message/asread/success';
export const MARK_AS_READ_FAILTURE = '@message/asread/failture';

export const getContact = () => new Promise((resolve, reject) => {
  try {
    axios.get(`${settings.baseUrl}${settings.contact.get}`).then((response) => {
      return response.data;
    }).then((response) => {
      if( response.status ) {
        resolve({
          type: GET_CONTACT_SUCCESS,
          payload: {
            contacts: response.data.contacts
          }
        })
      }
      else {
        reject({
          type: GET_CONTACT_FAILTURE,
          payload: {
            messages: response.message
          }
        })
      }
    }).catch((err) => {
      reject({
        type: GET_CONTACT_FAILTURE,
        payload: {
          messages: err
        }
      })
    })
  } catch (err) {
    reject({
      type: GET_CONTACT_FAILTURE,
      payload: {
        messages: err
      }
    })
  }
});

export const addContact = (userid) => new Promise((resolve, reject) => {
  try {
    axios.post(`${settings.baseUrl}${settings.contact.add}`, {
      userid
    }).then((response) => {
      return response.data;
    }).then((response) => {
      if( response.status ) {
        resolve({
          type: ADD_CONTACT_SUCCESS,
          payload: {
            messages: response.data.messages
          }
        })
      }
      else {
        reject({
          type: ADD_CONTACT_FAILTURE,
          payload: {
            messages: response.message
          }
        })
      }
    }).catch((err) => {
      reject({
        type: ADD_CONTACT_FAILTURE,
        payload: {
          messages: err
        }
      })
    })
  } catch (err) {
    reject({
      type: ADD_CONTACT_FAILTURE,
      payload: {
        messages: err
      }
    })
  }
});

export const getMessage = (data) => new Promise((resolve, reject) => {
  try {
    axios(`${settings.baseUrl}${settings.message.get}`, {
      params: data
    }).then((response) => {
      return response.data;
    }).then((response) => {
      if( response.status ) {
        resolve({
          type: GET_MESSAGE_SUCCESS,
          payload: {
            messages: response.data.messages
          }
        })
      }
      else {
        reject({
          type: GET_MESSAGE_FAILTURE,
          payload: {
            messages: response.message
          }
        })
      }
    }).catch((err) => {
      reject({
        type: GET_MESSAGE_FAILTURE,
        payload: {
          messages: err
        }
      })
    })
  } catch (err) {
    reject({
      type: GET_MESSAGE_FAILTURE,
      payload: {
        messages: err
      }
    })
  }
})

export const sendMessage = (to, content, file, socketid, onProgress = (e) => {}) => new Promise((resolve, reject) => {
  try {
    let formData = new FormData();
    formData.append("to", to);
    formData.append("content", content);
    formData.append("socketid", socketid);
    if( file ) formData.append( "file", file );
    axios.post(`${settings.baseUrl}${settings.message.send}`, formData, {
      onUploadProgress: onProgress
    }).then((response) => {
      return response.data;
    }).then((response) => {
      if( response.status ) {
        resolve({
          type: SEND_MESSAGE_SUCCESS,
          payload: {
            message: response.data
          }
        })
      }
      else {
        reject({
          type: SEND_MESSAGE_FAILTURE,
          payload: {
            messages: response.message
          }
        })
      }
    }).catch((err) => {
      reject({
        type: SEND_MESSAGE_FAILTURE,
        payload: {
          messages: err
        }
      })
    })
  } catch (err) {
    reject({
      type: SEND_MESSAGE_FAILTURE,
      payload: {
        messages: err
      }
    })
  }
  
})

export const markAsRead = ( messageId ) => new Promise((resolve, reject) => {
  axios.put(`${settings.baseUrl}${settings.message.asRead}`, {
    id: messageId
  }).then((response) => response.data).then((response) => {
    if( response.status ) resolve({
      type: MARK_AS_READ_SUCCESS,
    })
    else reject({
      type: MARK_AS_READ_FAILTURE,
      message: response.message
    })
  }).catch((err) => {
    reject({
      type: MARK_AS_READ_FAILTURE,
      message: err
    })
  })
})
