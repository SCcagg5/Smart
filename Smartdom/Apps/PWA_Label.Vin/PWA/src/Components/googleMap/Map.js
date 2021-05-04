import React, { Component, Fragment } from "react";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

class Map extends Component{

    static defaultProps = {
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAu0T6qzQiNvXqq8dszA2puSj5LePOpm3U",

    }

    constructor(props) {
        super(props);
        this.state={
            isOpen:false,
            lat:props.lat,
           lng:props.lng,
            markers:[
                {lat :props.lat, lng:10.551456,desc:"moyenne de production : 10kg",isOpen:false},
                {lat:36.704667, lng:10.551308,desc:"moyenne de production : 8kg",isOpen:false}
            ]
        }
    }

    handleToggleClose(i){
        let markers= this.state.markers
        markers[i].isOpen=false
        this.setState({markers:markers})
    }
    handleToggleOpen(i){
        let markers= this.state.markers
        markers[i].isOpen=true
        this.setState({markers:markers})
    }




    CMap = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            mapTypeId='satellite'

            defaultZoom={17}
            defaultCenter={{lat:36.704660, lng:10.551456}}
        >
            {props.children}
        </GoogleMap>
    ));



    render() {

        const markers=[
            {lat :36.704660, lng:10.551456,desc:"moyenne de production : 10kg",isOpen:false},
            {lat:36.704667, lng:10.551308,desc:"moyenne de production : 8kg",isOpen:false}


        ]
        return (
            <Fragment>
                <this.CMap
                    googleMapURL={this.props.googleMapURL}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `700px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    center= {{lat: this.state.lat, lng: this.state.lng }}
                >


                            <Marker


                                options={{icon:{url:"http://mt.google.com/vt/icon?psize=27&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=50&text=•&scale=1"}}}

                                position={{ lat:this.state.lat, lng: this.state.lng }}
                            >

                                    <InfoWindow >
                                        <span>''</span>
                                    </InfoWindow>
                                )}

                            </Marker>







                </this.CMap>
            </Fragment>
        );
    }
}


export default Map;
