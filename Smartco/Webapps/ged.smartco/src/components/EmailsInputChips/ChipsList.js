import React, { Component, Fragment } from 'react';
import WarningIcon from "@material-ui/icons/Warning";
import {Chip} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import utilFunctions from "../../tools/functions";


class ChipsList extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.chips.length !== nextProps.chips.length;
    }

    render() {
        return (
            <Fragment>
                {this.props.chips.map(chip => (
                    <Chip key={chip.key}
                          avatar={<Avatar  style={{backgroundColor:chip.valid === true ? utilFunctions.getCharColor(chip.email.charAt(0)) : "#fff" ,
                              color:chip.valid === true ? "#fff":"red"}} >
                              {
                                  chip.valid === true ?
                                  chip.email.charAt(0).toUpperCase() :
                                  <WarningIcon/>
                              }
                          </Avatar>}
                        label={chip.email}
                        onDelete={e => this.props.onChipClick(e, chip)}
                        style={{fontWeight:"bold",backgroundColor:"#fff",border:"1px solid #c0c0c0",color:"gray",margin:5}}
                    />
                ))}
            </Fragment>
        );
    }
}

export default ChipsList;