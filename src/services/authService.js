import jwtDecode from 'jwt-decode';
import axios from 'src/utils/axios';
import { settings as s } from 'src/services/Settings';

class AuthService {
  setAxiosInterceptors = ({ onLogout }) => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          this.setSession(null);
          this.setUsername(null);

          if (onLogout) {
            onLogout();
          }
        }

        return Promise.reject(error);
      }
    );
  };

  handleAuthentication() {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return;
    }

    if (accessToken) {
      this.setSession(accessToken);
    } else {
      this.setSession(null);
      this.setUsername(null);
    }
  }

  loginWithEmailAndPassword = (email, password) => new Promise((resolve, reject) => {
    fetch(`${s.baseUrl}${s.auth.login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify({ email: email, password })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.user) {
          this.setSession(response.token);
          this.setUser(response.user)
          resolve(response);
        } else if(response.code == 100){
          resolve(response)
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  })

  loginInWithToken = () => new Promise((resolve, reject) => {
    const user = JSON.parse(this.getUser());
    if (user) {
      resolve(user);
    } else {
      reject(user);
    }
  })

  registerUser = (firstName, lastName, email, country, phone, password, confirmPassword, isOfficial) => new Promise( (resolve, reject) => {
    fetch(`${s.baseUrl}${s.auth.registerUser}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify({ 
        firstname : firstName, 
        lastname : lastName, 
        email, 
        country, 
        phone,
        password, 
        confirmPassword,
        isOfficial
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status) {
          // this.setSession(response.token);
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  })

  logout = () => {
    this.setSession(null);
    this.setUser(null);
    this.setUsername(null);
  }

  
  emailVerify = (verifyCode) => new Promise( (resolve, reject) => {
    fetch(`${s.baseUrl}${s.auth.emailVerify}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify({emailVerificationCode: verifyCode})
    })
      .then((response) => response.json())
      .then((response) => {
          resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  })

  setSession = (accessToken) => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem('accessToken');
      delete axios.defaults.headers.common.Authorization;
    }
  }

  setFingerprint = (fingerprint) => {
    if (fingerprint) {
      localStorage.setItem('fingerprint', fingerprint);
    } else {
      localStorage.removeItem('fingerprint');
    }
  } 

  setUUID = (uuid) => {
    if (uuid) {
      localStorage.setItem('uuid', uuid);
    } else {
      localStorage.removeItem('uuid');
    }
  } 

  setUser = (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  setUsername = (username) => {
    if (username) {
      localStorage.setItem('username', JSON.stringify(username));
    } else {
      localStorage.removeItem('username');
    }
  }

  getAccessToken = () => localStorage.getItem('accessToken');

  getFingerprint = () => localStorage.getItem('fingerprint');

  getUUID = () => localStorage.getItem('uuid');

  getUser = () => localStorage.getItem('user');

  getUsername = () => localStorage.getItem('username');

  isValidToken = (accessToken) => {
    if (!accessToken) {
      return false;
    }

    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  }

  isAuthenticated = () => !!this.getAccessToken()
}

const authService = new AuthService();

export default authService;
