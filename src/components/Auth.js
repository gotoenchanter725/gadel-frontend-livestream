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
  const [, dispatch] = useStateValue();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      authService.setAxiosInterceptors({
        onLogout: () => dispatch(logout())
      });

      authService.handleAuthentication();

      if (authService.isAuthenticated()) {
        const user = await authService.loginInWithToken();
        await dispatch(setUserData(user));
        dispatch({
          type: actions.SET_ACCESS_TOKEN,
          payload: authService.getAccessToken(),
        });
        dispatch({
          type: actions.SET_USERNAME,
          payload: JSON.parse(authService.getUsername()),
        });
      }

      setLoading(false);
    };

    initAuth();
  }, [dispatch]);
  console.log('')
  if (isLoading) {
    return <SplashScreen />;
  }

  return children;
}

Auth.propTypes = {
  children: PropTypes.any
};

export default Auth;
