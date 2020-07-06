import React,{Component} from "react";


class redirect extends Component{


    componentWillMount() {

        if(localStorage.getItem('uid') === undefined || localStorage.getItem('uid') === null ){
            this.props.history.push('/login')
        }else{
            if(localStorage.getItem("role") === "avocat"){
                this.props.history.push('/avocat/infos')
            }else{
                this.props.history.push('/gestion/entreprises')
            }

        }
    }

    render() {
        return(
            <div/>
        )
    }


}

export default redirect;