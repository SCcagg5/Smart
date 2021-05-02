import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import SmartService from "../../provider/SmartService";
import rethink from "../../controller/rethink";
import "./room.css"
import TopBar from "../../Components/TopBar/TopBar";
import AltAvatarGroup from "@atlaskit/avatar-group";

const db_name = "4e92789a-aa10-11eb-bcbc-0242ac130002";

export default class Rooms extends React.Component{


    state={
        logo:localStorage.getItem("logo")
    }


    componentDidMount() {
        console.log("ROOMS")
        if(localStorage.getItem("token") === null || localStorage.getItem("token") === undefined ){
            this.props.history.push("/login")
        }else{
            SmartService.getGed(localStorage.getItem('token'), localStorage.getItem('usrtoken'))
                .then((gedRes) => {
                    if (gedRes.succes === true && gedRes.status === 200) {

                        this.setState({
                            folders:gedRes.data.Proprietary.Content.folders || [],
                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                        })

                    } else {
                        console.log(gedRes.error)
                    }
                }).catch(err => {console.log(err)})

            rethink.createDB(db_name,"Etiquettepers.js").then(r1 => {
                if (r1 === true) console.log("NEW DB CREATED");
                if (r1 === false) console.log("DB ALREADY EXIST");

                rethink.tableList(db_name,"Etiquettepers.js").then(tablesRes => {

                    if(tablesRes.includes("contacts") === false){
                        this.setState({contacts:[]})
                    }
                    if(tablesRes.includes("rooms") === false){
                        this.setState({ rooms:[]})
                    }
                    this.setState({tableList:tablesRes || []})

                    tablesRes.filter(x => x === "contacts" || x === "rooms" || x === "chat").map((item,key) => {
                        if(item !== "chat"){
                            rethink.getTableData(db_name,"Etiquettepers.js",item).then(rr => {

                                if(item === "contacts"){
                                    this.setState({[item]:rr.sort( (a,b) => {
                                            var c = a.sort || -1
                                            var d = b.sort || -1
                                            return c-d;
                                        })})
                                }
                                else if(item === "rooms"){
                                    let user_rooms = [];
                                    rr.map((room,key) => {
                                        if(room.members.find(x => x.email === localStorage.getItem("email"))){
                                            user_rooms.push(room)
                                        }
                                    })
                                    this.setState({[item]:user_rooms})
                                }
                                else{
                                    this.setState({[item]:rr})
                                }
                            });
                            this.getTableChanges('Etiquettepers.js',db_name,'table("'+item+'")',item);
                        }
                    });
                }).catch(err => {console.log(err)})

            }).catch(err => {console.log(err)})
        }

    }


    getTableChanges(ust_token,db,table,table_name){

        let socket = new WebSocket("wss://api.smartdom.ch/ws/" + ust_token);

        socket.onopen = (e) => {
            console.log("Connection established");
            let payload;
            payload = {"cmd": table, "db": db, "read_change": true}
            socket.send(JSON.stringify(payload));
        };


        socket.onmessage = (event) => {

            let data = this.state[table_name];
            let recieve = JSON.parse(event.data);
            //update
            if(recieve.new_val && recieve.old_val){
                let index_to_updated = data.findIndex(x => x.id === recieve.old_val.id)
                data[index_to_updated] = recieve.new_val;
                this.setState({[table_name]:data})
            }
            //insert
            else if(recieve.new_val){
                data.push(recieve.new_val)
                this.setState({[table_name]:data})
            }
            //remove
            else if(recieve.old_val){
                data.splice(data.findIndex(x => x.id === recieve.old_val.id),1);
                this.setState({[table_name]:data})
            }
        }
        socket.error = function(event) {
            console.log("ERROR INITIALISIATION TABLE");
        };
        socket.onclose = ( event => {
            this.getTableChanges(ust_token,db,table,table_name)
            console.log("CLOSED READ CHANGES");
        })
    }

    render() {

        return(

        !this.state.rooms ?
            <div style={{minHeight:"100vh"}}>
            <div align="center" style={{marginTop: 200}}>
                <CircularProgress color="primary"/>
                <h6>Chargement...</h6>
            </div>
            </div>
            :
            <div style={{marginTop:90,padding:20,minHeight:"100vh"}}>
                <h5>Rooms</h5>

                <div className="row mt-3 ml-1 mr-1" style={{maxWidth:1000}}>
                    {
                        (this.state.rooms || []).map((room,key) => (
                            <div className="col-lg-3 mb-2">
                                <div className="card-container" style={{backgroundColor:room.color}} onClick={() => {
                                    this.props.history.push('/home/chat',{room:room,miniDrive:this.state.folders || [],contacts:this.state.contacts || [] })
                                }}>
                                    <div style={{display:"flex",justifyContent:"space-between"}}>
                                        <h6 style={{color:"#fff",fontWeight:600}}>{room.title}</h6>
                                    </div>

                                    <div style={{marginTop:60,marginLeft:10}}>
                                        <div style={{display:"flex"}}>
                                            <i className="fa fa-users" style={{color:"#fff",fontSize:14}}>&nbsp;{room.members.length}</i>
                                            <i className="fa fa-tasks" style={{color:"#fff",fontSize:14,marginLeft:10}}>&nbsp;{(room.tasks || []).length}</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>



        )

    }
}
