import React,{Component,Suspense} from "react";
import {Container} from "reactstrap";
import Gcalendy from "./components/Gcalendy/Gcalendy";
import logo from './assets/images/logos/logoSmartCo.jpeg';
import fabienImg from "./assets/images/avocats/fabian.png"

class Test extends Component{

    state={
        selectedDate: "",
        typeDate: "",
        times: [
            {text: "08:00", showConfirm: false, show: true},
            {text: "08:30", showConfirm: false, show: true},
            {text: "09:00", showConfirm: false, show: true},
            {text: "09:30", showConfirm: false, show: true},
            {text: "10:00", showConfirm: false, show: true},
            {text: "10:30", showConfirm: false, show: true},
            {text: "11:00", showConfirm: false, show: true},
            {text: "11:30", showConfirm: false, show: true},
            {text: "12:00", showConfirm: false, show: true},
            {text: "12:30", showConfirm: false, show: true},
            {text: "13:00", showConfirm: false, show: true},
            {text: "13:30", showConfirm: false, show: true},
            {text: "14:00", showConfirm: false, show: true},
            {text: "14:30", showConfirm: false, show: true},
            {text: "15:00", showConfirm: false, show: true},
            {text: "15:30", showConfirm: false, show: true},
            {text: "16:00", showConfirm: false, show: true},
            {text: "16:30", showConfirm: false, show: true},
            {text: "17:00", showConfirm: false, show: true},
        ],
        events: []
    }

    render() {
        return(
            <div className="wrapper">
                <Container fluid>
                    <Suspense>
                        <div>
                            <Gcalendy times={this.state.times} title={"Réunion de 30mn"} duree={"30mn"}
                                      logo={logo} avatar={fabienImg} gCalendarMail={"fabiensmartco@gmail.com"}
                            />
                        </div>
                    </Suspense>
                </Container>
            </div>

        )
    }


}

export default Test;