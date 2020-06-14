import React from "react";
import {Calendar, Views, momentLocalizer} from 'react-big-calendar';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import moment from 'moment';
import 'moment/locale/fr';
import "./react-big-calendar.css";
import Paper from '@material-ui/core/Paper';
import styles from "./calendar-jss"
import calendarservice from "../../provider/calendarService"
import Modal from "react-responsive-modal";


moment.locale('fr');

function Event(event) {
    return (
        <span className="eventBlock">{event.title}</span>
    );
}

const localizer = momentLocalizer(moment);
const messages = {
    allDay: 'journée',
    previous: 'précédent',
    next: 'suivant',
    today: 'aujourd\'hui',
    month: 'mois',
    week: 'semaine',
    day: 'jour',
    agenda: 'Agenda',
    date: 'date',
    time: 'heure',
    event: 'événement', // Or anything you want
    showMore: total => `+ ${total} événement(s) supplémentaire(s)`
};

class calendar extends React.Component {

    eventStyleGetter = event => {
        const backgroundColor = '#' + event.hexColor;
        const style = {
            backgroundColor,
        };
        return {
            style
        };
    };

    state = {
        loading:false,
        avocat:this.props.avocat,
        events:[],
        showModalAddEvent:false,
        eventTitle:'',
        eventStartFormat:'',
        eventEndFormat:'',
        eventStart:'',
        eventEnd:'',

    };

    componentWillMount() {

        calendarservice.getDispo({mail: this.props.avocat.email}).then(res => {
            console.log(res)
            if(res){
                if (res.data !== null) {
                    let events = res.data.events;
                    let data = [];
                    for (let i = 0; i < events.length; i++) {

                        let item = {
                            id: events[i].id,
                            title: events[i].summary,
                            start: new Date(events[i].start.dateTime),
                            end: new Date(events[i].end.dateTime),
                            desc:"******************",
                            hexColor: '2196F3'
                        };

                        data.push(item);
                    }
                    this.setState({
                        events: data
                    });
                } else {
                    this.setState({
                        error: "L'adresse mail de cette avocat n'est pas encore associé au service SmartCo"
                    })
                }
            }


        }, err => {
            console.log(err);
        })
    }

    handleAddEvent = ({start, end}) => {
        this.setState({
            showModalAddEvent:true,
            eventStart:start,
            eventEnd:end,
            eventStartFormat:moment(start).format("dddd DD MMM YYYY HH:mm"),
            eventEndFormat:moment(end).format("dddd DD MMM YYYY HH:mm"),
        })

    };

    closeAddEventModal = () => {
        this.setState({
            showModalAddEvent: false,
        })
    };

    findWithAttr(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    addCalendarEvent = () => {

        this.setState({
            loading:true
        });
        calendarservice.reserveDate({
            title:this.state.eventTitle,
            start: this.state.eventStart ,
            end: this.state.eventEnd,
            desc:'',
            mail:this.state.avocat.email,
            location:''
        }).then(res => {

            this.componentWillMount();
            this.setState({
                eventTitle:'',
                loading:false,
                showModalAddEvent:false
            })

        },err => {
            console.log(err);
            this.setState({
                loading:false,
                showModalAddEvent:false
            })
        });

    };

    onSelectEvent(pEvent) {
        //console.log(pEvent);
        /*const r = window.confirm("Voulez vous vraiment supprimer cette période ?");
        if (r === true) {
            this.state.events.splice(this.findWithAttr(this.state.events, 'id', pEvent.id), 1);
        }*/
    }


    render() {
        const {classes} = this.props;
        return (
            <div className="container-fluid">

                {/*<div className="modal-container modal-active">
                    <div className="modal-content">
                        <div className="boxed boxed--lg">
                            <h3>
                                Ajouter une nouvelle période de disponibilité
                            </h3>

                            <div className="row" style={{marginTop: 20}}>

                                <p style={{marginBottom: 10}}>De</p>
                                <input type="text" id="inputText" name="inputText"
                                       value={this.state.eventStartFormat}
                                       readOnly={true}
                                />
                            </div>
                            <div className="row" style={{marginTop: 20}}>

                                <p style={{marginBottom: 10,textTransform:'uppercase'}}>à</p>
                                <input type="text" id="inputText" name="inputText"
                                       value={this.state.eventEndFormat}
                                       readOnly={true}
                                />
                            </div>
                            <div className="row" style={{marginTop: 20}}>

                                <p style={{marginBottom: 10}}>Titre</p>
                                <textarea type="text" id="inputText" name="inputText"
                                          value={this.state.eventTitle}
                                          onChange={(event) => this.setState({eventTitle:event.target.value})
                                          }/>
                            </div>

                            <hr/>
                            <div className="text-right">
                                <button className="modal-close btn"
                                        onClick={
                                            this.addCalendarEvent
                                        }>
                                    {
                                        this.state.btnSaveEventSpinner ?
                                            <div className="subscription-loader"></div> :
                                            <span className="btn__text">Valider</span>
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="modal-close modal-close-cross" onClick={this.closeAddEventModal}></div>
                    </div>
                </div>*/}

                <Modal open={this.state.showModalAddEvent} onClose={()=> this.setState({showModalAddEvent:false})} closeIconSize={18} center>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myCenterModalLabel">
                                Ajouter une nouvelle période de disponibilité
                            </h4>
                        </div>
                        <div className="modal-body">

                            <div className="row" style={{marginTop: 20}}>

                                <p style={{marginBottom: 10}}>De</p>
                                <input className="form-control" type="text" id="inputText" name="inputText"
                                       value={this.state.eventStartFormat}
                                       readOnly={true}
                                />
                            </div>
                            <div className="row" style={{marginTop: 20}}>

                                <p style={{marginBottom: 10,textTransform:'uppercase'}}>à</p>
                                <input className="form-control" type="text" id="inputText" name="inputText"
                                       value={this.state.eventEndFormat}
                                       readOnly={true}
                                />
                            </div>
                            <div className="row" style={{marginTop: 20}}>

                                <p style={{marginBottom: 10}}>Titre</p>
                                <textarea className="form-control" type="text" id="inputText" name="inputText"
                                          value={this.state.eventTitle}
                                          onChange={(event) => this.setState({eventTitle:event.target.value})
                                          }/>
                            </div>

                            <div className="text-center" style={{marginTop:10}}>
                                <button type="button" onClick={this.addCalendarEvent}
                                        className="btn btn-success btn waves-effect mb-2 waves-light">
                                    {this.state.loading ?
                                        <div className="spinner-border avatar-xs text-white m-1"
                                             role="status"></div> : 'Valider'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Paper className={classes.root}>
                    {
                        this.state.events.length >= 0 &&
                        <Calendar
                            className={classes.calendarWrap}
                            selectable
                            events={this.state.events}
                            views={{day: true, week: true, month: true, agenda: true}}
                            step={60}
                            showMultiDayTimes
                            //scrollToTime={new Date(1970, 1, 1, 6)}
                            defaultDate={new Date()}
                            defaultView={Views.WEEK}
                            /*components={{
                                timeSlotWrapper: ColoredDateCellWrapper,
                            }}*/
                            components={{
                                event: Event
                            }}
                            localizer={localizer}
                            messages={messages}
                            /*onSelectEvent={event => this.onSelectEvent(event)}
                            onSelectSlot={this.handleAddEvent}*/
                            eventPropGetter={(this.eventStyleGetter)}
                            onSelectEvent={event => this.onSelectEvent(event)}
                            onSelectSlot={this.handleAddEvent}
                        />
                    }

                </Paper>

            </div>
        )
    }


}

calendar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(calendar);