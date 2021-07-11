import React, { Component } from 'react';

/**
 * Renders the preloader
 */
class PreLoaderWidget extends Component {


    render() {
        return (
            <div className="preloader">
                <div className="status">
                    <div className="spinner-border avatar-sm text-primary m-2" role="status"/>
                    <text>{this.props.percentage}</text>

                </div>
            </div>
        )
    }
}

export default PreLoaderWidget;
