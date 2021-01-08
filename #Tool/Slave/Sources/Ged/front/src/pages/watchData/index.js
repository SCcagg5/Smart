import React, {Component} from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { SetCookie, DeleteCookie, hasCookie } from './Utility/CookieManager.js'
import { Navbar, Nav } from 'react-bootstrap';
import Dashboard  from './Dashboard/Dashboard';
import PatientService from "../../provider/patientservice"

import 'bootstrap/dist/css/bootstrap.min.css';




const CLIENT_ID=process.env.REACT_APP_CLIENT_ID
class Index extends Component {
    constructor(props){
        super(props)

        this.state={
            user:{
                haslogin: false,
                accessToken: ""
            },
            userID:"",
            patient:""

        }

        this.login=this.login.bind(this)
        this.logout=this.logout.bind(this)
    }

    componentDidMount() {
        const id=this.props.match.params.id
        this.setState({userID:id})
        PatientService.getPatientbyId(id).then((res)=>{
            console.log(res)
            this.setState({patient:res[0]})
        })

    }


    login(response) {
        console.log(response.accessToken)

        if (response.accessToken) {
            console.log(response)

            let user = this.state.user
            user.haslogin=true
            user.accessToken=response.accessToken



          this.setState({
              user:user
          })
            let patient= this.state.patient
            patient.access_token_google=response.accessToken
            PatientService.UpdatePatient(patient)

        }

    }

    logout(response){
        let user ={
            haslogin: false,
            accessToken: ""
        }
        this.setState({
            user:user
        })
    }
    handleLogoutFailure(response) {
        alert('Failed to log out')
    }
    handleLoginFailure(response) {
        alert('Failed to log out')
        console.log(JSON.stringify(response))
    }
    render() {
        let user = this.state.user
        let haslogin=this.state.haslogin
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" style={{backgroundColor: '#272727'}}>
                    <Navbar.Brand href="#home" style={{color: '#ffffff'}}>MajorSanté test google Fitness</Navbar.Brand>
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        {haslogin ?
                            <GoogleLogout
                                clientId={CLIENT_ID}
                                buttonText='Logout'
                                onLogoutSuccess={this.logout}
                                onFailure={this.handleLogoutFailure}
                            >
                            </GoogleLogout> : <GoogleLogin
                                clientId={CLIENT_ID}
                                buttonText='Login'
                                onSuccess={this.login}
                                onFailure={this.handleLoginFailure}
                                cookiePolicy={'single_host_origin'}
                                responseType='code,token'
                                scope = { 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read'}
                            />
                        }
                    </Nav>
                </Navbar>

                <Dashboard user={user}/>

            </div>
        );
    }
}

export default Index;
