import React,{Component} from "react";

class logout extends Component{

    state={

    };

    componentWillMount() {
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        return(
            <div></div>
        )
    }


}

export default logout;