import React, {Component} from 'react';
import login_bg from '../../assets/images/BS/login_bg.jpg'
import nl_logo from '../../assets/images/BS/nl_logo.png'
import SSOService from "../../provider/ssoservice";
class Signup2 extends Component {
    constructor(props){
        super(props)
            this.state={
             nom:'',
                prenom:'',
                phone:'',



            }

    }



    handleChange(name,e){
        let data = e.target.value

        this.setState({[name]:data})

    }

    upadteuser(){
        let data = {
           phone:{number:this.state.phone,lang:'FR'},
            first_name:{first_name: this.state.prenom},
            lastname:{last_name:this.state.nom,public:true}
        }

         let usrtoken= localStorage.getItem('usr_token')
        console.log(usrtoken)

        SSOService.UpdateUser(usrtoken,data).then((res)=>{
            console.log(res)
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



                                                <h1 className="mb20">Completez votre profil</h1>

                                            <div className="form-group">
                                                <label htmlFor="account-email">Nom</label>
                                                <input onChange={(e)=>{
                                                    this.handleChange('nom',e)
                                                }} type="email" className="form-control   " id="account-email"
                                                       name="account-email" value={this.state.nom} required=""/>
                                                <div className="invalid-feedback">


                                                </div>
                                            </div>

                                                <div className="form-group">
                                                    <label htmlFor="account-email">Prenom</label>
                                                    <input onChange={(e)=>{
                                                        this.handleChange('prenom',e)
                                                    }} type="email" className="form-control   " id="account-email"
                                                           name="account-email" value={this.state.prenom} required=""/>
                                                        <div className="invalid-feedback">


                                                        </div>
                                                </div>




                                            <div className="form-group">
                                                <label htmlFor="account-email">phone</label>
                                                <input type="tel" onChange={(e)=>{this.handleChange('phone',e)}}  className="form-control   " id="account-email"
                                                       name="account-email" value={this.state.phone} required=""/>
                                                <div className="invalid-feedback">


                                                </div>
                                            </div>








                                                <button type="submit"
                                                     onClick={(e)=>{
                                                         this.upadteuser()
                                                     }}   className="btn btn-primary btn-block mt40">Enregistrer
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

export default Signup2;
