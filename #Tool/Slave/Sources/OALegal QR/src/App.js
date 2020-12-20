import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


import ScanBouteille from "./pages/ScanQrCode/ScanBouteille";
import 'video-react/dist/video-react.css'; // import css







export default class App extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }


    render() {

        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={ScanBouteille}/>

                </Switch>
            </Router>
        )
    }

}




