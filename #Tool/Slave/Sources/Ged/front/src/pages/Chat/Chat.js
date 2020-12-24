import React from "react";
import "./index.css"
import rethink from "../../controller/rethink";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Lightbox} from "react-modal-image";
import Popover from '@material-ui/core/Popover';
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart'
import * as ReactDOM from 'react-dom';


const db_name = process.env.REACT_APP_RETHINKDB_BEGIN_NAME;

export default class Chat extends React.Component {

    imageUpload = {}
    scrollParentRef={}
    messageList ={}
    state = {
        tableList:[],
        text: "",
        messages: [],
        loading: true,
        showImageModal: false,
        imageModal: "",
        anchorEl: null,
        limit: 10,
        skipCount: 0,
        loadingScroll: false
    }

    async verifIsTableExist(table){
        let tableList = this.state.tableList || [];
        if(tableList.includes(table) === true){
            console.log("TABLE EXIST")
            return true;
        }else{
            console.log("CREATE TABLE")
            tableList.push(table);
            this.setState({tableList:tableList})
            return await rethink.createTable(db_name, table, "test");
        }
    }

    componentDidMount() {
        rethink.getTableDataByLabel(db_name, "test", "chat", "room_id", this.props.room_id, "created_at", this.state.limit, this.state.skipCount).then(res => {
            console.log(res.length)
            if (res.length < 10) {
                this.setState({hasMore: false, loading: false, messages: res})
            } else {
                this.setState({
                    loading: false,
                    messages: res,
                    hasMore: true
                })
            }
            setTimeout(()=> {
                this.scrollToBottom();
            },250)
            this.verifIsTableExist("chat").then( v => {
                this.getChatChanges("test", db_name, 'table("chat")');
            }).catch(err => {console.log(err)})

        }).catch(err => {
            console.log(err)
        })
    }


    getChatChanges(ust_token, db, table) {

        let socket = new WebSocket("wss://api.smartdom.ch/ws/" + ust_token);

        socket.onopen = (e) => {
            console.log("Connection established");
            let payload;
            payload = {"cmd": table, "db": db, "read_change": true}
            socket.send(JSON.stringify(payload));
        };


        socket.onmessage = (event) => {

            let data = this.state.messages || [];
            let recieve = JSON.parse(event.data);
            //update
            if (recieve.new_val && recieve.old_val) {
                let index_to_updated = data.findIndex(x => x.id === recieve.old_val.id)
                data[index_to_updated] = recieve.new_val;
                this.setState({messages: data})
            }
            //insert
            else if (recieve.new_val) {
                data.push(recieve.new_val)
                this.setState({messages: data})
                setTimeout(() => {this.scrollToBottom()},250)
            }
            //remove
            else if (recieve.old_val) {
                data.splice(data.findIndex(x => x.id === recieve.old_val.id), 1);
                this.setState({messages: data})
            }
        }
        socket.error = function (event) {
            console.log("ERROR READ TABLE CHANGES");
        };
        socket.onclose = (event => {
            this.props.history.push('/login');
            console.log("CLOSED READ CHANGES");
        })
    }

    getUserFname(contacts, email) {
        let find = contacts.find(x => x.email === email);
        if (find) {
            return (find.nom || "") + " " + (find.prenom || "")
        } else {
            return email
        }
    }

    addNewMessage(text) {
        if (text.trim() !== "") {
            let newItem = {
                text: text,
                created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                room_id: this.props.room_id,
                sender: {
                    email: localStorage.getItem("email")
                },
                type: "text"
            }
            this.verifIsTableExist("chat").then( v => {
                rethink.insert("test", 'table("chat").insert(' + JSON.stringify(newItem) + ')', db_name, false).then(resAdd => {
                    if (resAdd && resAdd === true) {
                        this.setState({text: ""})
                        //this.scrollToBottom()
                    } else {
                        console.log("Erreur add msg chat !")
                    }
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {console.log(err)})

        }
    }

    uploadImage = (image) => {

        let imgToUpload = image.target.files[0];

        if (imgToUpload.type === "image/png" || imgToUpload.type === "image/jpeg" || imgToUpload.type === "image/jpg") {
            var reader = new FileReader();
            reader.onloadend = () => {

                let newItem = {
                    text: reader.result,
                    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    room_id: this.props.room_id,
                    sender: {
                        email: localStorage.getItem("email")
                    },
                    type: "image"
                }
                this.verifIsTableExist("chat").then( v => {
                    rethink.insert("test", 'table("chat").insert(' + JSON.stringify(newItem) + ')', db_name, false).then(resAdd => {
                        if (resAdd && resAdd === true) {

                        } else {
                            console.log("Erreur add msg chat !")
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(err => {console.log(err)})


            };
            reader.readAsDataURL(imgToUpload);
        } else {
            this.props.openSnackbar("error", "Type de fichier erroné ! ")
        }
    };

    fetchMoreData = () => {
        this.setState({loadingScroll:true})
        let skipcount = this.state.skipCount + 10;
        let limit = this.state.limit + 10;
        rethink.getTableDataByLabel(db_name, "test", "chat", "room_id", this.props.room_id, "created_at", limit, skipcount).then(res => {
            console.log(res.length)
            if (res.length < 10) {
                this.setState({
                    skipCount: skipcount,limit:limit,
                    loading: false,
                    messages: this.state.messages.concat(res),
                    hasMore: false,loadingScroll:false
                })
            } else {
                this.setState({
                    skipCount: skipcount,limit:limit,
                    loading: false,
                    messages: this.state.messages.concat(res),
                    hasMore: true,loadingScroll:false
                })
            }
            setTimeout(() => {
                this.scrollPlus(20)
            },250)

        }).catch(err => {
            console.log(err)
        })
    };

    scrollPlus = (x) => {
        ReactDOM.findDOMNode(this.messageList).scrollTop = x;
    }


    scrollToBottom = () => {
        if(this.messageList){
            const scrollHeight = this.messageList.scrollHeight;
            const height = this.messageList.clientHeight;
            const maxScrollTop = scrollHeight - height;
            ReactDOM.findDOMNode(this.messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    }

    render() {

        const msgs = this.state.messages.sort((a, b) => {
            var c = new Date(a.created_at);
            var d = new Date(b.created_at);
            return c - d;
        })

        const open = Boolean(this.state.anchorEl);
        const id = open ? 'emoji-popover' : undefined;

        return (
            <div>
                {
                    this.state.loading === true ?
                        <div align="center" style={{marginTop: 200}}>
                            <CircularProgress size={20} color="secondary"/>
                        </div> :
                        <div id="frame">
                            <div className="content">
                                <div className="contact-profile"/>
                                {
                                    this.state.loadingScroll === true &&
                                    <div align="center" style={{marginTop:5}}>
                                        <CircularProgress color="secondary" size={25} />
                                    </div>
                                }
                                <div className="messages" ref={(ref) => this.messageList = ref} onScroll={() => {
                                    const scrollTop = this.messageList.scrollTop;
                                    if (scrollTop === 0) {
                                        this.fetchMoreData()
                                    }
                                }} >
                                    <ul>
                                        {
                                            msgs.map((msg,key) => (
                                                msg.sender.email === localStorage.getItem("email") ?
                                                    <div key={key}>
                                                        <li  className="sent">
                                                            {
                                                                msg.type === "image" ?
                                                                    <div style={{backgroundColor:"#f5f5f5",padding:"5px 15px",borderRadius:20,display:"inline-block",marginBottom:15}}>
                                                                        <h6 style={{color:"#35cd96",fontSize:"0.6rem",marginTop:-1}}>{this.getUserFname(this.props.contacts,msg.sender.email)}</h6>
                                                                        <img alt="" src={msg.text}
                                                                             style={{width:"100%",height:"100%",objectFit:"contain",borderRadius:10,marginBottom:10,maxHeight:230,maxWidth:350,cursor:"pointer"}}
                                                                             onClick={() => {this.setState({showImageModal:true,imageModal:msg.text})}}
                                                                        />
                                                                        <h6 style={{color:"gray",marginBottom:-2,fontSize:"0.6rem"}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                    </div> :
                                                                    <p>
                                                                        <h6 style={{color:"#35cd96",fontSize:"0.6rem",marginTop:-1}}>{this.getUserFname(this.props.contacts,msg.sender.email)}</h6>
                                                                        {msg.text}
                                                                        <h6 style={{color:"gray",marginBottom:-2,fontSize:"0.6rem",float:"right",marginTop:20}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                    </p>
                                                            }
                                                        </li>
                                                    </div>
                                                    :
                                                    <div key={key}>
                                                        <li  className="replies">
                                                            {
                                                                msg.type === "image" ?
                                                                    <div style={{
                                                                        backgroundColor: "#f5f5f5",
                                                                        padding: "5px 15px",
                                                                        borderRadius: 20,
                                                                        display: "inline-block",
                                                                        float:"right",
                                                                        marginBottom:15
                                                                    }}>
                                                                        <h6 style={{color:"#35cd96",fontSize:"0.6rem",marginTop:-1}}>{this.getUserFname(this.props.contacts,msg.sender.email)}</h6>
                                                                        <img alt="" src={msg.text} style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            objectFit: "contain",
                                                                            borderRadius:10,marginBottom:10,
                                                                            maxHeight:230,maxWidth:350,cursor:"pointer"
                                                                        }}
                                                                             onClick={() => {this.setState({showImageModal:true,imageModal:msg.text})}}
                                                                        />
                                                                        <h6 style={{color: "gray", marginBottom: -2,fontSize:"0.6rem"}}>
                                                                            {moment(msg.created_at).fromNow(false)}</h6>
                                                                    </div> :
                                                                    <p>
                                                                        <h6 style={{color:"#35cd96",fontSize:"0.6rem",marginTop:-1}}>{this.getUserFname(this.props.contacts,msg.sender.email)}</h6>
                                                                        {msg.text}
                                                                        <h6 style={{color:"gray",marginTop:20,marginBottom:-2,float:"right",fontSize:"0.6rem"}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                    </p>
                                                            }


                                                        </li>
                                                    </div>

                                            ))
                                        }
                                    </ul>
                                </div>
                                <div>
                                    <i className="fa fa-smile attachment" aria-hidden="true"
                                       style={{
                                           position: "absolute",
                                           left: 15,
                                           bottom: 20,
                                           fontSize: 17,
                                           cursor: "pointer"
                                       }}
                                       onClick={(event) => {
                                           this.setState({anchorEl: event.currentTarget})
                                       }}
                                    />
                                    <i className="fa fa-image attachment" aria-hidden="true"
                                       style={{
                                           position: "absolute",
                                           left: 40,
                                           bottom: 20,
                                           fontSize: 17,
                                           cursor: "pointer"
                                       }}
                                       onClick={() => {
                                           this.imageUpload.click()
                                       }}
                                    />
                                </div>
                                <div className="message-input">
                                    <div className="wrap">
                                        <input type="text" placeholder="Tapez votre message ici..."
                                               value={this.state.text}
                                               onChange={(e => {
                                                   this.setState({text: e.target.value})
                                               })}
                                               onKeyPress={(event => {
                                                   if (event.key === 'Enter') {
                                                       this.addNewMessage(this.state.text)
                                                   }
                                               })}
                                        />
                                        <button className="submit"
                                                onClick={() => {
                                                    this.addNewMessage(this.state.text)
                                                }}
                                        >
                                            <i className="fa fa-paper-plane" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </div>
                                <input style={{visibility: 'hidden', width: 0, height: 0}}
                                       type='file' accept='.png,.jpeg,.jpg'
                                       onChange={(files) => this.uploadImage(files)}
                                       ref={(ref) => this.imageUpload = ref}
                                />
                            </div>
                        </div>
                }

                <Popover
                    id={id}
                    open={open}
                    anchorEl={this.state.anchorEl}
                    onClose={() => {
                        this.setState({anchorEl: null})
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Picker set='apple'
                            onSelect={(emoji) => {
                                this.setState({text: this.state.text + " " + emoji.native})
                            }}
                            i18n={{
                                search: 'Recherche',
                                categories: {search: 'Résultats de recherche', recent: 'Récents'}
                            }}
                    />
                </Popover>

                {
                    this.state.showImageModal === true &&
                    <Lightbox
                        medium={this.state.imageModal}
                        large={this.state.imageModal}
                        alt=""
                        onClose={() => {
                            this.setState({showImageModal: false, imageModal: ""})
                        }}
                    />
                }

            </div>
        )

    }


}