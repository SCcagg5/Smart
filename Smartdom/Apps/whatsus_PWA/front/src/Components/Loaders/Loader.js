import React, { Component } from 'react';

/**
 * Renders the preloader
 */
class PreLoaderWidget extends Component {

    render() {
        return (
            <div className="preloader">
                <div className="status">
                    <div className="spinner-border avatar-sm m-2" style={{color:"red"}} role="status"/>
                </div>
            </div>
        )
    }
}

export default PreLoaderWidget;