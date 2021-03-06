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
import {Tree} from "antd";
import SmartService from "../../provider/SmartService";
import {IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Anchorme } from 'react-anchorme'
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GestureIcon from '@material-ui/icons/Gesture';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import SignModal from "../../components/SignModal/SignModal";
import AtlButton  from '@atlaskit/button';
import DuoIcon from '@material-ui/icons/Duo';
import ChildCareIcon from '@material-ui/icons/ChildCare';

const {DirectoryTree} = Tree;
const db_name = process.env.REACT_APP_RETHINKDB_BEGIN_NAME;


const speedDialActions= [
    { icon: <ImageOutlinedIcon color="primary" />, name: 'Images' },
    { icon: <FileCopyIcon color="primary" />, name: 'Documents' },
    { icon: <GestureIcon color="primary" />, name: 'Signer' },
    { icon: <ChildCareIcon color="primary" />, name: 'ChatBot' },
    { icon: <DuoIcon color="primary" />, name: 'Salon' },
]


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class Chat extends React.Component {

    imageUpload = {}
    scrollParentRef={}
    messageList = React.createRef()
    state = {
        tableList:[],
        text: "",
        messages: [],
        loading: true,
        showImageModal: false,
        imageModal: "",
        anchorElEmoji: null,
        anchorElFiles:null,
        anchorElToSignFile:null,
        limit: 10,
        skipCount: 0,
        loadingScroll: false,
        textareaHeight:45,

        miniDrive:this.props.miniDrive,
        autoExpandParent:true,
        expandedKeys:[],
        selectedKeys:[],

        showRecorderForm:false,
        openSpeedDial:false,
        openSignDocModal:false,
        toSignDoc:""
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

    addGedFile(file){
        let newItem = {
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            room_id: this.props.room_id,
            sender: {
                email: localStorage.getItem("email")
            },
            type: "ged_file",
            id_in_ged:file.id,
            name_in_ged:file.name
        }
        let room_members = (this.props.room.members || []).filter(x => x.email !== localStorage.getItem("email"));
        room_members.map((member,key) => {
            SmartService.share(file.id,
                {
                    to: member.email,
                    access: {administrate: false, share: false, edit:  false, read: true}
                }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(shareRes => {
                if (shareRes.succes === true && shareRes.status === 200) {
                    console.log("Share"+key +" OK")
                }else{
                    console.log(shareRes.error)
                }
            }).catch(err => {console.log(err)})
        })
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
    }

    addProductPack(pack){
        let newItem = {
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            room_id: this.props.room_id,
            sender: {
                email: localStorage.getItem("email")
            },
            type: "product_pack",
            pack_name:pack.name,
            pack_products:pack.products
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

    adjustTextArea(e) {
        //this.setState({textareaHeight: 25 + e.scrollHeight})
        e.target.style.height = (e.target.scrollHeight > e.target.clientHeight) ? (e.target.scrollHeight)+"px" : "45px";
    }

    onExpand = (expandedKeys) => {
        this.setState({expandedKeys:expandedKeys,autoExpandParent:false})
    }

    onSelect = (selectedKeys, info) => {
        this.setState({selectedKeys:selectedKeys})
    }

    onSelectToSignFile = (selectedKeys, info) => {
        this.setState({selectedKeys:selectedKeys,toSignDoc:info.node.typeF === "file" ? info.node : ""})
    }

    onDrop_container(e){
        e.preventDefault();e.stopPropagation();
        if(e.dataTransfer.getData("file")){
            let recievedItem = JSON.parse(e.dataTransfer.getData("file"));
            if(recievedItem.typeF === "file"){
                this.addGedFile(recievedItem)
            }else{
                this.props.openSnackbar("warning","Seuls les fichiers peuvent être glissés ici")
            }
        }else if(e.dataTransfer.getData("pack")){
            let recievedItem = JSON.parse(e.dataTransfer.getData("pack"));
            console.log(recievedItem)
            this.addProductPack(recievedItem)
        }
        e.dataTransfer.clearData();
    }

    returnTotal(products){
        let total = 0;
        products.map((product,key) => {
            total = total + parseFloat(product.prix);
        })
        return total;
    }

    onClickAction(event,action){
        console.log(action)
        this.setState({openSpeedDial:false})
        if(action.name === "Images"){
            this.imageUpload.click()
        }else if(action.name === "Documents"){
            this.setState({anchorElFiles: event.currentTarget})
        }else if(action.name === "Signer"){
            this.setState({anchorElToSignFile:event.currentTarget})
        }
    }

    render() {

        const msgs = this.state.messages.sort((a, b) => {
            var c = new Date(a.created_at);
            var d = new Date(b.created_at);
            return c - d;
        })

        const openEmojiPopup = Boolean(this.state.anchorElEmoji);
        const id1 = openEmojiPopup ? 'emoji-popover' : undefined;

        const openFilesPopup = Boolean(this.state.anchorElFiles);
        const id2 = openFilesPopup ? 'files-popover' : undefined;

        const openToSignFilePopup = Boolean(this.state.anchorElToSignFile);
        const id3 = openFilesPopup ? 'file-To-Sign-popover' : undefined;

        return (
            <div>
                {
                    this.state.loading === true ?
                        <div align="center" style={{marginTop: 200}}>
                            <CircularProgress size={20} color="secondary"/>
                        </div> :
                        <div id="frame"
                             onDragOver={(e) => {
                                 e.preventDefault();e.stopPropagation();
                             }}
                             onDragLeave={(e) => {
                                 e.preventDefault();e.stopPropagation();
                             }}
                             onDrop={(e) => {this.onDrop_container(e)}}
                        >
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
                                                        <li  className="replies">
                                                            {
                                                                msg.type === "image" ?
                                                                    <div style={{backgroundColor:"#dcf8c6",padding:"3px",borderRadius:7.5,
                                                                        display:"inline-block",marginBottom:15,float:"right",boxShadow: "0 1px 0.5px rgba(0,0,0,.13)"}}
                                                                    >
                                                                        <img alt="" src={msg.text}
                                                                             style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:10,marginBottom:10,maxHeight:300,maxWidth:450,cursor:"pointer"}}
                                                                             onClick={() => {this.setState({showImageModal:true,imageModal:msg.text})}}
                                                                        />
                                                                        <h6 style={{color:"gray",fontSize:"0.6rem",textAlign:"end",marginRight:5}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                    </div> :
                                                                    msg.type === "ged_file" ?
                                                                        <div style={{backgroundColor:"#dcf8c6",padding:"3px",borderRadius:7.5,
                                                                            display:"inline-block",marginBottom:15,float:"right",boxShadow: "0 1px 0.5px rgba(0,0,0,.13)"}}
                                                                        >
                                                                            <div style={{backgroundColor:"#cfe9ba"}}>
                                                                                <div style={{padding:"13px 19px",alignItems:"center",display:"flex"}}>
                                                                                    <div className="msg_file_icon"/>
                                                                                    <div className="msg_file_text"
                                                                                         onClick={() => this.props.openPdfModal(msg.id_in_ged)}
                                                                                    >
                                                                                        <span>{msg.name_in_ged}</span>
                                                                                    </div>
                                                                                    <div className="msg_file_download_icon">
                                                                                        <div style={{color:"rgba(51,51,51,.5"}}>
                                                                                            <span>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} viewBox="0 0 34 34">
                                                                                                    <path d="M17 2c8.3 0 15 6.7 15 15s-6.7 15-15 15S2 25.3 2 17 8.7 2 17 2m0-1C8.2 1 1 8.2 1 17s7.2 16 16 16 16-7.2 16-16S25.8 1 17 1z"
                                                                                                          fill="currentColor"
                                                                                                    />
                                                                                                    <path d="M22.4 17.5h-3.2v-6.8c0-.4-.3-.7-.7-.7h-3.2c-.4 0-.7.3-.7.7v6.8h-3.2c-.6 0-.8.4-.4.8l5 5.3c.5.7 1 .5 1.5 0l5-5.3c.7-.5.5-.8-.1-.8z"
                                                                                                          fill="currentColor"
                                                                                                    />
                                                                                                </svg>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <h6 style={{color:"gray",marginTop:4,marginBottom:2,float:"right",fontSize:"0.6rem"}}>{moment(msg.created_at).fromNow(false)}</h6>

                                                                        </div>
                                                                        :
                                                                        msg.type === "product_pack" ?
                                                                            <div style={{backgroundColor:"#dcf8c6",padding:"3px",borderRadius:7.5,
                                                                                display:"inline-block",marginBottom:15,float:"right",boxShadow: "0 1px 0.5px rgba(0,0,0,.13)"}}>
                                                                                <div style={{margin:5,border:"2px solid #f0f0f0",borderRadius:7.5,padding:8,backgroundColor:"#fff"}}>
                                                                                    <div style={{display:"flex"}}>
                                                                                        <h6 style={{marginTop:7}}>{msg.pack_name}</h6>
                                                                                    </div>
                                                                                    {
                                                                                        (msg.pack_products || []).map((product,key) => (
                                                                                            <div key={key} style={{marginTop:5,marginLeft:5,marginRight:5}}>
                                                                                                <div style={{border:"2px solid cornflowerblue",padding:2.5,borderRadius:7.5}}>
                                                                                                    <div style={{display:"flex"}}>
                                                                                                        <div style={{alignSelf:"center"}}>
                                                                                                            <img alt="" src={product.image} style={{width:60,height:60,borderRadius:"unset",objectFit:"unset"}}/>
                                                                                                        </div>
                                                                                                        <div style={{marginLeft:10}}>
                                                                                                            <h6>{product.nomProd}</h6>
                                                                                                            <p className="truncate-2" style={{marginBottom:"0.0rem",backgroundColor:"#fff"}}>{product.descriptionProd}</p>
                                                                                                            <div align="right">
                                                                                                                <span style={{fontWeight:"bold",fontSize:"x-small",marginRight:5}}>{product.prix +" €"}</span>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                    <div style={{marginTop:10}}>
                                                                                        <div align="right">
                                                                                            <span style={{fontWeight:"bold"}}>Total: <span>{this.returnTotal(msg.pack_products)} €</span></span>
                                                                                        </div>
                                                                                        <div align="center" style={{marginTop:15}}>
                                                                                            <button
                                                                                                onClick={(e) => {}}
                                                                                                className="btn btn-success waves-effect waves-light">
                                                                                                Payer
                                                                                            </button>
                                                                                        </div>
                                                                                        <h6 style={{color:"gray",marginTop:14,marginBottom:2,float:"right",fontSize:"0.6rem"}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            <p>
                                                                                <Anchorme  target="_blank" style={{color:"#039be5"}}>
                                                                                {msg.text}
                                                                                </Anchorme>
                                                                                <h6 style={{color:"gray",marginBottom:-2,fontSize:"0.6rem",float:"right",marginTop:20}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                            </p>


                                                            }
                                                        </li>
                                                    </div>
                                                    :
                                                    <div key={key}>
                                                        <li  className="sent">
                                                            {
                                                                msg.type === "image" ?
                                                                    <div style={{
                                                                        backgroundColor: "#f5f5f5",
                                                                        padding: "3px",
                                                                        borderRadius: 7.5,
                                                                        display: "inline-block",
                                                                        marginBottom:15
                                                                    }}>
                                                                        <h6 style={{color:"#35cd96",fontSize:"0.6rem",marginTop:-1,marginLeft:5}}>{this.getUserFname(this.props.contacts,msg.sender.email)}</h6>
                                                                        <img alt="" src={msg.text} style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            objectFit: "cover",
                                                                            borderRadius:10,marginBottom:10,
                                                                            maxHeight:300,maxWidth:450,cursor:"pointer"
                                                                        }}
                                                                             onClick={() => {this.setState({showImageModal:true,imageModal:msg.text})}}
                                                                        />
                                                                        <h6 style={{color: "gray",fontSize:"0.6rem",textAlign:"end",marginRight:5}}>
                                                                            {moment(msg.created_at).fromNow(false)}</h6>
                                                                    </div> :
                                                                    msg.type === "ged_file" ?
                                                                        <div style={{backgroundColor:"#fff",padding:"3px",borderRadius:7.5,
                                                                            display:"inline-block",marginBottom:15,boxShadow: "0 1px 0.5px rgba(0,0,0,.13)"}}
                                                                        >
                                                                            <h6 style={{color:"#35cd96",fontSize:"0.6rem",marginTop:2,marginBottom:4,marginLeft:5}}>{this.getUserFname(this.props.contacts,msg.sender.email)}</h6>
                                                                            <div style={{backgroundColor:"#f0f0f0"}}>
                                                                                <div style={{padding:"13px 19px",alignItems:"center",display:"flex"}}>
                                                                                    <div className="msg_file_icon"/>
                                                                                    <div className="msg_file_text"
                                                                                         onClick={() => this.props.openPdfModal(msg.id_in_ged)}
                                                                                    >
                                                                                        <span>{msg.name_in_ged}</span>
                                                                                    </div>
                                                                                    <div className="msg_file_download_icon">
                                                                                        <div style={{color:"rgba(51,51,51,.5"}}>
                                                                                            <span>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} viewBox="0 0 34 34">
                                                                                                    <path d="M17 2c8.3 0 15 6.7 15 15s-6.7 15-15 15S2 25.3 2 17 8.7 2 17 2m0-1C8.2 1 1 8.2 1 17s7.2 16 16 16 16-7.2 16-16S25.8 1 17 1z"
                                                                                                          fill="currentColor"
                                                                                                    />
                                                                                                    <path d="M22.4 17.5h-3.2v-6.8c0-.4-.3-.7-.7-.7h-3.2c-.4 0-.7.3-.7.7v6.8h-3.2c-.6 0-.8.4-.4.8l5 5.3c.5.7 1 .5 1.5 0l5-5.3c.7-.5.5-.8-.1-.8z"
                                                                                                          fill="currentColor"
                                                                                                    />
                                                                                                </svg>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <h6 style={{color:"gray",marginTop:4,marginBottom:2,float:"right",fontSize:"0.6rem"}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                        </div>
                                                                        :
                                                                        msg.type === "product_pack" ?
                                                                            <div style={{backgroundColor:"#fff",padding:"3px",borderRadius:7.5,
                                                                                display:"inline-block",marginBottom:15,boxShadow: "0 1px 0.5px rgba(0,0,0,.13)"}}>
                                                                                <h6 style={{color:"#35cd96",fontSize:"0.6rem",marginTop:2,marginBottom:4,marginLeft:5}}>{this.getUserFname(this.props.contacts,msg.sender.email)}</h6>
                                                                                <div style={{marginTop:5,border:"2px solid #f0f0f0",borderRadius:7.5,padding:8}}>
                                                                                    <div style={{display:"flex"}}>
                                                                                        <ArrowRightIcon/>
                                                                                        <h6 style={{marginTop:7}}>{msg.pack_name}</h6>
                                                                                    </div>
                                                                                    {
                                                                                        (msg.pack_products || []).map((product,key) => (
                                                                                            <div key={key} style={{marginTop:5,marginLeft:5,marginRight:5}}>
                                                                                                <div style={{border:"2px solid cornflowerblue",padding:2.5,borderRadius:7.5}}>
                                                                                                    <div style={{display:"flex"}}>
                                                                                                        <div style={{alignSelf:"center"}}>
                                                                                                            <img alt="" src={product.image} style={{width:60,height:60,borderRadius:"unset",objectFit:"unset"}}/>
                                                                                                        </div>
                                                                                                        <div style={{marginLeft:10}}>
                                                                                                            <h6>{product.nomProd}</h6>
                                                                                                            <p className="truncate-2" style={{marginBottom:"0.0rem",backgroundColor:"#fff"}}>{product.descriptionProd}</p>
                                                                                                            <div align="right">
                                                                                                                <span style={{fontWeight:"bold",fontSize:"x-small",marginRight:5}}>{product.prix +" €"}</span>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                    <div style={{marginTop:10}}>
                                                                                        <div align="right">
                                                                                            <span style={{fontWeight:"bold"}}>Total: <span>{this.returnTotal(msg.pack_products)} €</span></span>
                                                                                        </div>
                                                                                        <div align="center" style={{marginTop:15}}>
                                                                                            <button
                                                                                                onClick={(e) => {}}
                                                                                                className="btn btn-success waves-effect waves-light">
                                                                                                Payer
                                                                                            </button>
                                                                                        </div>
                                                                                        <h6 style={{color:"gray",marginTop:14,marginBottom:2,float:"right",fontSize:"0.6rem"}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            :

                                                                            <p>
                                                                                <h6 style={{color:"#35cd96",fontSize:"0.6rem",marginTop:-1}}>{this.getUserFname(this.props.contacts,msg.sender.email)}</h6>
                                                                                <Anchorme  target="_blank" style={{color:"#039be5"}}>
                                                                                {msg.text}
                                                                                </Anchorme>
                                                                                <h6 style={{color:"gray",marginTop:20,marginBottom:-2,float:"right",fontSize:"0.6rem"}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                            </p>

                                                            }


                                                        </li>
                                                    </div>

                                            ))
                                        }
                                    </ul>
                                </div>
                                <div style={{backgroundColor:"#f0f0f0",position:"absolute",bottom:0,height:60,width:"100%",display:"flex"}}>
                                    <div style={{alignSelf:"center",margin:10,flex:"none",display:"flex"}}>
                                        <IconButton size="small"
                                                    onClick={(event) => {
                                                        this.setState({anchorElEmoji: event.currentTarget})
                                                    }}
                                        >
                                            <SentimentVerySatisfiedIcon/>
                                        </IconButton>

                                        <SpeedDial
                                            style={{marginTop:-295}}
                                            ariaLabel="SpeedDial Chat"
                                            //className={classes.speedDial}
                                            hidden={false}
                                            icon={<AttachFileIcon fontSize="small"/>}
                                            onClose={() => { this.setState({openSpeedDial:false})}}
                                            onOpen={() => { this.setState({openSpeedDial:true})}}
                                            open={this.state.openSpeedDial}
                                            direction="up"
                                            onClick={() => {this.setState({openSpeedDial:!this.state.openSpeedDial})}}
                                            FabProps={{size:"small",color:"primary",variant:"extended"}}
                                        >
                                            {speedDialActions.map((action) => (
                                                <SpeedDialAction
                                                    title={action.name}
                                                    key={action.name}
                                                    icon={action.icon}
                                                    tooltipTitle={action.name}
                                                    onClick={(event) => {
                                                        this.onClickAction(event,action)
                                                    }}
                                                    FabProps={{color:"primary"}}

                                                />
                                            ))}
                                        </SpeedDial>
                                        {/*<i className="fa fa-laugh attachment" aria-hidden="true"
                                           style={{
                                               fontSize: 20,
                                               cursor: "pointer",
                                               color:"#919191",
                                               boxShadow:"#fff 2px 4px 6px",
                                               margin:5
                                           }}
                                           onClick={(event) => {
                                               this.setState({anchorElEmoji: event.currentTarget})
                                           }}
                                        />
                                        <i className="fa fa-images attachment" aria-hidden="true"
                                           style={{
                                               fontSize: 20,
                                               cursor: "pointer",
                                               color:"#919191",
                                               boxShadow:"#fff 2px 4px 6px",
                                               margin:5
                                           }}
                                           onClick={() => {
                                               this.imageUpload.click()
                                           }}
                                        />
                                        <i className="fa fa-file-alt attachment" aria-hidden="true"
                                           style={{
                                               fontSize: 20,
                                               cursor: "pointer",
                                               color:"dodgerblue",
                                               boxShadow:"2px 4px 6px lightblue",
                                               margin:5
                                           }}
                                           onClick={(event) => {
                                               this.setState({anchorElFiles: event.currentTarget})
                                           }}
                                        />*/}
                                    </div>
                                    <div className="message-input" style={{flex:"1 1 auto"}}>
                                        <div className="wrap">
                                        <textarea  placeholder="Tapez votre message..."
                                                   style={{width:this.state.showRecorderForm === true ? "78%" : "100%"}}
                                                   value={this.state.text}
                                                   onChange={(e => {
                                                       this.setState({text: e.target.value})
                                                   })}
                                                   onKeyPress={(event => {
                                                       if (event.key === 'Enter' && !event.shiftKey) {
                                                           this.addNewMessage(this.state.text)
                                                       }
                                                   })}
                                        />
                                        </div>
                                    </div>
                                    <div style={{alignSelf:"center",flex:"none",margin:10}}>
                                        {
                                            this.state.showRecorderForm === false ?
                                            <i className="fa fa-microphone attachment" aria-hidden="true"
                                               style={{
                                                   fontSize: 20,
                                                   cursor: "pointer",
                                                   color:"#919191",
                                                   boxShadow:"#fff 2px 4px 6px",
                                                   margin:5
                                               }}
                                               onClick={(event) => {
                                                   this.setState({showRecorderForm:true})
                                               }}
                                            /> :
                                                <div>

                                                </div>
                                        }

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
                    id={id1}
                    open={openEmojiPopup}
                    anchorEl={this.state.anchorElEmoji}
                    onClose={() => {
                        this.setState({anchorElEmoji: null})
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

                <Popover
                    style={{zIndex:0,position:"unset"}}
                    id={id2}
                    open={openFilesPopup}
                    anchorEl={this.state.anchorElFiles}
                    onClose={() => {
                        this.setState({anchorElFiles: null})
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
                    <div style={{padding:15,height:600,width:300,paddingBottom:50}}>
                        <div align="right">
                            <IconButton size="small" onClick={() => {this.setState({anchorElFiles:null})}}>
                                <CloseIcon />
                            </IconButton>
                        </div>

                        <h6 style={{color:"darkblue"}}>Glisser des fichiers de votre drive directement dans la discussion</h6>
                        <div style={{marginTop:30}}>
                            <DirectoryTree
                                draggable={true}
                                allowDrop={(options) => {
                                    return false
                                }}
                                showIcon={true}
                                onExpand={this.onExpand}
                                onSelect={this.onSelect}
                                treeData={this.state.miniDrive}
                                expandAction="click"
                                expandedKeys={this.state.expandedKeys}
                                selectedKeys={this.state.selectedKeys}
                                onDragStart={e => {
                                    let file = {id:e.node.key,name:e.node.title,typeF:e.node.typeF}
                                    console.log(file)
                                    e.event.dataTransfer.setData("file", JSON.stringify(file))
                                }}
                                autoExpandParent={this.state.autoExpandParent}
                            />
                        </div>
                    </div>
                </Popover>

                <Popover
                    id={id3}
                    open={openToSignFilePopup}
                    anchorEl={this.state.anchorElToSignFile}
                    onClose={() => {
                        this.setState({anchorElToSignFile: null})
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
                    <div style={{padding:15,height:600,width:300,paddingBottom:50}}>
                        <div align="right">
                            <IconButton size="small" onClick={() => {this.setState({anchorElToSignFile:null})}}>
                                <CloseIcon />
                            </IconButton>
                        </div>

                        <h6 style={{color:"darkblue"}}>Choissisez votre document à signer</h6>
                        <div style={{marginTop:20,maxHeight:430,overflowY:"auto"}}>
                            <DirectoryTree
                                draggable={true}
                                allowDrop={(options) => {
                                    return false
                                }}
                                showIcon={true}
                                onExpand={this.onExpand}
                                onSelect={this.onSelectToSignFile}
                                treeData={this.state.miniDrive}
                                expandAction="click"
                                expandedKeys={this.state.expandedKeys}
                                selectedKeys={this.state.selectedKeys}
                                autoExpandParent={this.state.autoExpandParent}
                            />
                        </div>
                        <div style={{position:"absolute",bottom:50,marginRight:5}}>
                            <span style={{color:"#000",fontWeight:"bold"}}>Dossier sélectionné:&nbsp; <span style={{color:"blue"}}>{this.state.toSignDoc.title}</span> </span>
                        </div>
                        <div align="right" style={{position:"absolute",bottom:10,right:15}}>
                            <AtlButton
                                isDisabled={this.state.toSignDoc === ""}
                                appearance="primary"
                                onClick={() => {
                                    this.setState({anchorElToSignFile:null,openSignDocModal:true})
                                }}
                            >
                                Suivant
                            </AtlButton>
                        </div>
                    </div>
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


                <Dialog fullScreen open={this.state.openSignDocModal} onClose={() => this.setState({openSignDocModal:false})}
                        TransitionComponent={Transition}>

                    <SignModal doc_id={this.state.toSignDoc.key}
                               closeModal={() => { this.setState({openSignDocModal:false})}}
                               sendFile={() => this.addGedFile({id:this.state.toSignDoc.key,name:this.state.toSignDoc.title})}
                    />

                </Dialog>

            </div>
        )

    }


}