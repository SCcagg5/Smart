import React, { Component } from 'react';

/**
 * Renders the Footer
 */
class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            2019 - 2020 &copy; SmartCo
                        </div>
                        <div className="col-md-6">
                            <div className="text-md-right footer-links d-none d-sm-block">
                                <a href="#">About Us</a>
                                <a href="#">Help</a>
                                <a href="#">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;