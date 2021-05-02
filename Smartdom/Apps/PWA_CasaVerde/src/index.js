import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import './index.css';
import "./assets/css/feather.css"
import "./assets/css/materialdesignicons.css"
import "./assets/css/dripiIcons.css"
import "./assets/css/fa.css"
import "./assets/css/fonts.css"
import './assets/scss/DefaultTheme.scss';
import './App.css';
import './assets/css/semantic-ui_clone.css'
import "./assets/css/react-input-tags.css";
import './assets/css/antDesign.css';
import { SnackbarProvider } from 'notistack';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme ({
    palette: {
        primary: {
            main: '#2CB33A',
        },
        secondary:{
            main:'#ff1493'
        }
    }
});

ReactDOM.render(
  <React.StrictMode>
      <SnackbarProvider maxSnack={5}>
          <MuiThemeProvider theme = {theme}>
              <App />
          </MuiThemeProvider>
      </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
