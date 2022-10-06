import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { SnackbarProvider } from 'notistack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StateProvider } from 'src/services/state/State';
import { reducer } from 'src/services/state/Reducer';
import { initialState } from 'src/services/state/InitialState';
// import Auth from 'src/components/Auth';
import Routes from 'src/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';

const history = createBrowserHistory();

const theme = createTheme({
  palette: {
    primary: {
      main: '#01a6ef',
      contrastText: '#ffffff'
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Router history={history}>
            {/* <Auth> */}
              <Routes />
            {/* </Auth> */}
          </Router>
        </StateProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
