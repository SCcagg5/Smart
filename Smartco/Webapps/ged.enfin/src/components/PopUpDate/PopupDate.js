import React from "react";
import {DateContainer, StyledSelectDatepicker} from "../../customComponents/select-datepicker";

class PopupDate extends React.Component{

    constructor(props) {
        super(props);
        this.state={}
    }


    render() {
        return(
            <DateContainer>
                <StyledSelectDatepicker
                    showLabels={this.props.showLabels}
                    value={this.props.value}
                    onDateChange={this.props.onDateChange}
                    format={this.props.format}
                    invalidMessage={this.props.invalidMessage}
                />
            </DateContainer>
        )
    }


}

export default PopupDate;