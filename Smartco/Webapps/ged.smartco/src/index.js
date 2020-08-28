import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./assets/css/feather.css"
import "./assets/css/materialdesignicons.css"
import "./assets/css/dripiIcons.css"
import "./assets/css/fa.css"
import "./assets/css/fonts.css"
import './assets/scss/DefaultTheme.scss';
import './App.css';

import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import {LocaleProvider} from 'baseui';

const localeFrOverride= {
    fileuploader: {
        "dropFilesToUpload": "Déposer des fichiers ici pour télécharger",
        "or": "ou",
        "browseFiles": "Cliquer ici",
        "retry": "réessayer le téléchargement",
        "cancel": "Annuler"
    },
};

const engine = new Styletron();

ReactDOM.render(
    <StyletronProvider value={engine} >
        <BaseProvider theme={LightTheme}  >
            <LocaleProvider locale={localeFrOverride}>
                <App />
            </LocaleProvider>

        </BaseProvider>
    </StyletronProvider>,
    document.getElementById("root")
);

serviceWorker.unregister();
