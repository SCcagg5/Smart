import React, {Component} from 'react';
import LoginManagerService from "../../provider/loginManager";
import NavBarNlManager from "../../components/NavBar/NavBarNLManager";
import Geocode from "react-geocode";

class Managers extends Component {
    constructor(props){
        super(props)
        this.state={
            manager:[]
        }

    }

    componentDidMount() {
        this.getManagers()
      this.getLoca()
    }
    getManagers(){
       LoginManagerService.getManagers().then((res)=>{
           console.log(res)
       })
    }

    getLoca(){
        let headers = new Headers();
        headers.append("Accept", '*/*');
        headers.append("Access-Control-Allow-Origin", '*');

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyC2wj8Pplhih9CcgrWIeTWD62hyIOqW39Q',
            {
                method:'GET',
                headers:headers,


            }).then((res)=>{
                console.log(res.json())
        })
    }

    render() {
        return (
            <div>
                <NavBarNlManager nav={"manager"}></NavBarNlManager>
                <div className="wrapper mt-5">


                </div>


            </div>
        );
    }
}

export default Managers;
