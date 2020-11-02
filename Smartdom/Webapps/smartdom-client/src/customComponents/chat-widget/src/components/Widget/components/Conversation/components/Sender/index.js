import React, {Component} from 'react';
import PropTypes from 'prop-types';

import send from '../../../../../../../assets/send_button.svg';

import './style.scss';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import {addUserMessage, addResponseMessage} from '../../../../../../../../../customComponents/chat-widget/index';
import loading from "../../../../../../../assets/loading.gif";
import verifForms from "../../../../../../../../../tools/verifForms"
import firebase from "firebase/app";
import "firebase/auth"

class Sender extends Component {
    input = React.createRef();

    componentDidUpdate() {
        //this.input.current.focus();
    }

    componentWillMount() {

    }

    state = {
        changePass: "",
        messageResponse: this.props.messageResponse,

        email: ""
    };


    render() {
        const {sendMessage, placeholder, disabledInput, autofocus, messageSended, messageResponse} = this.props;
        console.log(messageResponse);
        return (
            this.state.messageResponse === "Voulez-vous changer votre mot de passe ?" ?
                <div style={{textAlign: "center"}}>
                    <FormGroup row style={{display: "block"}}>
                        <FormControlLabel className="customFormControlLabel"
                                          classes={{
                                              label: "customUILabel",
                                              root: "customUILabel-root"
                                          }}
                                          control={
                                              <Checkbox
                                                  checked={this.state.changePass === 'true'}
                                                  onChange={() => {
                                                      this.setState({changePass: "true"});
                                                      setTimeout(() => {
                                                          addUserMessage("Oui");
                                                          setTimeout(() => {
                                                              this.setState({messageResponse: "Email"});
                                                              addResponseMessage("Quel est votre adresse email ?")
                                                          }, 500);
                                                      }, 500)
                                                  }}
                                                  value='true'
                                              />
                                          }
                                          label="Oui"
                        />
                        <FormControlLabel className="customFormControlLabel"
                                          classes={{
                                              label: "customUILabel",
                                              root: "customUILabel-root"
                                          }}
                                          control={
                                              <Checkbox
                                                  checked={this.state.changePass === 'false'}
                                                  onChange={() => {
                                                      this.setState({changePass: "false"});
                                                      setTimeout(() => {
                                                          addUserMessage("Non")
                                                      }, 500)
                                                  }}
                                                  value='false'
                                              />
                                          }
                                          label="Non"
                        />
                    </FormGroup>
                </div> :
                this.state.messageResponse === "Email" ?
                    <div className="rcw-sender">
                        <input type="text" className="rcw-new-message" name="message"
                               placeholder={"Entrez votre adresse email"}
                               onChange={(event) => this.setState({email: event.target.value})}
                               disabled={disabledInput} autoFocus={autofocus} autoComplete="off"
                               value={this.state.email}/>
                        <button className="rcw-send" onClick={() => {
                            addUserMessage(this.state.email);
                            this.setState({messageResponse: "verifmail"});
                            setTimeout(() => {
                                if(verifForms.verif_Email(this.state.email) === true){
                                    this.setState({email:"",messageResponse: "Email"});
                                    addResponseMessage("Il semble que le format de votre adresse email est invalide");
                                    setTimeout(() => {
                                        addResponseMessage("Entrez votre adresse email une autre fois et vérifier qu'elle a le bon format");
                                    },600);
                                }else{
                                    firebase.auth().sendPasswordResetEmail(this.state.email).then( ok => {
                                        this.setState({email:"",messageResponse: ""});
                                        addResponseMessage("Félécitation! Nous avons vous envoyé un mail avec un lien pour modifier votre mot de passe");
                                        setTimeout(() => {
                                            addResponseMessage("À très bientôt");
                                        },600);
                                    }).catch(err => console.log(err));

                                }
                            },1500)
                        }}>
                            <img src={send} className="rcw-send-icon" alt="send"/>
                        </button>
                    </div> :
                    this.state.messageResponse === "verifmail" ?
                        <div align="center">
                            <img alt="loading" src={loading} style={{width:100,height:55,objectFit:"contain"}}/>
                        </div> :

                        <form className="rcw-sender" onSubmit={sendMessage}>
                            <input type="text" className="rcw-new-message" name="message" placeholder={placeholder}
                                   disabled={disabledInput} autoFocus={autofocus} autoComplete="off" ref={this.input}/>
                            <button type="submit" className="rcw-send">
                                <img src={send} className="rcw-send-icon" alt="send"/>
                            </button>
                        </form>

        );
    }

}

Sender.propTypes = {
    sendMessage: PropTypes.func,
    placeholder: PropTypes.string,
    disabledInput: PropTypes.bool,
    autofocus: PropTypes.bool
};

export default Sender;
