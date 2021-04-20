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
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import main_functions from "../../controller/main_functions";
import Drawer from '@material-ui/core/Drawer';
import stripe_logo from "../../assets/images/payment/stripe_logo.png"
import paypal_logo from "../../assets/images/payment/paypal_logo.png"
import gpay_logo from "../../assets/images/payment/GPay_logo.jpg"
import creditcard_logo from "../../assets/images/payment/credit_card_logo.jpg"
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GestureIcon from '@material-ui/icons/Gesture';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import utilFunctions from "../../tools/functions";
import AtlButton from '@atlaskit/button';
import CheckIcon from '@material-ui/icons/Check';
import SignatureCanvas from 'react-signature-canvas';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DocGenerationService from "../../provider/DocGenerationService";
import AltAvatarGroup from "@atlaskit/avatar-group";
import {AudioRecorder} from "./AudioRecorder";
import ReactPlayer from "react-player";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

const {DirectoryTree} = Tree;
//const db_name = "b446081d-3145-4dc3-b3df-5ac2bde13e9d";
const db_name = "d226981d-3145-4dc3-b2df-5ac2bde13e9d";





const speedDialActions= [
    { icon: <ImageOutlinedIcon color="primary" />, name: 'Images' },
    { icon: <FileCopyIcon color="primary" />, name: 'Documents' },
    { icon: <GestureIcon color="primary" />, name: 'Signer' },
    { icon: <ChildCareIcon color="primary" />, name: 'ChatBot' }
]


export default class Chat extends React.Component {

    imageUpload = React.createRef()
    scrollParentRef={}
    messageList = React.createRef()
    sigCanvas = {}
    state = {
        openAlert: false,
        alertMessage: '',
        alertType: '',

        tableList:[],
        text: "",
        messages: [],
        loading: true,
        showImageModal: false,
        imageModal: "",
        anchorElEmoji: null,
        anchorElFiles:null,

        hasMore:true,
        limit: 50,
        skipCount: 0,
        loadingScroll: false,
        textareaHeight:45,

        miniDrive:main_functions.changeStructure(this.props.location.state.miniDrive || [],true),
        room:this.props.location.state.room,
        contacts:this.props.location.state.contacts,
        autoExpandParent:true,
        expandedKeys:[],
        selectedKeys:[],

        openBottomPayModal:false,

        payment:"",

        openSpeedDial:false,
        updateScreen:false,

        waitResponseToBot:false,
        procuration_responseType:"",
        procurationData:{
            client:"",
            sujet:"",
            place:"",
            signature:""
        },
        openBottomSignModal:false,
        isRecording:false,

        openMsgMenu:false,
        anchorElMsgMenu:null,

        showTaggedMsgForm:false,
        selectedMsg:"",
        taggedMsg:"",
    }


    componentDidMount() {
        if(localStorage.getItem("token") === null || localStorage.getItem("token") === undefined ) {
            this.props.history.push("/login")
        }else{
            rethink.getTableDataByLabel(db_name, "test", "chat", "room_id", this.state.room.id, "created_at", this.state.limit, this.state.skipCount).then(res => {
                if (res.length < this.state.limit) {
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
    }

    fetchMoreData = () => {
        if(this.state.hasMore === true){
            this.setState({loadingScroll:true})
            let skipcount = this.state.skipCount + this.state.limit;
            let limit = this.state.limit
            rethink.getTableDataByLabel(db_name, "test", "chat", "room_id", this.state.room.id, "created_at", limit, skipcount).then(res => {
                console.log(res.length)
                if (res.length < this.state.limit) {
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
        }else{
            console.log("NO MORE MSGS !")
            this.openSnackbar("info","Plus de messages !")
        }
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



    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg,
            alertType: type
        });
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({ openAlert: false });
    };


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
            //insert
            if (recieve.new_val && !data.find(x => x.uid === recieve.new_val.uid) ) {
                console.log(recieve.new_val)
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
            console.log("CLOSED READ CHANGES");
            this.getChatChanges(ust_token, db, table)
        })
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

            if(this.state.waitResponseToBot === true){
                let newItem = {
                    text: text,
                    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    room_id: this.state.room.id,
                    sender: {
                        email: localStorage.getItem("email")
                    },
                    type: "text",
                    tmp:true
                }
                let msgs = this.state.messages || [];
                msgs.push(newItem);
                this.setState({messages:msgs,text: ""})
                setTimeout(() => {
                    this.scrollToBottom()
                },250)

                setTimeout(() => {

                    let proc_data = this.state.procurationData;
                    proc_data[this.state.procuration_responseType] = newItem.text;

                    msgs.push({
                        created_at: moment().format("YYYY-MM-DD HH:mm:ss") ,
                        id: utilFunctions.getUID() ,
                        room_id: this.state.room.id  ,
                        text: this.state.procuration_responseType ===  "client" ?  "Quel est le sujet de la procuration ?" :
                            this.state.procuration_responseType ===  "sujet" ? "Cette procuration est faite à quelle ville ?" :
                                "Maintenant, il vous reste que d'ajouter votre signature"
                        ,
                        type: "text",
                        sender:{
                            email:"ChatBot"
                        }
                    })
                    this.setState({
                        procuration_responseType: this.state.procuration_responseType === "client" ? "sujet" :
                            this.state.procuration_responseType === "sujet" ? "place" : ""
                        ,
                        procurationData:proc_data,messages:msgs,
                        waitResponseToBot:this.state.procuration_responseType !== "place"
                    })

                    this.setState({messages:msgs,text: ""})
                    setTimeout(() => {
                        this.scrollToBottom()
                        if(this.state.procuration_responseType === ""){
                            setTimeout(() => {
                                this.setState({openBottomSignModal:true})
                            },1000);

                        }
                    },300)

                },500)


            }

            else{
                let newItem = {
                    uid:utilFunctions.getUID(),
                    text: text,
                    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    room_id: this.state.room.id,
                    sender: {
                        email: localStorage.getItem("email")
                    },
                    type: "text",
                    tagged_to:this.state.taggedMsg !== "" ? (this.state.taggedMsg.uid || this.state.taggedMsg.id) : "false"
                }
                let msgs = this.state.messages || [];
                msgs.push(newItem)
                this.setState({messages:msgs,text: "",taggedMsg:"",showTaggedMsgForm:false})
                setTimeout(() => {
                    this.scrollToBottom()
                },250)
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
        }
    }

    addAudio(b64,duration){
        let newItem = {
            uid:utilFunctions.getUID(),
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            room_id: this.state.room.id,
            sender: {
                email: localStorage.getItem("email")
            },
            type: "audio",
            b64:b64,
            duration:duration / 1000,
            tagged_to:this.state.taggedMsg !== "" ? (this.state.taggedMsg.uid || this.state.taggedMsg.id) : "false"
        }
        let msgs = this.state.messages || [];
        msgs.push(newItem)
        this.setState({messages:msgs,text: "",taggedMsg:"",showTaggedMsgForm:false})
        setTimeout(() => {
            this.scrollToBottom()
        },250)

        this.verifIsTableExist("chat").then( v => {
            rethink.insert("test", 'table("chat").insert(' + JSON.stringify(newItem) + ')', db_name, false).then(resAdd => {
                if (resAdd && resAdd === true) {
                } else {
                    console.log("Erreur add audio in chat !")
                }
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {console.log(err)})
    }

    addFile(b64,name){
        let newItem = {
            uid:utilFunctions.getUID(),
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            room_id: this.state.room.id,
            sender: {
                email: localStorage.getItem("email")
            },
            type: "ged_file",
            b64:b64,
            name:name,
            //tagged_to:this.state.taggedMsg !== "" ? this.state.taggedMsg.id : "false"
        }
        let msgs = this.state.messages || [];
        msgs.push(newItem)
        this.setState({messages:msgs,text: "",taggedMsg:"",showTaggedMsgForm:false})
        setTimeout(() => {
            this.scrollToBottom()
        },250)
        this.verifIsTableExist("chat").then( v => {
            rethink.insert("test", 'table("chat").insert(' + JSON.stringify(newItem) + ')', db_name, false).then(resAdd => {
                if (resAdd && resAdd === true) {
                } else {
                    console.log("Erreur add file in chat !")
                }
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {console.log(err)})
    }

    addGedFile(file){
        let newItem = {
            uid:utilFunctions.getUID(),
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            room_id: this.state.room.id,
            sender: {
                email: localStorage.getItem("email")
            },
            type: "ged_file",
            id_in_ged:file.id,
            name_in_ged:file.name,
            tagged_to:this.state.taggedMsg !== "" ? (this.state.taggedMsg.uid || this.state.taggedMsg.id) : "false"
        }
        let msgs = this.state.messages || [];
        msgs.push(newItem)
        this.setState({messages:msgs,text: "",taggedMsg:"",showTaggedMsgForm:false})
        setTimeout(() => {
            this.scrollToBottom()
        },250)
        let room_members = (this.state.room.members || []).filter(x => x.email !== localStorage.getItem("email"));
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

    uploadImage = (image) => {

        let imgToUpload = image.target.files[0];
        let imgToUploadArray = [];
        imgToUploadArray.push(imgToUpload)

        if (imgToUpload.type === "image/png" || imgToUpload.type === "image/jpeg" || imgToUpload.type === "image/jpg") {
            const Compress = require('compress.js');
            const compress = new Compress()
            compress.compress(imgToUploadArray, {
                size: 2, // the max size in MB, defaults to 2MB
                quality: .75, // the quality of the image, max is 1,
                maxWidth: 1920, // the max width of the output image, defaults to 1920px
                maxHeight: 1920, // the max height of the output image, defaults to 1920px
                resize: true, // defaults to true, set false if you do not want to resize the image width and height
            }).then((data) => {

                let newItem = {
                    uid:utilFunctions.getUID(),
                    text: data[0].prefix + data[0].data,
                    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    room_id: this.state.room.id,
                    sender: {
                        email: localStorage.getItem("email")
                    },
                    type: "image",
                    tagged_to:this.state.taggedMsg !== "" ? (this.state.taggedMsg.uid || this.state.taggedMsg.id) : "false"
                }
                let msgs = this.state.messages || [];
                msgs.push(newItem)
                this.setState({messages:msgs,text: "",taggedMsg:"",showTaggedMsgForm:false})
                setTimeout(() => {
                    this.scrollToBottom()
                },250)

                this.verifIsTableExist("chat").then( v => {
                    rethink.insert("test", 'table("chat").insert(' + JSON.stringify(newItem) + ')', db_name, false).then(resAdd => {
                        if (resAdd && resAdd === true) {
                            console.log("Image added")
                        } else {
                            console.log("Erreur add msg chat !")
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(err => {console.log(err)})

            }).catch((err) => {
                console.log(err)
            })
        } else {
            this.props.openSnackbar("error", "Type de fichier erroné ! ")
        }
    };


    onExpand = (expandedKeys) => {
        this.setState({expandedKeys:expandedKeys,autoExpandParent:false})
    }

    onSelect = (selectedKeys, info) => {
        this.setState({selectedKeys:selectedKeys})
    }

    onDrop_container(e){
        e.preventDefault();e.stopPropagation();
        let recievedItem = JSON.parse(e.dataTransfer.getData("file"));
        if(recievedItem.typeF === "file"){
            this.addGedFile(recievedItem)
        }else{
            this.props.openSnackbar("warning","Seuls les fichiers peuvent être glissés ici")
        }
        e.dataTransfer.clearData();
    }

    downloadFile(file_id){
        this.setState({ loading: true });
        SmartService.getFile(file_id, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(fileRes => {
            if (fileRes.succes === true && fileRes.status === 200) {
                this.setState({ loading: false });
                let a = document.createElement('a');
                a.href = 'data:application/pdf;base64,' + fileRes.data.Content.Data;
                a.download = fileRes.data.name;
                a.click();
            }
            else if(fileRes.succes === false && fileRes.status === 400){
                this.setState({ loading: false });
                this.openSnackbar("error","Une erreur est survenue lors de l'ouverture du fichier ")
            }
            else {
                console.log(fileRes.error);
            }
        }).catch(err => {
            console.log(err)
            this.setState({ loading: false });
            this.openSnackbar("error","Une erreur est survenue lors de l'ouverture du fichier ")
        });
    }

    downloadB64File(b64){
        let a = document.createElement('a');
        a.href = 'data:application/pdf;base64,' + b64;
        a.download = "Procuration_" + moment().format("DD-MM-YYYY HH:mm");
        a.click();
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
        }else if(action.name === "ChatBot"){
            if(this.state.procurationData.client !== ""){
                this.setState({
                    waitResponseToBot:false,
                    procuration_responseType:"",
                    procurationData:{
                        client:"",
                        sujet:"",
                        place:"",
                        signature:""
                    }
                })
                let msgs = this.state.messages.filter(x => x.sender.email !== "ChatBot" && !x.tmp)
                this.setState({messages:msgs})
                setTimeout(() => {
                    this.beginBot()
                },500)
            }else{
                setTimeout(() => {
                    this.beginBot()
                },500)
            }
        }
    }

    beginBot(){
        let msgs = this.state.messages || [];

            msgs.push({
                created_at: moment().format("YYYY-MM-DD HH:mm:ss") ,
                id: utilFunctions.getUID() ,
                room_id: this.state.room.id  ,
                text: "Bonjour, que voulez-vous faire ?" ,
                type: "text",
                sender:{
                    email:"ChatBot"
                }
            })

        msgs.push({
                    created_at: moment().format("YYYY-MM-DD HH:mm:ss") ,
                    id: utilFunctions.getUID() ,
                    room_id: this.state.room.id  ,
                    type: "responses",
                    responses:[
                        {
                            id:"generate_proc",
                            text:"Générer un document de procuration",
                            clicked:false,
                            disabled:false
                        },
                        {
                            id:"generate_prov",
                            text:"Générer un document de provision",
                            clicked:false,
                            disabled:true
                        },
                        {
                            id:"generate_AGE",
                            text:"Générer un document d'augmentation de capital",
                            clicked:false,
                            disabled:true
                        },
                    ],
                    sender:{
                        email:"ChatBot"
                    }
                })
        this.setState({messages:msgs})
        setTimeout(()=> {
            this.scrollToBottom();
        },250)
    }

    renderMsgResponseForm(){
        let type = this.state.taggedMsg.type;

        return(
            <div className="response_container">
                <div className="response_container_display">
                    <div className="response_container_left_comp" style={{position:"relative"}}>
                        <div className="response_container_left_comp_container">
                            <span className="left_comp_container_bar"/>
                            <div className="left_comp_container_text_div">
                                <div style={{maxWidth:500}}>
                                    <div className="left_comp_container_text_title">
                                        <span>
                                            {
                                                localStorage.getItem("email") === this.state.taggedMsg.sender.email ? "Vous" : this.getUserFname(this.state.contacts || [],this.state.taggedMsg.sender.email)
                                            }
                                        </span>
                                    </div>
                                    <div className="left_comp_container_text_desc">
                                        <span>
                                            {
                                                type === "audio" ?
                                                <span style={{marginRight:4,color:"#4fc3f7"}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={20} viewBox="0 0 12 20">
                                                        <path d="M6 11.745a2 2 0 0 0 2-2V4.941a2 2 0 0 0-4 0v4.803a2 2 0 0 0 2 2.001zm3.495-2.001c0 1.927-1.568 3.495-3.495 3.495s-3.495-1.568-3.495-3.495H1.11c0 2.458 1.828 4.477 4.192 4.819v2.495h1.395v-2.495c2.364-.342 4.193-2.362 4.193-4.82H9.495v.001z"
                                                              fill="currentColor"
                                                        />
                                                    </svg>
                                                </span> : type === "image" ?
                                                    <span style={{marginRight:4,color:"#4fc3f7"}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={20} viewBox="0 0 12 20">
                                                        <path d="M13.822 4.668H7.14l-1.068-1.09a1.068 1.068 0 0 0-.663-.278H3.531c-.214 0-.51.128-.656.285L1.276 5.296c-.146.157-.266.46-.266.675v1.06l-.001.003v6.983c0 .646.524 1.17 1.17 1.17h11.643a1.17 1.17 0 0 0 1.17-1.17v-8.18a1.17 1.17 0 0 0-1.17-1.169zm-5.982 8.63a3.395 3.395 0 1 1 0-6.79 3.395 3.395 0 0 1 0 6.79zm0-5.787a2.392 2.392 0 1 0 0 4.784 2.392 2.392 0 0 0 0-4.784z"
                                                              fill="currentColor"
                                                        />
                                                    </svg>
                                                </span> : type === "ged_file" ?
                                                        <span style={{marginRight:4,color:"#4fc3f7"}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={20} viewBox="0 0 12 20">
                                                        <path d="M10.2 3H2.5C1.7 3 1 3.7 1 4.5v10.1c0 .7.7 1.4 1.5 1.4h7.7c.8 0 1.5-.7 1.5-1.5v-10C11.6 3.7 11 3 10.2 3zm-2.6 9.7H3.5v-1.3h4.1v1.3zM9.3 10H3.5V8.7h5.8V10zm0-2.7H3.5V6h5.8v1.3z"
                                                              fill="currentColor"
                                                        />
                                                    </svg>
                                                </span> : null


                                            }
                                            {type === "text" ? this.state.taggedMsg.text : type === "audio" ? main_functions.toMMSS(this.state.taggedMsg.duration.toString()) :type === "image" ? "Photo" : type === "ged_file" ? this.state.taggedMsg.name_in_ged : ""}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            type === "image" &&
                                <div style={{position:"absolute",bottom:0,right:0}}>
                                    <img alt="" src={this.state.taggedMsg.text} style={{width:83,height:83}} />
                                </div>
                        }
                    </div>
                    <div className="response_container_right_comp">
                        <div role="button"
                             onClick={() => {
                                 this.setState({showTaggedMsgForm:false,taggedMsg:""})
                             }}
                        >
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                        <path d="M 19.1 17.2 l -5.3 -5.3 l 5.3 -5.3 l -1.8 -1.8 l -5.3 5.4 l -5.3 -5.3 l -1.8 1.7 l 5.3 5.3 l -5.3 5.3 L 6.7 19 l 5.3 -5.3 l 5.3 5.3 l 1.8 -1.8 Z"
                                                              fill="currentColor"
                                                        />
                                                    </svg>
                                                </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderTaggedMsg(msg,taggedMsgId){
        let findTaggedMsg = this.state.messages.find(x => x.uid === taggedMsgId || x.id === taggedMsgId);
        if(findTaggedMsg){
            return(
                <div className="response_container_left_comp" style={{position: "relative", marginLeft: 0,marginTop:12,marginBottom:5,cursor:"pointer"}}
                     onClick={() => {
                         const element = document.getElementById(taggedMsgId)
                         element.scrollIntoView({ behavior: 'smooth',block: 'start' })
                     }}
                >
                    <div className="response_container_left_comp_container">
                        <span className="left_comp_container_bar"/>
                        <div className="left_comp_container_text_div">
                            <div style={{maxWidth: 500}}>
                                <div className="left_comp_container_text_title">
                                    <span>
                                        {
                                            localStorage.getItem("email") === findTaggedMsg.sender.email ? "Vous" : this.getUserFname(this.state.contacts || [],findTaggedMsg.sender.email)
                                        }
                                    </span>
                                </div>
                                <div className="left_comp_container_text_desc">
                                    <span>
                                        {
                                            findTaggedMsg.type === "audio" ?
                                                <span style={{marginRight: 4, color: "#4fc3f7"}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={20}
                                                         viewBox="0 0 12 20">
                                                        <path
                                                            d="M6 11.745a2 2 0 0 0 2-2V4.941a2 2 0 0 0-4 0v4.803a2 2 0 0 0 2 2.001zm3.495-2.001c0 1.927-1.568 3.495-3.495 3.495s-3.495-1.568-3.495-3.495H1.11c0 2.458 1.828 4.477 4.192 4.819v2.495h1.395v-2.495c2.364-.342 4.193-2.362 4.193-4.82H9.495v.001z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </span> :
                                                findTaggedMsg.type === "image" ?
                                                <span style={{marginRight: 4, color: "#4fc3f7"}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={20}
                                                         viewBox="0 0 12 20">
                                                        <path
                                                            d="M13.822 4.668H7.14l-1.068-1.09a1.068 1.068 0 0 0-.663-.278H3.531c-.214 0-.51.128-.656.285L1.276 5.296c-.146.157-.266.46-.266.675v1.06l-.001.003v6.983c0 .646.524 1.17 1.17 1.17h11.643a1.17 1.17 0 0 0 1.17-1.17v-8.18a1.17 1.17 0 0 0-1.17-1.169zm-5.982 8.63a3.395 3.395 0 1 1 0-6.79 3.395 3.395 0 0 1 0 6.79zm0-5.787a2.392 2.392 0 1 0 0 4.784 2.392 2.392 0 0 0 0-4.784z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </span> : findTaggedMsg.type === "ged_file" ?
                                                    <span style={{marginRight: 4, color: "#4fc3f7"}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={20}
                                                             viewBox="0 0 12 20">
                                                            <path
                                                                d="M10.2 3H2.5C1.7 3 1 3.7 1 4.5v10.1c0 .7.7 1.4 1.5 1.4h7.7c.8 0 1.5-.7 1.5-1.5v-10C11.6 3.7 11 3 10.2 3zm-2.6 9.7H3.5v-1.3h4.1v1.3zM9.3 10H3.5V8.7h5.8V10zm0-2.7H3.5V6h5.8v1.3z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                    </span> : null
                                        }
                                        {findTaggedMsg.type === "text" ? findTaggedMsg.text : findTaggedMsg.type === "audio" ? main_functions.toMMSS(findTaggedMsg.duration.toString()) :findTaggedMsg.type === "image" ? "Photo" : findTaggedMsg.type === "ged_file" ? findTaggedMsg.name_in_ged : ""}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        findTaggedMsg.type === "image" &&
                        <div style={{position: "absolute", bottom: 0, right: 0}}>
                            <img alt="" src={findTaggedMsg.text} style={{width: 60, height: 83,objectFit:"unset",borderRadius:"inherit"}}/>
                        </div>
                    }
                </div>
            )
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

        const openMsgMenuPopup = Boolean(this.state.anchorElMsgMenu);
        const id3 = openMsgMenuPopup ? 'msg-menu-popover' : undefined;



        return (
            <div>
                {
                    this.state.loading === true ?
                        <div style={{minHeight:"100vh"}}>
                        <div align="center" style={{marginTop: 200}}>
                            <CircularProgress size={20} color="secondary"/>
                        </div>
                        </div> :
                        <div id="frame" style={{marginTop:50}}
                             onDragOver={(e) => {
                                 e.preventDefault();e.stopPropagation();
                             }}
                             onDragLeave={(e) => {
                                 e.preventDefault();e.stopPropagation();
                             }}
                             onDrop={(e) => {this.onDrop_container(e)}}
                        >
                            <div className="content">
                                {/*<div className="contact-profile">
                                    <div style={{display:"flex",alignSelf:"center",marginLeft:10,paddingTop:12}}>
                                        <IconButton size="small"
                                                    onClick={() => {
                                                        this.props.history.goBack()
                                                    }}
                                        >
                                            <ArrowBackIcon fontSize="small"/>
                                        </IconButton>
                                        <h6 style={{marginLeft:5,marginTop:7}}>
                                            {this.state.room.title}
                                        </h6>
                                        <div style={{position:"absolute",right:15}}>
                                            <AltAvatarGroup appearance="stack" maxCount={4} borderColor="#C0C0C0" isTooltipDisabled={false} size="small"
                                                            data={(this.state.room.members || []).map((item,key) => ({
                                                                name:item.email,
                                                                src:(this.state.contacts || []).find(x => x.email === item.email) ? ((this.state.contacts || []).find(x => x.email === item.email)).imageUrl : "" ,
                                                                appearance:"circle",
                                                                size:"small",
                                                                borderColor:"#f0f0f0"
                                                            }))}
                                            />
                                        </div>
                                    </div>
                                </div>*/}
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
                                                        <li  className="replies" id={msg.uid || msg.id}>
                                                            {
                                                                msg.type === "image" ?
                                                                    <div style={{backgroundColor:"#dcf8c6",padding:"3px",borderRadius:7.5,position:"relative",paddingTop:13,maxWidth:"calc(100% - 80px)",
                                                                        display:"inline-block",marginBottom:15,float:"right",boxShadow: "0 1px 0.5px rgba(0,0,0,.13)"}}
                                                                    >
                                                                        <ExpandMoreIcon style={{position:"absolute",top:-2,right:5,color:"rgba(0,0,0,0.3)"}}
                                                                                        onClick={(e) => {this.setState({anchorElMsgMenu:e.currentTarget,selectedMsg:msg})}}
                                                                        />
                                                                        {
                                                                            msg.tagged_to && msg.tagged_to !== "false" ? this.renderTaggedMsg(msg,msg.tagged_to) :null
                                                                        }
                                                                        <img alt="" src={msg.text}
                                                                             style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:10,marginBottom:7,maxHeight:150,maxWidth:300,cursor:"pointer"}}
                                                                             onClick={() => {this.setState({showImageModal:true,imageModal:msg.text})}}
                                                                        />
                                                                        <h6 style={{color:"gray",fontSize:"0.6rem",textAlign:"end",marginRight:5}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                    </div> :
                                                                    msg.type === "ged_file" ?
                                                                        <div style={{backgroundColor:"#dcf8c6",padding:"3px",borderRadius:7.5,position:"relative",maxWidth:"calc(100% - 60px)",
                                                                            display:"inline-block",marginBottom:15,float:"right",boxShadow: "0 1px 0.5px rgba(0,0,0,.13)"}}
                                                                        >
                                                                            <ExpandMoreIcon style={{position:"absolute",top:-2,right:5,color:"rgba(0,0,0,0.3)"}}
                                                                                            onClick={(e) => {this.setState({anchorElMsgMenu:e.currentTarget,selectedMsg:msg})}}
                                                                            />
                                                                            {
                                                                                msg.tagged_to && msg.tagged_to !== "false" ? this.renderTaggedMsg(msg,msg.tagged_to) : null
                                                                            }
                                                                            <div style={{backgroundColor:"#cfe9ba"}}>
                                                                                <div style={{padding:"13px 19px",alignItems:"center",display:"flex",paddingTop:10,paddingBottom:10}}>
                                                                                    <div className="msg_file_icon"/>
                                                                                    <div className="msg_file_text"
                                                                                         onClick={() => {
                                                                                             msg.id_in_ged ? this.downloadFile(msg.id_in_ged) : this.downloadB64File(msg.b64)
                                                                                         }}
                                                                                    >
                                                                                        <span>{msg.name_in_ged || msg.name}</span>
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
                                                                                display:"inline-block",marginBottom:15,float:"right",boxShadow: "0 1px 0.5px rgba(0,0,0,.13)"}}
                                                                            >
                                                                                <div style={{margin:5,border:"2px solid #f0f0f0",borderRadius:7.5,padding:8,backgroundColor:"#fff"}}>
                                                                                    <div style={{display:"flex"}}>
                                                                                        <h6 style={{marginTop:7}}>{msg.pack_name}</h6>
                                                                                    </div>
                                                                                    {
                                                                                        (msg.pack_products || []).map((product,key) => (
                                                                                            <div style={{marginTop:5,marginLeft:5,marginRight:5}}>
                                                                                                <div style={{border:"2px solid cornflowerblue",padding:2.5,borderRadius:7.5}}>
                                                                                                    <div style={{display:"flex"}}>
                                                                                                        <div style={{alignSelf:"center"}}>
                                                                                                            <img alt="" src={product.image} style={{width:60,height:60,borderRadius:"unset",objectFit:"unset"}}/>
                                                                                                        </div>
                                                                                                        <div style={{marginLeft:10}}>
                                                                                                            <h6>{product.nomProd}</h6>
                                                                                                            <p className="truncate-2" style={{marginBottom:"0.0rem",backgroundColor:"#fff",fontSize:"0.6rem"}}>{product.desc}</p>
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
                                                                                            <span style={{fontWeight:"bold"}}>Total: <span> €</span></span>
                                                                                        </div>
                                                                                        <div align="center" style={{marginTop:15}}>
                                                                                            <button
                                                                                                onClick={(e) => {
                                                                                                    let payment = { };
                                                                                                    payment.produits = msg.pack_products
                                                                                                    this.setState({openBottomPayModal:true,payment:payment})
                                                                                                }}
                                                                                                className="btn btn-success waves-effect waves-light">
                                                                                                Payer
                                                                                            </button>
                                                                                        </div>
                                                                                        <h6 style={{color:"gray",marginTop:14,marginBottom:2,float:"right",fontSize:"0.6rem"}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                                    </div>
                                                                                </div>
                                                                            </div> :


                                                                            msg.type === "audio" ?
                                                                                <div style={{backgroundColor:"#dcf8c6",padding:"3px",borderRadius:7.5,position:"relative",maxWidth:"calc(100% - 40px)",
                                                                                    display:"inline-block",marginBottom:15,float:"right",boxShadow: "0 1px 0.5px rgba(0,0,0,.13)"}}
                                                                                >
                                                                                    <ExpandMoreIcon style={{position:"absolute",top:3,right:5,color:"rgba(0,0,0,0.3)"}}
                                                                                                    onClick={(e) => {this.setState({anchorElMsgMenu:e.currentTarget,selectedMsg:msg})}}
                                                                                    />
                                                                                    {
                                                                                        msg.tagged_to && msg.tagged_to !== "false" ? this.renderTaggedMsg(msg,msg.tagged_to) : null
                                                                                    }
                                                                                    <div style={{backgroundColor:"#cfe9ba"}}>
                                                                                        <div style={{padding:"13px 19px",alignItems:"center",display:"flex",paddingBottom:4}}>
                                                                                            <ReactPlayer
                                                                                                url={"data:audio/webm;codecs=opus;base64," + msg.b64}
                                                                                                width="260px"
                                                                                                height="40px"
                                                                                                controls={true}
                                                                                                style={{marginTop:5}}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <h6 style={{color:"gray",marginTop:4,marginBottom:2,float:"right",fontSize:"0.6rem"}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                                    <h6 style={{color:"gray",marginTop:4,marginBottom:2,float:"left",fontSize:"0.6rem",marginLeft:25}}>{main_functions.toMMSS(msg.duration.toString())}</h6>

                                                                                </div> :

                                                                            <div className="text-msg">
                                                                                <ExpandMoreIcon style={{position:"absolute",top:-1,right:5,color:"rgba(0,0,0,0.3)",cursor:"pointer"}}
                                                                                                onClick={(e) => {this.setState({anchorElMsgMenu:e.currentTarget,selectedMsg:msg})}}
                                                                                />
                                                                                {
                                                                                    msg.tagged_to && msg.tagged_to !== "false" ? this.renderTaggedMsg(msg,msg.tagged_to) : null
                                                                                }
                                                                                <Anchorme  target="_blank" style={{color:"#039be5"}}>
                                                                                {msg.text}
                                                                                </Anchorme>
                                                                                <h6 style={{color:"gray",marginBottom:-2,fontSize:"0.6rem",float:"right",marginTop:20}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                            </div>


                                                            }
                                                        </li>
                                                    </div>
                                                    :
                                                    <div key={key}>
                                                        <li  className="sent" id={msg.uid || msg.id}>
                                                            {
                                                                msg.type === "image" ?
                                                                    <div style={{
                                                                        backgroundColor: "#f5f5f5",
                                                                        padding: "3px",
                                                                        borderRadius: 7.5,
                                                                        display: "inline-block",
                                                                        marginBottom:15,position:"relative",
                                                                        maxWidth:"calc(100% - 80px)"
                                                                    }}
                                                                    >
                                                                        <ExpandMoreIcon style={{position:"absolute",top:-2,right:5,color:"rgba(0,0,0,0.3)"}}
                                                                                        onClick={(e) => {this.setState({anchorElMsgMenu:e.currentTarget,selectedMsg:msg})}}
                                                                        />
                                                                        {
                                                                            msg.tagged_to && msg.tagged_to !== "false" ? this.renderTaggedMsg(msg,msg.tagged_to) :null
                                                                        }
                                                                        <h6 style={{color:"#35cd96",fontSize:"0.6rem",marginTop:-1,marginLeft:5}}>{this.getUserFname(this.state.contacts || [],msg.sender.email)}</h6>
                                                                        <img alt="" src={msg.text} style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            objectFit: "cover",
                                                                            borderRadius:10,marginBottom:10,
                                                                            maxHeight:150,maxWidth:300,cursor:"pointer"
                                                                        }}
                                                                             onClick={() => {this.setState({showImageModal:true,imageModal:msg.text})}}
                                                                        />
                                                                        <h6 style={{color: "gray",fontSize:"0.6rem",textAlign:"end",marginRight:5}}>
                                                                            {moment(msg.created_at).fromNow(false)}</h6>
                                                                    </div> :

                                                                    msg.type === "ged_file" ?
                                                                        <div style={{backgroundColor:"#fff",padding:"3px",borderRadius:7.5,position:"relative",maxWidth:"calc(100% - 60px)",
                                                                            display:"inline-block",marginBottom:15,boxShadow: "0 1px 0.5px rgba(0,0,0,.13)"}}
                                                                        >
                                                                            <ExpandMoreIcon style={{position:"absolute",top:-2,right:5,color:"rgba(0,0,0,0.3)"}}
                                                                                            onClick={(e) => {this.setState({anchorElMsgMenu:e.currentTarget,selectedMsg:msg})}}
                                                                            />
                                                                            {
                                                                                msg.tagged_to && msg.tagged_to !== "false" ? this.renderTaggedMsg(msg,msg.tagged_to) :null
                                                                            }
                                                                            <h6 style={{color:"#35cd96",fontSize:"0.6rem",marginTop:2,marginBottom:4,marginLeft:5}}>{this.getUserFname(this.state.contacts || [],msg.sender.email)}</h6>
                                                                            <div style={{backgroundColor:"#f0f0f0"}}>
                                                                                <div style={{padding:"13px 19px",alignItems:"center",display:"flex",paddingTop:10,paddingBottom:10}}>
                                                                                    <div className="msg_file_icon"/>
                                                                                    <div className="msg_file_text"
                                                                                         onClick={() => {
                                                                                             msg.id_in_ged ? this.downloadFile(msg.id_in_ged) : this.downloadB64File(msg.b64)
                                                                                         }}
                                                                                    >
                                                                                        <span>{msg.name_in_ged || msg.name}</span>
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

                                                                        msg.type === "audio" ?
                                                                            <div style={{backgroundColor:"#fff",padding:"3px",borderRadius:7.5,position:"relative",maxWidth:"calc(100% - 40px)",
                                                                                display:"inline-block",marginBottom:15,boxShadow: "0 1px 0.5px rgba(0,0,0,.13)"}}
                                                                            >
                                                                                <ExpandMoreIcon style={{position:"absolute",top:3,right:5,color:"rgba(0,0,0,0.3)"}}
                                                                                                onClick={(e) => {this.setState({anchorElMsgMenu:e.currentTarget,selectedMsg:msg})}}
                                                                                />
                                                                                {
                                                                                    msg.tagged_to && msg.tagged_to !== "false" ? this.renderTaggedMsg(msg,msg.tagged_to) :null
                                                                                }
                                                                                <h6 style={{color:"#35cd96",fontSize:"0.6rem",marginTop:2,marginBottom:4,marginLeft:5}}>{this.getUserFname(this.state.contacts || [],msg.sender.email)}</h6>
                                                                                <div>
                                                                                    <div style={{padding:"13px 19px",alignItems:"center",display:"flex",paddingBottom:4}}>
                                                                                        <ReactPlayer
                                                                                            url={"data:audio/webm;codecs=opus;base64," + msg.b64}
                                                                                            width="260px"
                                                                                            height="40px"
                                                                                            controls={true}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <h6 style={{color:"gray",marginTop:4,marginBottom:2,float:"right",fontSize:"0.6rem"}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                                <h6 style={{color:"gray",marginTop:4,marginBottom:2,float:"left",fontSize:"0.6rem",marginLeft:25}}>{main_functions.toMMSS(msg.duration.toString())}</h6>

                                                                            </div> :

                                                                        msg.type === "product_pack" ?
                                                                            <div style={{backgroundColor:"#fff",padding:"3px",borderRadius:7.5,
                                                                                display:"inline-block",marginBottom:15,boxShadow: "0 1px 0.5px rgba(0,0,0,.13)"}}
                                                                            >
                                                                                <h6 style={{color:"#35cd96",fontSize:"0.6rem",marginTop:2,marginBottom:4,marginLeft:5}}>{this.getUserFname(this.state.contacts || [],msg.sender.email)}</h6>
                                                                                <div style={{marginTop:5,border:"2px solid #f0f0f0",borderRadius:7.5,padding:8}}>
                                                                                    <div style={{display:"flex"}}>
                                                                                        <h6 style={{marginTop:7}}>{msg.pack_name}</h6>
                                                                                    </div>
                                                                                    {
                                                                                        (msg.pack_products || []).map((product,key) => (
                                                                                            <div style={{marginTop:5,marginLeft:5,marginRight:5}}>
                                                                                                <div style={{border:"2px solid cornflowerblue",padding:2.5,borderRadius:7.5}}>
                                                                                                    <div style={{display:"flex"}}>
                                                                                                        <div style={{alignSelf:"center"}}>
                                                                                                            <img alt="" src={product.image} style={{width:60,height:60,borderRadius:"unset",objectFit:"unset"}}/>
                                                                                                        </div>
                                                                                                        <div style={{marginLeft:10}}>
                                                                                                            <h6>{product.nomProd}</h6>
                                                                                                            <p className="truncate-2" style={{marginBottom:"0.0rem",backgroundColor:"#fff",fontSize:"0.6rem"}}>{product.descriptionProd}</p>
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
                                                                                            <span style={{fontWeight:"bold"}}>Total: <span>1200 €</span></span>
                                                                                        </div>
                                                                                        <div align="center" style={{marginTop:15}}>
                                                                                            <button
                                                                                                onClick={(e) => {
                                                                                                    let payment={}
                                                                                                    payment.produits=msg.pack_products
                                                                                                    this.setState({openBottomPayModal:true,payment:payment})
                                                                                                }}
                                                                                                className="btn btn-success waves-effect waves-light">
                                                                                                Payer
                                                                                            </button>
                                                                                        </div>
                                                                                        <h6 style={{color:"gray",marginTop:14,marginBottom:2,float:"right",fontSize:"0.6rem"}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            :

                                                                            msg.type === "responses" ?
                                                                            <div style={{
                                                                                backgroundColor: "#f5f5f5",
                                                                                padding: "3px",
                                                                                borderRadius: 7.5,
                                                                                display: "inline-block",
                                                                                marginBottom:15
                                                                            }}
                                                                            >
                                                                                {
                                                                                    (msg.responses || []).map((resp,key) => (
                                                                                        <div style={{margin:10}}>
                                                                                            <AtlButton
                                                                                                onClick={() => {
                                                                                                    if(resp.id === "download" || resp.id === "share"){
                                                                                                        let b64Sign = this.state.proc_user_signature;
                                                                                                        resp.selected = true;
                                                                                                        this.setState({updateScreen:!this.state.updateScreen})
                                                                                                        setTimeout(() => {
                                                                                                            if(resp.id === "download"){
                                                                                                                this.downloadB64File(b64Sign)
                                                                                                            }else{
                                                                                                                this.addFile(b64Sign,"Procuration_" + moment().format("DD-MM-YYYY HH:mm"))
                                                                                                            }
                                                                                                        },400)

                                                                                                    }else{
                                                                                                        let test =false;
                                                                                                        msg.responses.map((item) => {
                                                                                                            if(item.selected && item.selected === true) test =true
                                                                                                        })
                                                                                                        if(test === false){
                                                                                                            resp.selected = true;
                                                                                                            this.setState({updateScreen:!this.state.updateScreen})


                                                                                                            setTimeout(() => {
                                                                                                                let msgs = this.state.messages || [];
                                                                                                                msgs.push({
                                                                                                                    created_at: moment().format("YYYY-MM-DD HH:mm:ss") ,
                                                                                                                    id: utilFunctions.getUID() ,
                                                                                                                    room_id: this.state.room.id  ,
                                                                                                                    text: "Quel est le nom et prénom du client ?" ,
                                                                                                                    type: "text",
                                                                                                                    sender:{
                                                                                                                        email:"ChatBot"
                                                                                                                    }
                                                                                                                })
                                                                                                                this.setState({messages:msgs,procuration_responseType:"client",waitResponseToBot:true})
                                                                                                                setTimeout(()=> {
                                                                                                                    this.scrollToBottom();
                                                                                                                },250)
                                                                                                            },750)

                                                                                                        }
                                                                                                    }
                                                                                                }}
                                                                                                appearance="default"
                                                                                                isSelected={resp.selected && resp.selected === true }
                                                                                                iconAfter={resp.selected && resp.selected === true ? <CheckIcon fontSize="small" color="secondary"/> : null}
                                                                                            >
                                                                                                {resp.text}
                                                                                            </AtlButton>
                                                                                        </div>
                                                                                    ))
                                                                                }
                                                                            </div>

                                                                                :

                                                                                <div className="text-msg">
                                                                                    <h6 style={{color:"#35cd96",fontSize:"0.6rem",marginTop:-1}}>{this.getUserFname(this.state.contacts || [],msg.sender.email)}</h6>
                                                                                    <ExpandMoreIcon style={{position:"absolute",top:-1,right:5,color:"rgba(0,0,0,0.3)",cursor:"pointer"}}
                                                                                                    onClick={(e) => {this.setState({anchorElMsgMenu:e.currentTarget,selectedMsg:msg})}}
                                                                                    />
                                                                                    {
                                                                                        msg.tagged_to && msg.tagged_to !== "false" ? this.renderTaggedMsg(msg,msg.tagged_to) :null
                                                                                    }
                                                                                    <Anchorme  target="_blank" style={{color:"#039be5"}}>
                                                                                        {msg.text}
                                                                                    </Anchorme>
                                                                                    <h6 style={{color:"gray",marginBottom:-2,fontSize:"0.6rem",float:"right",marginTop:20}}>{moment(msg.created_at).fromNow(false)}</h6>
                                                                                </div>

                                                            }


                                                        </li>
                                                    </div>

                                            ))
                                        }
                                    </ul>
                                </div>


                                {
                                    this.state.showTaggedMsgForm === true &&  this.renderMsgResponseForm()

                                }


                                <div style={{backgroundColor:"#f0f0f0",position:"fixed",bottom:71,height:60,width:"100%",display:"flex"}}>

                                    <div  style={{alignSelf:"center",margin:10,flex:"none",display:"flex"}}>
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
                                            hidden={false}
                                            icon={<AttachFileIcon fontSize="small"/>}
                                            onClose={() => { this.setState({openSpeedDial:false})}}
                                            onOpen={() => { this.setState({openSpeedDial:true})}}
                                            open={this.state.openSpeedDial}
                                            direction="up"
                                            onClick={() => {this.setState({openSpeedDial:!this.state.openSpeedDial})}}
                                            FabProps={{size:"small",color:"default",variant:"extended"}}
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
                                                    FabProps={{color:"default"}}

                                                />
                                            ))}
                                        </SpeedDial>
                                    </div>
                                    <div className="message-input" style={{flex:"1 1 auto"}}>
                                        <div className="wrap">
                                        <textarea  placeholder="Tapez votre message..."
                                                   value={this.state.text}
                                                   onChange={(e => {
                                                       this.setState({text: e.target.value})
                                                   })}
                                                   onKeyPress={(event => {
                                                       if (event.key === 'Enter' && !event.shiftKey) {
                                                           event.preventDefault()
                                                           this.addNewMessage(this.state.text)
                                                       }
                                                   })}
                                        />
                                        </div>
                                    </div>

                                    <AudioRecorder
                                        addAudioMsg={(b64,duration) => {
                                            this.addAudio(b64,duration)
                                        }}
                                    />


                                </div>

                                <input style={{visibility: 'hidden', width: 0, height: 0}}
                                       type='file' accept='.png,.jpeg,.jpg'
                                       onChange={(files) => this.uploadImage(files)}
                                       ref={(ref) => this.imageUpload = ref}
                                />
                            </div>
                        </div>
                }

                <Drawer anchor="bottom" open={this.state.openBottomSignModal} onClose={() => this.setState({openBottomSignModal:false})}
                        style={{borderRadius:20}}
                >
                    <div style={{padding:15}}>
                        <h5 style={{color:"green",marginTop:5}}>Dessinez votre signature</h5>
                        <div style={{marginTop:20,textAlign:"center"}}>
                            <div style={{height: 300, border: '3px solid #f0f0f0'}}>
                                <SignatureCanvas ref={(ref) => {
                                    this.sigCanvas = ref
                                }} penColor={"#000"} canvasProps={{
                                    width: 320,
                                    height: 300,
                                    className: 'sigCanvas'
                                }}
                                />
                                <div style={{position: "absolute", bottom: 65, right: 30}}>
                                    <HighlightOffIcon onClick={() => {
                                        this.sigCanvas.clear()
                                    }}/>
                                </div>
                            </div>
                        </div>
                        <div align="right" style={{marginTop:15}}>
                            <AtlButton
                                onClick={() => {
                                    let msgs = this.state.messages || [];

                                    msgs.push({
                                        created_at: moment().format("YYYY-MM-DD HH:mm:ss") ,
                                        id: utilFunctions.getUID() ,
                                        room_id: this.state.room.id  ,
                                        text: "Votre document est en cours de traitement..." ,
                                        type: "text",
                                        sender:{
                                            email:"ChatBot"
                                        }
                                    })
                                    this.setState({messages:msgs})
                                    setTimeout(()=> {
                                        this.scrollToBottom();
                                        let signature = this.sigCanvas.getTrimmedCanvas().toDataURL('image/png');
                                        let data = {
                                            date:moment().format("DD/MM/YYYY"),
                                            client:this.state.procurationData.client,
                                            desc:this.state.procurationData.sujet,
                                            pays:this.state.procurationData.place,
                                            signature:signature
                                        }
                                        this.setState({openBottomSignModal:false})
                                        DocGenerationService.generateProcuration({data:data}).then( res => {
                                            console.log(res)
                                            let msgs = this.state.messages || [];
                                            msgs.push({
                                                created_at: moment().format("YYYY-MM-DD HH:mm:ss") ,
                                                id: utilFunctions.getUID() ,
                                                room_id: this.state.room.id  ,
                                                text: "Le document de procuration est bien généré avec succès \r Voulez vous le : " ,
                                                type: "text",
                                                sender:{
                                                    email:"ChatBot"
                                                }
                                            })
                                            this.setState({messages:msgs,proc_user_signature:res.data})
                                            setTimeout(()=> {
                                                this.scrollToBottom();

                                                setTimeout(() => {
                                                    let msgs = this.state.messages || [];
                                                    msgs.push({
                                                        created_at: moment().format("YYYY-MM-DD HH:mm:ss") ,
                                                        id: utilFunctions.getUID() ,
                                                        room_id: this.state.room.id  ,
                                                        type: "responses",
                                                        responses:[
                                                            {
                                                                id:"download",
                                                                text:"Télécharger",
                                                                clicked:false,
                                                                disabled:false
                                                            },
                                                            {
                                                                id:"share",
                                                                text:"Partager dans cette discussion",
                                                                clicked:false,
                                                                disabled:true
                                                            }
                                                        ],
                                                        sender:{
                                                            email:"ChatBot"
                                                        }
                                                    })
                                                    this.setState({messages:msgs})
                                                    setTimeout(()=> {
                                                        this.scrollToBottom();
                                                    },250)

                                                },400)

                                            },250);
                                        }).catch(err => {
                                            console.log(err)
                                        })
                                    },250)
                                }}
                                appearance="primary"
                            >
                                Valider
                            </AtlButton>
                        </div>
                    </div>
                </Drawer>

                <Drawer anchor="bottom" open={this.state.openBottomPayModal} onClose={() => this.setState({openBottomPayModal:false})}
                        style={{borderRadius:20}}
                >
                    <div style={{padding:15}}>
                        <h5 style={{color:"green",marginTop:5}}>Méthodes de paiement</h5>
                        <div style={{marginTop:20,marginBottom:20}}>
                            <div style={{display:"flex",cursor:"pointer",marginBottom:10}}>
                                <img alt="" style={{width:30,height:30,objectFit:"contain"}} src={gpay_logo} />
                                <h5 style={{marginTop:8,marginLeft:15}}>Google Pay</h5>
                            </div>
                            <div style={{display:"flex",cursor:"pointer",marginBottom:10}}>
                                <img alt="" style={{width:30,height:30,objectFit:"contain"}} src={creditcard_logo} />
                                <h5 style={{marginTop:8,marginLeft:15}}>Carte bancaire</h5>
                            </div>
                            <div style={{display:"flex",cursor:"pointer",marginBottom:10}}>
                                <img alt="" style={{width:30,height:30,objectFit:"contain"}} src={paypal_logo} />
                                <h5 style={{marginTop:8,marginLeft:15}}>Paypal</h5>
                            </div>
                            <div style={{display:"flex",cursor:"pointer",marginBottom:10}}
                                 onClick={() => {
                                     this.props.history.push('/stripe',{payment:this.state.payment})

                                 }}
                            >
                                <img alt="" style={{width:30,height:30,objectFit:"contain"}} src={stripe_logo} />
                                <h5 style={{marginTop:8,marginLeft:15}}>Stripe</h5>
                            </div>
                        </div>
                    </div>
                </Drawer>


                <Popover
                    id={id3}
                    open={openMsgMenuPopup}
                    anchorEl={this.state.anchorElMsgMenu}
                    onClose={() => {
                        this.setState({anchorElMsgMenu: null})
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
                    <Paper style={{width:250}}>
                        <MenuList id="menu-list-grow">
                                <MenuItem style={{minHeight:40}}
                                          onClick={() => {
                                              this.setState({showTaggedMsgForm:true,anchorElMsgMenu:null,taggedMsg:this.state.selectedMsg})
                                          }}
                                >
                                    Répondre
                                </MenuItem>
                                <MenuItem style={{minHeight:40}} onClick={() => {}}>Marquer comme important</MenuItem>
                                <MenuItem style={{minHeight:40}} onClick={() => {}}>Supprimer</MenuItem>
                            </MenuList>
                    </Paper>
                </Popover>


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
                                onDoubleClick={(e, node) => {
                                    console.log(e)
                                    if(e.node.typeF === "file"){
                                        this.addGedFile(e.node)
                                    }else{
                                        this.openSnackbar("warning","Seuls les fichiers peuvent être glissés ici")
                                    }
                                }}

                            />
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

                <Snackbar
                    open={this.state.openAlert}
                    autoHideDuration={5000}
                    onClose={this.closeSnackbar}
                >
                    <Alert
                        elevation={6}
                        variant="filled"
                        onClose={this.closeSnackbar}
                        severity={this.state.alertType}
                    >
                        {this.state.alertMessage}
                    </Alert>
                </Snackbar>

            </div>
        )

    }


}
