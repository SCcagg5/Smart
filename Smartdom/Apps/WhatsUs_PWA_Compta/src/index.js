import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import './index.css';
import "./assets/css/feather.css"
import "./assets/css/materialdesignicons.css"
import "./assets/css/dripiIcons.css"
import "./assets/css/fa.css"
import "./assets/css/fonts.css"
import './assets/scss/DefaultTheme.scss';
import './App.css';
import './assets/css/semantic-ui_clone.css'
import './Pages/Rooms/room.css'
import "./assets/css/react-input-tags.css";
import './assets/css/antDesign.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1a73e8',
        },
        secondary: {
            main: '#11cb5f',
        },
    },
});

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
