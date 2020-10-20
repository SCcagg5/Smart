import React from "react";
import DayPicker from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";
import 'moment/locale/fr';
import 'react-day-picker/lib/style.css';
import moment from "moment";
import './style.css'

export default  class CalendyDateHourPicker extends React.Component{

    state={
        selectedDate: "",
        typeDate: "",
        times: this.props.times,
        modifiers: {
            disponible: {daysOfWeek: [1, 2, 3, 4, 5]},
            disabled: {before: moment().toDate()}
        }
    }


    updateShow = (key) => event => {
        let times = this.state.times;
        times.map((item, k) => {
            if (item.showConfirm === true) item.showConfirm = false;
        });
        times[key].showConfirm = true;
        this.setState({times: times})
    }


    render() {

        return(

            <div className="call-container">
                        <div style={{flex: "1 1 50%"}}>
                            <div style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%"
                            }}>

                                <div style={{display: "flex", flex: "1 1 300px"}}>
                                    <div>
                                        <h4 style={{fontSize:20}} className="mt-3 ml-3">Sélectionnez la date et l'heure</h4>
                                        <DayPicker localeUtils={MomentLocaleUtils} locale={"fr"}
                                                   disabledDays={[{daysOfWeek: [0, 6]}, {
                                                       before: new Date(),
                                                   },]}
                                                   month={new Date()} modifiers={this.state.modifiers}
                                                   selectedDays={this.state.selectedDate || null}
                                                   onDayClick={(day, modifiers, e) => {
                                                       console.log(modifiers)
                                                       this.setState({
                                                           selectedDate: day,
                                                           typeDate: modifiers
                                                       })
                                                   }}
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
                                                            marginBottom: 10,
                                                            textTransform:"capitalize"
                                                        }}>{moment(this.state.selectedDate).format("dddd, DD MMMM")}</div>
                                                        {
                                                            this.props.times.map((item, key) =>
                                                                item.show === true ?
                                                                    item.showConfirm === false ?
                                                                        <button
                                                                            onClick={this.updateShow(key)}
                                                                            key={key}
                                                                            className="btn-call mb-2">{item.text}</button> :
                                                                        <div key={key} style={{whiteSpace: "nowrap"}} className="mb-2">
                                                                            <button className="btn-disabled">{item.text}</button><button
                                                                                onClick={() => {
                                                                                    let date = moment(this.state.selectedDate);
                                                                                    date.set({hour:parseInt((item.text).slice(0,2)),
                                                                                        minute:parseInt((item.text).substr((item.text).length - 2)),
                                                                                        second:0,millisecond:0})
                                                                                    console.log(date.format("DD-MM-YYYY HH:mm"))
                                                                                    this.props.setSelectedDateTime(date.format("DD-MM-YYYY HH:mm"))
                                                                                }}
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


                                </div>

                            </div>

                        </div>
                    </div>

        )

    }

}