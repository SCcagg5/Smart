import React,{Component} from "react";


class redirect extends Component{


    componentDidMount() {

        if(localStorage.getItem('uid') === undefined || localStorage.getItem('uid') === null ){
            this.props.history.push('/login')
        }else{
            this.props.history.push('/coffre-fort')
        }
    }

    render() {
        return(
            <div/>
        )
    }


}

export default redirect;