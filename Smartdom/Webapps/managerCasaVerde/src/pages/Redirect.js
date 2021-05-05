import React, {Component} from 'react';

class Redirect extends Component {
    constructor(props){
        super(props)

    }

    componentDidMount() {
        let user =localStorage.getItem('user')

        if (user != undefined && user != null){
            this.props.history.push('/accueil')

        }else {
            //this.props.history.push('/login')
            this.props.history.push('/accueil')

        }
    }

    render() {
        return (
            <div>


            </div>
        );
    }
}

export default Redirect;
