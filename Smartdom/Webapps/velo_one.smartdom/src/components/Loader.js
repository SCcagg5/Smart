import React, { Component } from 'react';

/**
 * Renders the preloader
 */
class PreLoaderWidget extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="preloader">
                <div className="status">
                    <div className="spinner-border avatar-sm text-primary m-2" role="status"></div>
                    <text>{this.props.percentage}</text>

                </div>
            </div>
        )
    }
}

export default PreLoaderWidget;
