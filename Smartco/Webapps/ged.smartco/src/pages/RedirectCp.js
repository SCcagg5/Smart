import React,{Component} from "react";


export default class RedirectCp extends Component{


    componentDidMount() {

        if(localStorage.getItem('uid') === undefined || localStorage.getItem('uid') === null ){
            this.props.history.push('/login')
        }else{
            this.props.history.push('/drive/0')
        }
    }

    render() {
        return(
            <div/>
        )
    }


}