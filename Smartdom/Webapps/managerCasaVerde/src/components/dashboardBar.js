import React, {Component} from 'react';

class DashboardBar extends Component {
    render() {
        return (
            <div>
                <ul className="ul">
                    <li  onClick={()=>this.props.history.replace("/dashboard/vue")}>
                        <text>VUE D'ENSEMBLE </text>
                    </li>
                    <li>
                        <text>MES ADRESSE </text>
                    </li>
                    <li>
                        <text>MES COMMANDES </text>
                    </li>
                    <li>
                        <text>MES COUPONS </text>
                    </li>
                    <li>
                        <text>REGLAGES </text>
                    </li>
                    <li onClick={()=>this.props.history.replace("/dashboard/BS")}>
                        <text>MY BS  </text>
                    </li>
                    <li>
                        <text>SE DECONNECTER </text>
                    </li>

                </ul>


            </div>
        );
    }
}

export default DashboardBar;
