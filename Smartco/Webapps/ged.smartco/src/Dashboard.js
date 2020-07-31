import React,{Component} from "react";
import logo from "./assets/images/logos/logoSmartCo.jpeg"
import TopBar from "./components/TopBar/TopBar";
import SideBar from "./components/SideBar/SideBar";
import SideMenu from "./components/SideMenu/SideMenu";
import CoffreFortNewVersion from "./pages/coffreFort/CoffreFortNewVersion";
import data from "./data/Data";


export default class Dashboard extends Component{

    state={
        selectedSieMenuItem:"dash",
        openSideMenu:false,
        showSecondSideBar:false
    };

    render() {
        return(
            <div>

                <TopBar logo={logo} height={90} onClickMenuIcon={() => this.setState({openSideMenu:true})}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"} history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu:false})} />
                <SideBar items={data.sideBarItems} width={100} selectedItem={this.state.selectedSieMenuItem} activeColor={"blue"} disabledColor={"#65728E"}
                         updateSelected={(item) => this.setState({selectedSieMenuItem:item})}  history={this.props.history} />



                <div style={{paddingLeft:100,marginRight:50}}>
                    <CoffreFortNewVersion/>
                </div>

            </div>
        )
    }
}