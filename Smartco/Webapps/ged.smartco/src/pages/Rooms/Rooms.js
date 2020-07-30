import React from "react";
import ReactLoading from "react-loading";
import TopBar from "../../components/TopBar/TopBar";
import logo from "../../assets/images/logos/logo-OA-dark.png";
import SideMenu from "../../components/SideMenu/SideMenu";
import data from "../../data/Data";
import SideBar from "../../components/SideBar/SideBar";


export default class Rooms extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            selectedSieMenuItem:"rooms",
            openSideMenu:false,
            showSecondSideBar:false,
            loading: true,
        }
    }


    componentDidMount() {

        if (localStorage.getItem('email') === undefined || localStorage.getItem('email') === null) {
            this.props.history.push('/login')
        } else {
            this.setState({loading: true});
        }

    }



    render() {



        return (
            <div>
                <TopBar logo={logo} height={90} onClickMenuIcon={() => this.setState({openSideMenu:true})}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"} history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu:false})} />
                <SideBar items={data.sideBarItems} width={100} selectedItem={this.state.selectedSieMenuItem} activeColor={"blue"} disabledColor={"#65728E"}
                         updateSelected={(item) => this.setState({selectedSieMenuItem:item})} history={this.props.history} />
                {
                    this.state.loading === true ?
                        <div className="centered-text">
                            <ReactLoading type={"bars"} color={"red"}/>
                        </div> :

                        <div style={{paddingLeft:100,marginRight:50}}>


                            <div>
                                <div style={{display:"flex"}}>

                                    <div style={{flexWrap:"wrap",flex:"1 1 auto"}}>
                                        <div className="card">
                                            <div className="card-body" style={{minHeight: 750}}>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }

}