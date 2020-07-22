import React, {Component, Suspense} from "react";
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';
import 'react-day-picker/lib/style.css';
import moment from "moment";
import gCalendarService from "../../provider/gCalendarService";
import {ReactMultiEmail, isEmail} from 'react-multi-email';
import '../../assets/css/multiEmail.css';
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import "./style.css"

class Gcalendy extends Component {


    constructor(props) {
        super(props);
        this.state = {
            openAlert: false,
            alertMessage: '',
            alertType: '',

            selectedDate: "",
            typeDate: "",
            times: this.props.times,
            events: [],
            modifiers: {
                disponible: {daysOfWeek: [1, 2, 3, 4, 5]},
                disabled: {before: moment().toDate()}
            },
            isDateTimeConfirmed: false,
            emails: []
        };
    }

    componentDidMount() {
        gCalendarService.getEvents({mail: this.props.gCalendarMail}).then(res => {
            this.setState({events: res.data.events || []})
        }).catch(err => console.log(err))
    }


    updateShow = (key) => event => {
        let times = this.state.times;
        times.map((item, k) => {
            if (item.showConfirm === true) item.showConfirm = false;
        });
        times[key].showConfirm = true;
        this.setState({times: times})
    }

    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg,
            alertType: type
        });
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({openAlert: false});
    };


    render() {
        return (
            <div>
                <div className="call-wrapper mt-3">
                    <div className="call-container">

                        <div style={{width: "25%", position: "relative", borderRight: "1px solid #ddd"}}>
                            {
                                this.state.isDateTimeConfirmed === true &&
                                <button className="btn-return"
                                        onClick={() => this.setState({isDateTimeConfirmed: false})}>
                                    <span><i className="mdi mdi-arrow-left"
                                             style={{color: "rgb(0, 162, 255)", fontSize: 24}}/></span>
                                </button>
                            }

                            <div align="center">
                                <img src={this.props.logo} alt=""
                                     style={{width: 200, height: 150, objectFit: "contain"}}/><br/>
                                <img src={this.props.avatar} alt="" className="rounded-circle avatar-lg img-thumbnail"/>
                            </div>
                            <div style={{marginLeft: 20}}>
                                <h4 style={{fontSize: 26, fontWeight: 600, color: "#4d5055"}}>{this.props.title}</h4>
                                <span><i className="mdi mdi-clock"/> {this.props.duree}</span>
                            </div>
                        </div>
                        <div style={{width: "50%", flex: "1 1 50%"}}>
                            <div style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%"
                            }}>
                                {
                                    this.state.isDateTimeConfirmed === false ?
                                        <div style={{display: "flex", flex: "1 1 300px"}}>
                                            <div style={{width: "55%"}}>
                                                <h4 style={{fontSize:20}} className="mt-3 ml-3">Sélectionnez la date et l'heure</h4>
                                                <DayPicker localeUtils={MomentLocaleUtils} locale={"fr"}
                                                           disabledDays={[{daysOfWeek: [0, 6]}, {
                                                               before: new Date(),
                                                           },]}
                                                           month={new Date()} modifiers={this.state.modifiers}
                                                           selectedDays={this.state.selectedDate}
                                                           onDayClick={(day, modifiers, e) => {
                                                               console.log(modifiers)
                                                               let events = this.state.events || [];
                                                               let times = this.props.times;
                                                               times.map((item, key) => {
                                                                   let newDate = moment(day, 'ddd MMM D YYYY HH:mm:ss ZZ').set(
                                                                       {
                                                                           h: parseInt(item.text),
                                                                           m: parseInt(item.text.slice(-2))
                                                                       });
                                                                   let datePlusHeure = newDate.toDate();
                                                                   let show = true;
                                                                   events.map((evt, k) => {
                                                                       if (datePlusHeure >= moment(evt.start.dateTime).toDate() && datePlusHeure <= moment(evt.end.dateTime).toDate()) {
                                                                           show = false;
                                                                       }
                                                                   })
                                                                   item.show = show !== false;
                                                                   item.showConfirm = false;
                                                               });
                                                               this.setState({
                                                                   times: times,
                                                                   selectedDate: day,
                                                                   typeDate: modifiers
                                                               })
                                                           }
                                                           }
                                                />
                                            </div>
                                            <div style={{
                                                width: "40%",
                                                display: "flex",
                                                flexDirection: "column",
                                                height: "100%"
                                            }}>
                                                <div style={{flex: "1 1 100px", overflow: "auto"}}>
                                                    {
                                                        this.state.selectedDate === "" || (this.state.typeDate.disponible && this.state.typeDate.disponible === false) ||
                                                        (this.state.typeDate.disabled && this.state.typeDate.disabled === true) ?
                                                            <div/> :
                                                            <div style={{marginRight: "10%", marginLeft: "5%"}}>
                                                                <div style={{
                                                                    fontSize: 16,
                                                                    marginTop: 20,
                                                                    marginBottom: 10
                                                                }}>{moment(this.state.selectedDate).format("dddd, DD MMMM")}</div>
                                                                {
                                                                    this.props.times.map((item, key) =>
                                                                        item.show === true ?
                                                                            item.showConfirm === false ?
                                                                                <button
                                                                                    onClick={this.updateShow(key)}
                                                                                    key={key}
                                                                                    className="btn-call mb-2">{item.text}</button> :
                                                                                <div key={key}
                                                                                     style={{whiteSpace: "nowrap"}}
                                                                                     className="mb-2">
                                                                                    <button
                                                                                        className="btn-disabled">{item.text}</button>
                                                                                    <button
                                                                                        onClick={() => this.setState({
                                                                                            isDateTimeConfirmed: true,
                                                                                            selectedHeure: item.text,
                                                                                            selectedHPlus30: this.state.times[key + 1].text
                                                                                        })}
                                                                                        className="btn-confirm">
                                                                                        Confirmer
                                                                                    </button>
                                                                                </div> : null
                                                                    )
                                                                }

                                                            </div>
                                                    }
                                                </div>

                                            </div>


                                        </div> :

                                        <div style={{display: "flex", flex: "1 1 300px"}}>
                                            <div className="mt-4 ml-3 font-18 font-weight-bold">
                                                <label className="mt-2 mb-2">La prise de la date et l'heure de rendez-vous est bien validée : </label><br/>
                                            <span  style={{color: "#06c29c"}}><i className="mdi mdi-calendar-check"
                                                                                style={{color: "#06c29c"}}/>&nbsp;
                                                {this.state.selectedHeure} - {this.state.selectedHPlus30}, {moment(this.state.selectedDate).format("dddd, DD MMMM YYYY")}
                                            </span><br/><br/>

                                                <label>Ajouter des invitées</label>
                                                <ReactMultiEmail
                                                    placeholder="Cliquer sur 'Entrée' pour valider une adresse mail "
                                                    emails={this.state.emails}
                                                    onChange={(_emails) => {
                                                        this.setState({emails: _emails});
                                                    }}
                                                    validateEmail={email => {
                                                        return isEmail(email); // return boolean
                                                    }}
                                                    getLabel={(
                                                        email,
                                                        index,
                                                        removeEmail = (index) => {
                                                        },
                                                    ) => {
                                                        return (
                                                            <div data-tag key={index}>
                                                                {email}
                                                                <span data-tag-handle
                                                                      onClick={() => removeEmail(index)}>
                                                               ×
                                                            </span>
                                                            </div>
                                                        );
                                                    }}
                                                />
                                                <button onClick={() => {
                                                    this.openSnackbar("success","Une invitation à été envoyé au invitées avec succès ");
                                                    //this.setState({isDateTimeConfirmed:false})
                                                }} className="mt-5 btn-confirm-evt font-weight-bold font-16">
                                                    Confirmer
                                                </button>
                                            </div>

                                        </div>
                                }

                            </div>

                        </div>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.openAlert}
                    //autoHideDuration={5000}
                    onClose={this.closeSnackbar}
                >
                    <MySnackbarContentWrapper
                        onClose={this.closeSnackbar}
                        variant={this.state.alertType}
                        message={this.state.alertMessage}
                    />
                </Snackbar>
            </div>
        )
    }


}

export default Gcalendy;