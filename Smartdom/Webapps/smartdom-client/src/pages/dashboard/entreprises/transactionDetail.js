import React, {Component} from "react";
import Loader from "../../../components/Loader";
import {Card, CardBody, Col, Row} from "reactstrap";
import user3 from "../../../assets/users/user-3.jpg"
import user4 from "../../../assets/users/user-4.jpg"


class transactionDetail extends Component {

    state = {
        loading: false,
        showInformations: true,
        showDocs: false
    };

    render() {
        const {transaction, goBack} = this.props;
        const montantTotal = parseInt(transaction.droitSociauxCedes.nbActionCedes) * 10 + ( parseInt(transaction.droitSociauxCedes.nbActionCedes) * 0.1);
        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.state.loading && <Loader/>}

                    <div className="row" style={{marginTop: 20}}>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <i className="mdi mdi-arrow-left-circle" onClick={goBack('entrepriseDashboard')}
                               style={{color:"cornflowerblue",fontSize:28,cursor:"pointer"}}>
                                <h5 style={{cursor:'auto'}}>Transaction N°:&nbsp; {transaction.numero}</h5>
                            </i>

                        </div>
                    </div>

                    <Row style={{marginTop: 20}}>
                        <Col lg={6}>
                            <Card className={this.state.showInformations ? 'selectedItem' : ''} onClick={() => {
                                this.setState({
                                    showInformations: true,
                                    showDocs: false
                                })
                            }}>
                                <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                    <div className="text-center">Informations</div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Card className={this.state.showDocs ? 'selectedItem' : ''} onClick={() => {
                                this.setState({
                                    showInformations: false,
                                    showDocs: true
                                })
                            }}>
                                <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                    <div className="text-center">Documents liés</div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    {
                        this.state.showInformations &&
                        [
                            <Row>
                                <Col lg={12}>
                                    <Card>
                                        <CardBody style={{padding: '0.5rem'}}>

                                            <div className="row">
                                                <div className="col-md-6 ">
                                                    <h5>Entre:</h5>
                                                    <div className="widget-rounded-circle card-box background-gainboro">
                                                        <div className="row align-items-center">
                                                            <div className="col-auto">
                                                                <div className="avatar-lg">
                                                                    <img src={user3}
                                                                         className="img-fluid rounded-circle"
                                                                         alt="user-img"/>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <h5 className="mb-1 mt-2 font-16">{transaction.cedant.nomPrenom}</h5>
                                                                <p className="mb-2 text-muted">{transaction.cedant.adress ? transaction.cedant.adress : transaction.cedant.adress_siege}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 ">
                                                    <h5>Et:</h5>
                                                    <div className="widget-rounded-circle card-box background-gainboro">
                                                        <div className="row align-items-center">
                                                            <div className="col-auto">
                                                                <div className="avatar-lg">
                                                                    <img src={user4}
                                                                         className="img-fluid rounded-circle"
                                                                         alt="user-img"/>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <h5 className="mb-1 mt-2 font-16">{transaction.cessionnaire.nomPrenom}</h5>
                                                                <p className="mb-2 text-muted">{transaction.cessionnaire.adress ? transaction.cedant.adress : transaction.cessionnaire.adress_siege}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>,
                            <Row>
                                <Col lg={4}>
                                    <Card>
                                        <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                            <h5>Status</h5>
                                            <div className="text-center">
                                                <span className="badge bg-soft-success text-success p-1">Cession</span>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col lg={4}>
                                    <Card>
                                        <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                            <h5>Date d'éxecution</h5>
                                            <div className="text-center">
                                                <span className="badge bg-soft-info text-info p-1">{transaction.dateCreation}</span>
                                            </div>
                                        </CardBody>
                                    </Card>

                                </Col>

                                <Col lg={4}>
                                    <Card>
                                        <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                            <h5>Dernière mise à jour</h5>
                                            <div className="text-center">
                                                <span className="badge bg-soft-info text-info p-1">{transaction.dateCreation}</span>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>


                            </Row>,
                            <Row>
                                <Col lg={12}>
                                    <Card>
                                        <CardBody style={{padding: '0.9rem', cursor: 'pointer'}}>
                                            <h5>Type</h5>
                                            <div className="">
                                                <span className="badge bg-soft-success text-success p-1">EMISSION</span>
                                                &nbsp;de <span style={{fontWeight:'bold',color:"#000"}}>{transaction.droitSociauxCedes.nbActionCedes} </span>
                                                <span className="badge bg-soft-info text-info p-1">&nbsp;BSA</span>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>,
                            <Row>
                                <Col lg={4}>
                                    <Card>
                                        <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                            <h5>Prix nominal par action</h5>
                                            <div className="text-center">
                                                <span className="badge bg-soft-danger text-danger p-1">0.1 €</span>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col lg={4}>
                                    <Card>
                                        <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                            <h5>Prix d'émission par action</h5>
                                            <div className="text-center">
                                                <span className="badge bg-soft-danger text-danger p-1">10 €</span>
                                            </div>
                                        </CardBody>
                                    </Card>

                                </Col>

                                <Col lg={4}>
                                    <Card>
                                        <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                            <h5>Montant total</h5>
                                            <div className="text-center">
                                                <span className="badge bg-soft-danger text-danger p-1">{montantTotal.toFixed(2)} €</span>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>


                            </Row>,
                            <Row>
                                <Col lg={12}>
                                    <Card>
                                        <CardBody style={{padding: '0.9rem', cursor: 'pointer'}}>
                                            <h5>Preuve de transaction sur la Blockchain</h5>
                                            <div className="">
                                                <span style={{color:"blue",fontWeight:'bold'}}>Transaction: </span>
                                                <span className="badge bg-soft-dark text-dark p-1">
                                                    29a6bKHJbfjj145hgta2298mkdhbcmkjvbf54ds546s5dv46aa
                                                </span>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>,
                        ]

                    }
                    {
                        this.state.showDocs &&
                        <Row style={{marginTop: 15}}>
                            <Col lg={12}>
                                <Card>
                                    <CardBody style={{padding: '0.5rem'}}>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    }

                </div>
            </React.Fragment>
        )
    }


}

export default transactionDetail;