import React,{Component} from "react";


export default class RedirectCp extends Component{


    componentDidMount() {

        if(localStorage.getItem('email') === undefined || localStorage.getItem('email') === null ){
            this.props.history.push('/login')
        }else{
            this.props.history.push('/home/drive')
        }
    }

    render() {
        return(
            <div/>
        )
    }


}