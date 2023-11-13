import React, {
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { SplashScreen } from 'src/components';
import { setUserData, logout } from 'src/actions/accountActions';
import authService from 'src/services/authService';
import { useStateValue } from 'src/services/state/State';
import { actions } from 'src/services/state/Reducer';

function Auth({ children }) {
  const [store, dispatch] = useStateValue();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      authService.setAxiosInterceptors({
        onLogout: () => dispatch(logout())
      });
      authService.handleAuthentication();
      if (authService.isAuthenticated() && authService.isValidToken( authService.getAccessToken())) {
        
        authService.loginInWithToken().then((user) => {
          dispatch(setUserData(user));
          dispatch({
            type: actions.SET_ACCESS_TOKEN,
            payload: authService.getAccessToken(),
          });
          authService.setSession(authService.getAccessToken())
          dispatch({
            type: actions.SET_USERNAME,
            payload: JSON.parse(authService.getUsername()),
          });
          dispatch({
            type: actions.SET_USER,
            payload: JSON.parse(authService.getUser()),
          });
          setLoading(false);
        }).catch((err) => {
          setLoading(false);
        });
      }
      else setLoading( false )
    };

    initAuth();
  }, [dispatch]);
  if (isLoading) {
    return <SplashScreen />;
  }

  return children;
}

Auth.propTypes = {
  children: PropTypes.any
};

export default Auth;
