import React, { useEffect, Provider, createContext, useRef, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { SnackbarProvider } from 'notistack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StateProvider } from 'src/services/state/State';
import { reducer } from 'src/services/state/Reducer';
import { initialState } from 'src/services/state/InitialState';
import authService from './services/authService';
// import Auth from 'src/components/Auth';
import Routes from 'src/Routes';

import { io } from "socket.io-client";
import { settings } from './services/Settings';
import { getNotification } from './actions/accountActions';

const history = createBrowserHistory();
let lastNotify = [];

const StateContext = createContext({
  online: [], // {userid, socketid},
  messages: [], // {_id, messages:[{text, date, file}]},,
  contacts: [],
  setOnline: null,
  setMessages: null,
  setContacts: null,
  requestOnlineUsers: null,
  notifications: [],
  setNotifications: null
});

export { StateContext };

const theme = createTheme({
  palette: {
    primary: {
      main: '#01a6ef',
      contrastText: '#ffffff'
    },
  },
});

function App() {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState([]);
  const [socketid, setSocketid] = useState("");
  const [contacts, setContacts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const addOnlineUser = ( userid, socketid ) => {
    let index = online.findIndex((item) => item.userid == userid);
    if( index >= 0 ) online.splice(index, 1);
    index = online.findIndex((item) => item.socketid == socketid);
    if( index >= 0 ) online.splice(index, 1);
    online.push({userid: userid, socketid: socketid});
    setOnline( [...online] );
  }

  const removeOnlineUser = ( socketid ) => {
    const index = online.findIndex((item) => item.socketid == socketid);
    if( index >= 0 ){
      online.splice(index, 1);
      setOnline( [...online] );
    } 
  }

  const notify = (title, message, ico = null) => {
    if( lastNotify.length >= 2 ) {
      let rm = lastNotify.shift();
      rm.close();
    }
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      const notification = new Notification(title, {body: message, icon: ico});
      lastNotify.push(notification)
      setTimeout(() => {
        notification.close()
      }, 20000);
      // …
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(title, {body: message});
          lastNotify.push(notification)
          setTimeout(() => {
            notification.close()
          }, 20000);
        }
      });
    }
  }

  const requestOnlineUsers = () => {
    const user = JSON.parse(authService.getUser());
    if( user && user._id ) {
      try {
        socket.current.emit("i-connected", {
          userid: user._id
        });
      } catch (error) {
        
      }
    }
  }

  const onLogin = () => {
    requestOnlineUsers();
    getNotification().then(response => {
      response.notifications.map(item => notifications.push(item));
      setNotifications([...notifications]);
    }).catch(err => {
      alert( err.message );
    })
  }

  useEffect(() => {
    const user = JSON.parse(authService.getUser());

    socket.current = io(process.env.REACT_APP_SOCKET_SERVER_URL);
    socket.current.on("connect", (e) => {
      requestOnlineUsers();
    });

    socket.current.on("new-message", (e) => {
      const userIndex = messages.findIndex((item) => item._id == e.from);
      const contactIndex = contacts.findIndex((item) => item._id == e.from);
      if(userIndex >= 0) {
        messages[userIndex].messages.push(e);
      }
      else {
        messages.push({
          _id: e.from,
          messages: [e]
        })
      }
      if( contactIndex < 0 ) ;
      else {
        notify(contacts[contactIndex].username, e.content, `${settings.sourceUrl}/avatar/${contacts[contactIndex]._id}`);
        contacts[contactIndex].unread ++;
        setContacts( [...contacts] );
      }
      setMessages([...messages]);
    });

    socket.current.on("user-connect", (e) => {
      if( user && user._id ) {
        addOnlineUser(e.userid, e.socketid);
        socket.current.emit("im-online", {userid: user._id, to: e.socketid});
      }
    });

    socket.current.on("im-online", (e) => {
      if( user && user._id ) {
        addOnlineUser(e.userid, e.socketid);
      }
    });

    socket.current.on("user-disconnect", (e) => {
      if( user && user._id ){
        removeOnlineUser(e.socketid);
      }
    });

    socket.current.on("new-notificaiton", (e) => {
      if( user && user._id ){
        notify(`Gadel ${e.type}`, e.text, `${settings.sourceUrl}/avatar/${e.userId}`);
        notifications.push(e);
        setNotifications([...notifications]);
        console.log(notifications)
      }
    });

    if( user && user._id ) {
      onLogin();
    }

    document.addEventListener("loggedin", onLogin);
    return () => {
      document.removeEventListener("loggedin", onLogin);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <StateContext.Provider value={{ 
            online: online, 
            messages: messages, 
            setMessages: setMessages,
            notifications: notifications,
            contacts: contacts,
            setContacts: setContacts,
            requestOnlineUsers: requestOnlineUsers,
            setNotifications: setNotifications
          }}>
            <Router history={history}>
              <Routes />
            </Router>
          </StateContext.Provider>
        </StateProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
