import React, {Component} from "react";
import "firebase/database"
import fabienImg from "../../../../../assets/images/avocats/fabian.png";
import alexImg from "../../../../../assets/images/avocats/alex.jpg";
import keplerImg from "../../../../../assets/images/avocats/aKapeller.jpg";
import SideMenu from "../../../../../components/SideMenu/SideMenu";
import logo from "../../../../../assets/images/logos/logoSmartCo.jpeg";
import data from "../../../../../data/data";
import SideBar from "../../../../../components/SideBar/SideBar";
import TopBar from "../../../../../components/TopBar/TopBar";


const operationsList = [
    {
        title:"Création d'actions simples",
        desc:'',
        name:'choixActionnaires',
        id:1
    },
    {
        title:"Création d'actions préférentielles",
        desc:'',
        name:'',
        id:2
    },
    {
        title:'Création de BSA',
        desc:'',
        name:'affectationBSA',
        id:3
    },
    {
        title:'Création de BSPCE',
        desc:'',
        name:'',
        id:4
    },
    {
        title:'Création de Bons obligatoires standards',
        desc:'Emission d’une obligation Bonds',
        name:'',
        id:5
    },
    {
        title:'Création de Green Bonds (ESG)',
        desc:'',
        name:'',
        id:6
    },
    {
        title:'Création de Real Estate Bonds',
        desc:'',
        name:'',
        id:7
    },

];

class emissionTitre extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedSieMenuItem: "soc",
            openSideMenu: false,
            showSecondSideBar: false,
            entreprise:""
        };
    }

    componentDidMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();
        } else {
            this.setState({entreprise: this.props.location.state.entreprise})
        }
    }


    render() {
        return (
            <div>
                <TopBar logo={logo} height={90} onClickMenuIcon={() => this.setState({openSideMenu: true})}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"}
                          history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu: false})}/>
                <SideBar items={data.sideBarItems} width={100} selectedItem={this.state.selectedSieMenuItem}
                         activeColor={"blue"} disabledColor={"#65728E"}
                         updateSelected={(item) => this.setState({selectedSieMenuItem: item})}
                         history={this.props.history}/>
                <div style={{paddingLeft:"10%",marginRight:50,marginTop:50}}>
                    <div className="row" style={{marginTop: 35}}>
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body ">
                                    <a style={{color:'hover: #21a5c2 !important',cursor:'pointer'}}
                                       onClick={()=>this.props.history.goBack()} className="float-right text-info">Retour</a>
                                    <h3 className=" mt-0 mb-3">Emission de titres</h3>
                                    <ul className="list-unsyled m-0 pl-0 transaction-history">
                                        {
                                            operationsList.map((item,key) => (
                                                <li className="align-items-center d-flex justify-content-between itemOp">
                                                    <div className="media">
                                                        <div className="media-body align-self-center">
                                                            <div className="transaction-data">
                                                                <h4 style={{color:"#000",lineHeight:"1.8rem"}} className="m-0">{item.title} </h4>
                                                                <p className="text-muted mb-0">{item.desc} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="transaction-icon">
                                                        <i className="mdi mdi-arrow-right-thick" style={{cursor:'pointer'}}
                                                           onClick={
                                                               item.id === 1 && this.state.entreprise.paysOrigine !== "Suisse" ? () => this.props.history.push("/gestion/entreprises/operations/emissionTitres/1",{entreprise:this.state.entreprise}) :
                                                                   item.id === 5  && this.state.entreprise.paysOrigine === "Suisse" ?
                                                                       () => this.props.history.push("/gestion/entreprises/operations/emissionTitres/5",
                                                                           {entreprise:this.state.entreprise}) :
                                                                       item.id ===  3 && this.state.entreprise.paysOrigine === "tunisie" ?
                                                                           () => this.props.history.push("/gestion/entreprises/operations/emissionTitres/3",{entreprise:this.state.entreprise}) :
                                                                           item.id === 3 && this.state.entreprise.paysOrigine === "Suisse" ?
                                                                               () => this.props.history.push("/gestion/entreprises/operations/emissionTitres/stockOption",{entreprise:this.state.entreprise}) :
                                                                               item.id === 6 ? () => this.props.history.push("/gestion/entreprises/operations/emissionTitres/CreationGreenBonds", {entreprise: this.state.entreprise}) : () => {}
                                                           }

                                                        />
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-3">
                            <li className="task-info" id="task7" onClick={()=>{
                                this.props.history.push("/avocats")
                            }}
                                style={{
                                    border: "1px solid #dee2e6",
                                    padding: 20,
                                    marginBottom: 15,
                                    borderRadius: 3,
                                    cursor: "pointer"
                                }}>
                                <span className="badge bg-soft-danger text-danger float-right"> -> </span>
                                <h5 className="mt-0">
                                    <a href="" className="text-dark">Vous avez des questions ?</a>
                                </h5>
                                <p>Vous pouvez prendre rendez-vous avec l'un de nos avocats </p>
                                <div className="clearfix"></div>
                                <div className="row">
                                    <div className="col">
                                        <p className="font-13 mt-2 mb-0">
                                                    <span
                                                        className="badge bg-soft-success text-success">Disponnible</span>
                                        </p>
                                    </div>
                                    <div className="col-auto">
                                        <div className="text-right">
                                            <a href="" className="text-muted">
                                                <img src={fabienImg}
                                                     alt="task-user"
                                                     className="avatar-sm img-thumbnail rounded-circle"/>
                                            </a>
                                            <a href="" className="text-muted">
                                                <img src={alexImg}
                                                     alt="task-user"
                                                     className="avatar-sm img-thumbnail rounded-circle"/>
                                            </a>
                                            <a href="" className="text-muted">
                                                <img src={keplerImg}
                                                     alt="task-user"
                                                     className="avatar-sm img-thumbnail rounded-circle"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default emissionTitre;