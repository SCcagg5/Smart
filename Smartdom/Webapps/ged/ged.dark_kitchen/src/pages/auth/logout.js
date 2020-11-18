import React,{Component} from "react";

class logout extends Component{

    state={

    };

    componentDidMount() {
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        return(
            <div/>
        )
    }


}

export default logout;