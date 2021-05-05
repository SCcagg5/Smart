import React, {Component} from 'react';
import login_bg from '../../assets/images/BS/login_bg.jpg'
import nl_logo from '../../assets/images/BS/nl_logo.png'
import SSOService from "../../provider/ssoservice";
class Signup extends Component {
    constructor(props){
        super(props)
            this.state={
              email:'',
              pass1:'',
              pass2:'',


            }

    }
    handleChange(name,e){
        let data = e.target.value

        this.setState({[name]:data})

    }
    signUp(){
        let data = {
            email:this.state.email,
            pass1:this.state.pass1,
            pass2:this.state.pass2
        }
        SSOService.CreateUser(data).then((res)=>{
            console.log(res)
            if (res && res.data!=null){
                localStorage.setItem('usr_token',JSON.stringify(res.data.usr_token))
                this.props.history.push('/Signup2')
            }


        })
    }
    render() {
        return (
            <div>
                <div className=" p-0">
                    <div className="row" style={{minHeight:"100vh"}}>

                        <div className="col-md-6 d-none d-md-flex"
                             style={{backgroundImage: `url(${login_bg})`,backgroundPosition: "center" ,backgroundRepeat:'no-repeat',backgroundSize:"cover"}}>
                        </div>

                        <div className="col-md-6">
                            <div className="login d-flex align-items-center py-0 py-md-5">

                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12 text-right">
                                            <a href="/">
                                                <button className="btn btn-primary btn-sm m-4">
                                                    Mon espace
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-10 col-xl-10 mx-auto">



                                                <h1 className="mb20">Formulaire d'inscription</h1>



                                                <div className="form-group">
                                                    <label htmlFor="account-email">Email du nouveau manager</label>
                                                    <input onChange={(e)=>{this.handleChange('email',e)}} type="email" className="form-control   " id="account-email"
                                                           name="account-email" value={this.state.email} required=""/>

                                                        <div className="invalid-feedback">


                                                        </div>
                                                </div>


                                            <div className="form-group">
                                                <label htmlFor="account-email">Mot de passe</label>
                                                <input  onChange={(e)=>{this.handleChange('pass1',e)}}   type="password" className="form-control   " id="account-email"
                                                       name="account-email" value={this.state.pass1} required=""/>
                                                <div className="invalid-feedback">


                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="account-email">repetez mot de passe </label>
                                                <input onChange={(e)=>{this.handleChange('pass2',e)}}  type="password" className="form-control   " id="account-email"
                                                       name="account-email" value={this.state.pass2} required=""/>
                                                <div className="invalid-feedback">


                                                </div>
                                            </div>






                                                <button type="submit"
                                                        onClick={()=>this.signUp()}
                                                        className="btn btn-primary btn-block mt40">Continuer
                                                </button>



                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;
