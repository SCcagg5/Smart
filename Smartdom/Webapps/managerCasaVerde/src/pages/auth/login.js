import React, {Component} from 'react';
import login_bg from '../../assets/images/BS/login_bg.jpg'
import nl_logo from '../../assets/images/BS/nl_logo.png'
import "./style.css"
import LoginManagerService from "../../provider/loginManager";
import SSOService from "../../provider/ssoservice";

class Login extends Component {
    constructor(props){
        super(props)
        this.state={

            user:"",
            password:""

        }


    }

    handleChange(name,e){
        let data = e.target.value

        this.setState({[name]:data})

    }
    login(){

        let data ={
            login:this.state.user,
            password:this.state.password
        }
        this.props.history.push('/Accueil')

        /*    SSOService.Login(data).then((res)=>{
                if (res && res.data!=null){
                    localStorage.setItem('usr_token',JSON.stringify(res.data.usr_token))
                    document.cookie='usr_token='+res.data.usr_token

                    this.props.history.push('/Accueil')
                }else {
                    alert(res.error)
                }
            })*/
    }
    render() {
        return (
            <div >

                <div style={{backgroundImage: `url(${login_bg})` , width: "100%",
    height: "100%",

    position: "absolute"}}>
                </div>

                <img src={nl_logo} className="logo-nl-login"/>
                <div className="row vh-100" id="login-page">
                    <div className="col-lg-12  pr-0 align-self-center">
                        <div className="row">
                            <div className="col-lg-7 col-md-5 col-sm-12"></div>
                            <div className="col-lg-4 col-md-5 col-sm-12">
                                <div className="card auth-card shadow-lg">
                                    <div className="card-body">
                                        <div className="px-3">
                                            <div className="text-center auth-logo-text">
                                                <h4 className="mt-0 mb-3 mt-5">Votre espace manager</h4>
                                            </div>




                                                <div className="form-group mt20"><label htmlFor="username">Username</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend"><span
                                                            className="input-group-text"><i
                                                            className="fas fa-user-tie"></i></span></div>
                                                        <input onChange={(e)=>{
                                                            this.handleChange('user',e)
                                                        }} value={this.state.user} type="text" id="identifier" name="identifier"
                                                               className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="form-group"><label htmlFor="userpassword">Mot de
                                                    passe</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend"><span
                                                            className="input-group-text"><i className="fas fa-lock"></i></span>
                                                        </div>
                                                        <input  onChange={(e)=>{
                                                            this.handleChange('password',e)
                                                        }} value={this.state.password} type="password" id="password" name="password"
                                                               className="form-control" placeholder=""/>
                                                    </div>
                                                </div>


                                                <div className="form-group mb-0 row">
                                                    <div className="col-12 mt-2">
                                                        <p><span className="text-error text-danger" id="error"></span>
                                                        </p>
                                                    </div>
                                                    <div  onClick={()=>{this.login()}} className="col-12 mt-2"><a
                                                        className="btn btn-success btn-round btn-block waves-effect waves-light text-white"
                                                        >Connexion <i
                                                       className="fas fa-sign-in-alt ml-1"></i></a></div>

                                                </div>

                                        </div>


                                        <div className="m-3 text-center text-muted">
                                            <p><a href="/forgot-password" className="text-primary ml-2">Mot de passe
                                                oublié ?</a><br/>
                                                <a className="text-primary ml-2" href="/signup">Inscription d'un nouveau
                                                    manager</a></p>
                                        </div>
                                    </div>
                                    <ul style={{listStyle: 'none',textAlign: 'right'}}>


                                        <li className="dropdown">
                                            <a href="#"
                                               className="nav-link dropwown-toggle waves-effect waves-light nav-user"
                                               data-toggle="dropdown" role="button" aria-haspopup="false"
                                               aria-expanded="false">
                                                <img style={{display:'inline-block',width:"18px",height:"12px"}}
                                                     src="/assets/images/flags/033.svg" alt="French flag"/>
                                                    <i className="mdi mdi-chevron-down"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item change-language" href="#" data-lang="en">
                                                    <img style={{display:'inline-block',width:"18px",height:"12px"}}
                                                         src="/assets/images/flags/044.svg" alt="GB flag"/>
                                                        English
                                                </a>
                                                <a className="dropdown-item change-language" href="#" data-lang="de">
                                                    <img style={{display:'inline-block',width:"18px",height:"12px"}}
                                                         src="/assets/images/flags/049.svg" alt="DE flag"/>
                                                        Deutsch
                                                </a>
                                                <a className="dropdown-item change-language" href="#" data-lang="nl">
                                                    <img style={{display:'inline-block',width:"18px",height:"12px"}}
                                                         src="/assets/images/flags/031.svg" alt="NL flag"/>
                                                        Nederlands
                                                </a>
                                                <a className="dropdown-item change-language" href="#" data-lang="ru">
                                                    <img style={{display:'inline-block',width:"18px",height:"12px"}}
                                                         src="/assets/images/flags/007.svg" alt="RU flag"/>
                                                        Russia
                                                </a>
                                            </div>

                                        </li>


                                    </ul>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
