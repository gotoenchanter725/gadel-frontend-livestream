import axios, { get } from 'axios';
import { settings as s } from '../Settings';

const getUrl = async ep => {
  return `${s.baseUrl}${ep}`;
};

export const getData = async (relativeUrl, token) => {
  const url = await getUrl(relativeUrl);
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  try {
    const response = await get(url, options).then(res => res);
    return { status: response.status, data: response.data };
  } catch (err) {
    if (err.response) {
      return { status: err.response.status, data: [] };
    }
    return { status: 0, data: [] };
  }
};

export const getDataAnonymously = async relativeUrl => {
  const url = await getUrl(relativeUrl);
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*'
    }
  };
  try {
    const response = await get(url, options).then(res => res);
    return { status: response.status, data: response.data };
  } catch (err) {
    if (err.response) {
      return { status: err.response.status, data: [] };
    }
    return { status: 0, data: [] };
  }
};

export const postData = async (relativeUrl, data, token) => {
  const url = await getUrl(relativeUrl);
  const config = {
    method: 'post',
    url,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  if (data) {
    config.data = JSON.stringify(data);
  }
  try {
    const response = await axios(config)
      .then(res => res)
      .catch(error => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const postDataAnonymously = async (relativeUrl, data) => {
  const url = await getUrl(relativeUrl);
  const config = {
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json'
    }, 
    data: JSON.stringify(data),
    withCredentials: false
  };
  try {
    const response = await axios(config)
      .then(res => res)
      .catch(error => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const postFormData = async (relativeUrl, data, token) => {
  const url = await getUrl(relativeUrl);
  const config = {
    method: 'post',
    url,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: '*/*',
      Authorization: `Bearer ${token}`
    },
    data
  };
  try {
    const response = await axios(config)
      .then(res => res)
      .catch(error => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const patchData = async (relativeUrl, data, token) => {
  const url = await getUrl(relativeUrl);
  const config = {
    method: 'patch',
    url,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  if (data) {
    config.data = JSON.stringify(data);
  }
  try {
    const response = await axios(config)
      .then(res => res)
      .catch(error => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const putFormData = async (relativeUrl, data, token) => {
  const url = await getUrl(relativeUrl);
  const config = {
    method: 'put',
    url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
      Authorization: `Bearer ${token}`
    },
    data
  };

  const response = await fetch(config.url, {
    method: 'PUT', // or 'PUT'
    headers: { ...config.headers },
    body: config.data
  });
  if (response.status === 200) {
    const _data = {
      data: await response.json(),
      status: response.status
    };
    return _data;
  } else {
    return { status: null };
  }
};

export const patchFormData = async (relativeUrl, data, token) => {
  const url = await getUrl(relativeUrl);
  const config = {
    method: 'patch',
    url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
      Authorization: `Bearer ${token}`
    },
    data
  };

  const response = await fetch(config.url, {
    method: 'PATCH', // or 'PUT'
    headers: { ...config.headers },
    body: config.data
  });
  if (response.status === 200) {
    const _data = {
      data: await response.json(),
      status: response.status
    };
    return _data;
  } else {
    return { status: null };
  }
};

export const resetPassword = async (relativeUrl, data) => {
  const url = await getUrl(relativeUrl);
  const config = {
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json-patch+json',
      Accept: '*/*'
    },
    data: JSON.stringify(data)
  };

  try {
    const response = await axios(config)
      .then(res => res)
      .catch(error => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const postFile = async (relativeUrl, data) => {
  const url = await getUrl(relativeUrl);
  const config = {
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json-patch+json',
      Accept: '*/*'
    },
    data: JSON.stringify(data)
  };

  try {
    const response = await axios(config)
      .then(res => res)
      .catch(error => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const putData = async (relativeUrl, data, token) => {
  const url = await getUrl(relativeUrl);

  const config = {
    method: 'put',
    url,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: JSON.stringify(data)
  };
  try {
    const response = await axios(config)
      .then(res => res)
      .catch(error => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const deleteData = async (relativeUrl, token) => {
  const url = await getUrl(relativeUrl);

  const options = {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios
      .delete(url, options)
      .then(res => res)
      .catch(error => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};
