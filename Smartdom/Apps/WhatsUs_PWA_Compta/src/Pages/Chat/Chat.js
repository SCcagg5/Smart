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
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import LoadingOverlay from 'react-loading-overlay';
import styled, { css } from "styled-components";
import Select, { OptionType, FormatOptionLabelMeta } from '@atlaskit/select';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import {DatePicker } from 'react-rainbow-components';
import { VscHubot } from "react-icons/vsc";

const {DirectoryTree} = Tree;
const db_name = "1313a0ed-5b4a-52fd-aeff-8de26ee1bcf9";


const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 2000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  ${props =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;


const speedDialActions= [
    { icon: <ImageOutlinedIcon color="primary" />, name: 'Images' },
    { icon: <FileCopyIcon color="primary" />, name: 'Documents' },
    { icon: <GestureIcon color="primary" />, name: 'Signer' },
    { icon: <VscHubot color="#1a73e8" size="2em"/>, name: 'ChatBot' }
]

const formatOptionLabel = (
    option: OptionType,
    { context }: FormatOptionLabelMeta<OptionType>,
) => {
    if (context === 'menu') {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {
                    option.type === 1 ? <BusinessIcon color="primary"/> : <PersonIcon color="primary"/>
                }
                <span
                    style={{
                        paddingLeft: 8,
                        paddingBottom: 0,
                    }}
                >
                    {option.label}
                </span>
            </div>
        );
    }
    return option.label;
};


export default class Chat extends React.Component {

    imageUpload = React.createRef()
    fact_upload = React.createRef()
    scrollParentRef={}
    messageList = React.createRef()
    datePickerRef = React.createRef()

    sigCanvas = {}
    state = {
        openAlert: false,
        alertMessage: '',
        alertType: '',

        tableList:[],
        text: "",
        messages: [],
        loading: true,
        loadingCall:false,
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
        contacts:null,
        annuaire_clients_mandat:null,
        clients_cases:null,
        compta_fournisseurs:null,
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

        initial_bot:{
            name:"",
            type:"",
            questions:[
                {
                    data_title:null,
                    question:"Bonjour, comment je peux vous aider ?",
                    suggestions:{
                        type:"buttons", //buttonGroup,text,...
                        responses:[
                            {
                                text:"Télécharger une facture",
                                selected:false,
                                onClick:() => {
                                    setTimeout(() => {
                                        this.addNewMessage("Télécharger une facture","bot_upload_fact")
                                        this.executeBot("bot_upload_fact",this.state.bot_upload_fact,0)
                                    },400)
                                },
                            },
                            {
                                text:"Saisir une facture",
                                selected:false,
                                onClick:() => {
                                    setTimeout(() => {
                                        this.addNewMessage("Saisir une facture","initial_bot")
                                        this.executeBot("bot_saisie_fact",this.state.bot_saisie_fact,0)
                                    },400)
                                },
                            }
                        ]
                    },
                    action_before: async () => {this.setState({is_bot_active:true})},
                    id:0
                }
            ],
            currentQuest:0,
            timeout:2000,
            end:false
        },
        bot_saisie_fact:{
            name:"",
            type:"",
            questions:[
                {
                    data_title:"client",
                    question:"Cette facture concerne quel client ?",
                    suggestions:{
                        type:"select", //buttonGroup,text,...
                        onSelect:(value) => {
                            this.start_loading_bot(1400)
                            setTimeout(() => {
                                this.update_bot_data("bot_saisie_fact",value)
                                this.executeBot("bot_saisie_fact",this.state.bot_saisie_fact,1)
                            },1500)
                        }
                    },
                    action_before: async () => { await this.getOdooClients()},
                    id:0
                },
                {
                    data_title:"montant_facture",
                    question:"Quel est le montant TTC de la facture en CHF ?",
                    suggestions:{
                        type:"text", //buttonGroup,text,...
                    },
                    action_before:() => {},
                    id:1
                },
                {
                    data_title:"type_facture",
                    question:"Est-ce que c'est une charge d'exploitation ou un investissement ?",
                    suggestions:{
                        type:"buttons", //buttonGroup,text,...
                        responses:[
                            {
                                text:"Charge d'exploitation",
                                selected:false,
                                onClick:() => {
                                    setTimeout(() => {
                                        this.addNewMessage("Charge d'exploitation","bot_saisie_fact")
                                    },400)
                                },
                            },
                            {
                                text:"Investissement",
                                selected:false,
                                onClick:() => {
                                    setTimeout(() => {
                                        this.addNewMessage("Investissement","bot_saisie_fact")
                                    },400)
                                },
                            }
                        ]
                    },
                    action_before:() => {},
                    id:2
                },
                {
                    data_title:"date_facture",
                    question:"Quelle est la date de la facture ?",
                    suggestions:{
                        type:"date", //buttonGroup,text,...
                    },
                    action_before: async () => {},
                    id:3
                },
                {
                    data_title:false,
                    question:"Votre facture est en cours de préparation, merci de patientez ",
                    suggestions:{
                        type:"text", //buttonGroup,text,...
                    },
                    action_before: async () => {},
                    action_after: async () => {
                        let b64 = await this.generateOdooFacture(this.state.bot_recovered_data.date_facture,this.state.bot_recovered_data.client.value,this.state.bot_recovered_data.montant_facture)
                        let data = this.state.bot_recovered_data
                        data['facture_b64'] = b64
                        await this.executeBot("bot_saisie_fact",this.state.bot_saisie_fact,5)

                    },
                    id:4
                },
                {
                    data_title:false,
                    question:"Félicitation ! la facture est bien genérée est enregistrée dans votre Ged",
                    suggestions:{
                        type:"text", //buttonGroup,text,...
                    },
                    action_before: async () => {},
                    action_after: async () => {
                        await setTimeout(() => {
                            this.executeBot("bot_saisie_fact",this.state.bot_saisie_fact,6)
                        },500)
                    },
                    id:5
                },
                {
                    data_title:false,
                    question:"Voici un extrait du document de la facture",
                    suggestions:{
                        type:"text", //buttonGroup,text,...
                    },
                    action_before: async () => {},
                    action_after: async () => {
                        setTimeout(() => {
                            this.addTmp_B64File(this.state.bot_recovered_data.facture_b64,
                                "Facture_" + this.state.bot_recovered_data.client.label +"_"+moment().format("DD-MM-YYYY HH:mm"),"ChatBot")
                        },400)
                    },
                    id:6
                },
            ],
            currentQuest:0,
            timeout:2000,
            end:false
        },
        bot_upload_fact:{
            name:"",
            type:"",
            questions:[
                {
                    data_title:"fact_upload_file",
                    question:"Veuillez sélectionner votre facture en format pdf en respectant le format approprié du nom",
                    suggestions:{
                        type:"upload_fact", //buttonGroup,text,...
                    },
                    action_before: () => {},
                    action_after: async () => {
                        this.start_loading_bot()
                        setTimeout(() => {
                            this.stop_loading_bot()
                            this.fact_upload.click();
                        },1000)
                    },
                    id:0
                },
                {
                    data_title:"fact_upload_file",
                    question:"Format ou nom du fichier invalide ! Veuillez re-sélectionner votre facture ",
                    suggestions:{
                        type:"buttons", //buttonGroup,text,...
                        responses:[
                            {
                                text:"Sélectionner votre facture",
                                selected:false,
                                onClick:() => {
                                    setTimeout(() => {
                                        this.fact_upload.click()
                                    },400)
                                },
                            },
                            {
                                text:"Annuler",
                                selected:false,
                                onClick:() => {
                                    setTimeout(() => {
                                        window.location.reload()
                                    },400)
                                },
                            }
                        ]
                    },
                    action_before: () => {},
                    action_after: async () => {
                        this.start_loading_bot()
                        setTimeout(() => {
                            this.stop_loading_bot()
                            this.fact_upload.click();
                        },1200)
                    },
                    id:1
                },
                {
                    data_title:false,
                    question:"Votre facture est en cours de préparation, merci de patientez ",
                    suggestions:{
                        type:"text", //buttonGroup,text,...
                    },
                    action_before: async () => {},
                    action_after: async () => {},
                    id:2
                },
                {
                    data_title:false,
                    question:"Félicitation ! la facture est bien genérée est enregistrée dans votre Ged",
                    suggestions:{
                        type:"text", //buttonGroup,text,...
                    },
                    action_before: async () => {},
                    action_after: async () => {
                        await setTimeout(() => {
                            this.executeBot("bot_upload_fact",this.state.bot_upload_fact,4)
                        },500)
                    },
                    id:3
                },
                {
                    data_title:false,
                    question:"Voici un extrait du document de la facture",
                    suggestions:{
                        type:"text", //buttonGroup,text,...
                    },
                    action_before: async () => {},
                    action_after: async () => {
                        setTimeout(() => {
                            this.addTmp_B64File(this.state.bot_recovered_data.facture_b64,
                                "Facture_" + this.state.bot_recovered_data.client.label +"_"+moment().format("DD-MM-YYYY HH:mm"),"ChatBot")
                        },400)
                    },
                    id:4
                },
            ],
            currentQuest:0,
            timeout:2000,
            end:false
        },
        is_bot_active:false,
        bot_recovered_data:{

        },

        openModalDatePicker:false
    }

    async getOdooClients(){

        return new Promise((resolve, reject) => {

            SmartService.get_oddo_clients(localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( clientsRes => {
                if (clientsRes.succes === true && clientsRes.status === 200) {
                    let clients_ids = clientsRes.data || [];
                    let clients_calls = [];
                    let clients = []
                    clients_ids.map((id, key) => {
                        clients_calls.push(
                            SmartService.get_oddo_client_byid(id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(clientResData => {
                                clients.push({value: clientResData.data[0].id, label: clientResData.data[0].display_name,type:clientResData.data[0].is_company === true ? 1 : 0})
                            }).catch(err => console.log(err))
                        )
                    })
                    Promise.all(clients_calls).then(response => {
                        this.setState({oddo_clients:clients})
                        resolve(true)
                    }).catch(err => console.log(err))

                }
            }).catch(err => {console.log(err)})

        })

    }

    async generateOdooFacture(date,client_id,amount){

        return new Promise((resolve, reject) => {

            let acces_token = utilFunctions.getUID()
            let odoo_data = [{
                'access_token': acces_token,
                'type': 'out_invoice',
                "move_name":false,
                "user_id":2,
                /*"team_id":1,*/
                "comment":false,
                'l10n_ch_isr_sent': false,
                'name': false,   //on peut mettre une petite desc sous le titre de la facture avec ce champs
                'date_invoice': moment(date).format('YYYY-MM-DD'),
                'date_due': moment(date).format('YYYY-MM-DD'),
                'journal_id': 1,
                'currency_id': 1,
                'invoice_user_id': 2,
                'invoice_incoterm_id': false,
                'tax_lock_date_message': false,
                'id': false,
                'invoice_payment_state': 'not_paid',
                'invoice_filter_type_domain': 'sale',
                'company_currency_id': 5,
                'commercial_partner_id': '',
                'invoice_has_outstanding': false,
                'l10n_ch_currency_name': 'CHF',
                'invoice_sequence_number_next_prefix': false,
                'invoice_sequence_number_next': false,
                'invoice_has_matching_suspense_amount': false,
                'has_reconciled_entries': false,
                'restrict_mode_hash_table': false,
                'partner_id': client_id,
                'invoice_vendor_bill_id': false,
                'invoice_payment_term_id': 1,
                'invoice_date_due': moment(date).format('YYYY-MM-DD'),
                'company_id': 1,
                'amount_untaxed': 0,
                'amount_by_group': [],
                'amount_total': 0,
                'invoice_payments_widget': 'False',
                'amount_residual': 0,
                'invoice_outstanding_credits_debits_widget': false,
                'invoice_origin': false,
                'invoice_cash_rounding_id': false,
                'invoice_source_email': false,
                'invoice_payment_ref': false,
                'reversed_entry_id': false,
                'message_follower_ids': [],
                'activity_ids': [],
                'message_ids': [],
                'message_attachment_count': 0,
                'invoice_line_ids': [],
                "account_id": 7,
                "reference": false,
                "fiscal_position_id": false,
                "origin": false,
                "reference_type":"none",
                "incoterm_id":false,
                "sequence_number_next":false,
                "partner_shipping_id":client_id,
                "payment_term_id":false,
            }];

            odoo_data[0].invoice_line_ids.push(
                [
                    0,
                    'virtual_' + (Math.floor(100 + Math.random() * 900)).toString(),
                    {
                        "account_analytic_id":false,
                        'account_id': 17,  //103
                        "currency_id":1,
                        'discount': 0,
                        'display_type': false,
                        'is_rounding_line': false,
                        'name': "Service total",
                        'origin': false,
                        'price_unit': parseFloat(amount),
                        'product_id': 1,  //2
                        'quantity': 1,
                        'sequence': 10,
                        "uom_id":1,
                        'invoice_line_tax_ids': [
                            [
                                6,
                                false,
                                [3]
                            ]
                        ],
                        'analytic_tag_ids': [
                            [
                                6,
                                false,
                                []
                            ]
                        ],
                    }
                ]
            );

            SmartService.create_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { data: odoo_data }).then(createFactRes => {

                if (createFactRes.succes === true && createFactRes.status === 200) {

                    SmartService.generate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),createFactRes.data.id,acces_token).then(genFactRes => {
                        if (genFactRes.succes === true && genFactRes.status === 200) {
                            resolve(genFactRes.data.pdf)
                        } else {
                            console.log(genFactRes.error)
                            reject(genFactRes.error)
                        }

                    }).catch(err => {
                        console.log(err)
                        reject(err)
                    })

                } else {
                    console.log(createFactRes.error)
                    reject(createFactRes.error)
                }
            }).catch(err => {
                console.log(err)
                reject(err)
            })

        })



    }


    componentDidMount() {

        SmartService.getGedInfo(localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(infoRes => {
            if((infoRes.status === 400 || infoRes.status === 403) && infoRes.succes === false){
                localStorage.clear()
                window.reload()
            }
        }).catch(err => {
            localStorage.clear()
            window.location.reload()
        })

        if(localStorage.getItem("token") === null || localStorage.getItem("token") === undefined ) {
            this.props.history.push("/login")
        }else{


            rethink.getTableData(db_name,"test","clients_cases").then( rr => {
                this.setState({clients_cases:rr})
            }).catch(err => {
                console.log(err)
            })
            this.getTableChanges('test',db_name,'table("clients_cases")',"clients_cases");

            rethink.getTableData(db_name,"test","compta_fournisseurs").then( rr => {
                this.setState({compta_fournisseurs:rr})
            }).catch(err => {
                console.log(err)
            })
            this.verifIsTableExist("compta_fournisseurs").then( v => {
                this.getTableChanges('test',db_name,'table("compta_fournisseurs")',"compta_fournisseurs");
            })

            rethink.getTableData(db_name,"test","annuaire_clients_mandat").then( rr => {
                this.setState({annuaire_clients_mandat:rr})
            }).catch(err => {
                console.log(err)
            })
            this.getTableChanges('test',db_name,'table("annuaire_clients_mandat")',"annuaire_clients_mandat");

            rethink.getTableData(db_name,"test","contacts").then( rr => {
                this.setState({contacts:rr})
            }).catch(err => {
                console.log(err)
            })
            this.getTableChanges('test',db_name,'table("contacts")',"contacts");

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

    getChatChanges(ust_token, db, table) {

        let socket = new WebSocket("wss://api.smartdom.ch/ws/" + ust_token);

        socket.onopen = (e) => {
            let payload;
            payload = {"cmd": table, "db": db, "read_change": true}
            socket.send(JSON.stringify(payload));
        };


        socket.onmessage = (event) => {

            let data = this.state.messages || [];
            let recieve = JSON.parse(event.data);
            //insert
            if (recieve.new_val && !data.find(x => x.uid === recieve.new_val.uid) ) {
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
            return true;
        }else{
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

    update_bot_data(bot_name,value){
        let s_bot = this.state[bot_name];
        let current_bot_question  = s_bot.questions.find(x => x.id === s_bot.currentQuest)
        if(current_bot_question.data_title !== false){
            let data = this.state.bot_recovered_data;
            data[current_bot_question.data_title] = value
            this.setState({bot_recovered_data:data})

            if(bot_name === "bot_saisie_fact"){
                if(current_bot_question.data_title === "montant_facture"){
                    this.executeBot("bot_saisie_fact",this.state.bot_saisie_fact,2)
                }
                if(current_bot_question.data_title === "type_facture"){
                    this.executeBot("bot_saisie_fact",this.state.bot_saisie_fact,3)
                }
                if(current_bot_question.data_title === "date_facture"){
                    this.executeBot("bot_saisie_fact",this.state.bot_saisie_fact,4)
                }
            }
        }

    }

    addNewMessage(text,bot_name) {
        if (text.trim() !== "") {

            if(this.state.is_bot_active === true){
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
                this.update_bot_data(bot_name,newItem.text)
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

    addTmp_B64File(b64,name,sender){
        let newItem = {
            uid:utilFunctions.getUID(),
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            room_id: this.state.room.id,
            sender: {
                email:sender
            },
            type: "ged_file",
            b64:b64,
            name:name,
        }
        let msgs = this.state.messages || [];
        msgs.push(newItem)
        this.setState({messages:msgs})
        setTimeout(() => {
            this.scrollToBottom()
        },250)
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

    addTmp_B64Image(b64,name,sender){
        let newItem = {
            uid:utilFunctions.getUID(),
            text: b64,
            name: name,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            room_id: this.state.room.id,
            sender: {
                email: sender
            },
            type: "image",
            tagged_to: "false"
        }
        let msgs = this.state.messages || [];
        msgs.push(newItem)
        this.setState({messages:msgs})
    }

    upload_fact = async (fact) => {


        let factToUpload = fact.target.files[0];

        if (factToUpload.type === "application/pdf") {
            let b64 = await utilFunctions.toBase64(factToUpload)
            this.addTmp_B64File(b64.replace("data:application/pdf;base64,",""),factToUpload.name,localStorage.getItem("email"))

            this.start_loading_bot()
            setTimeout(() => {
                this.scrollToBottom();
            },200)

            let name= factToUpload.name;
            let array_name = name.split(".");
            array_name.splice(array_name.length -1,1)

            let pars_formated_date = moment(array_name[4],"DD-MM-YYYY");
            let pars_amount = array_name[5];

            console.log(array_name.length)
            console.log(parseFloat(pars_amount.replace(",",".")))

            if(array_name.length === 6 && !isNaN(parseFloat(pars_amount.replace(",","."))) && pars_formated_date.isValid()  ){
                if(array_name[2] === "FF"){
                    // facture fournisseur
                    let pars_client = array_name[0].trim().toLowerCase();
                    let pars_case = array_name[1].trim().toLowerCase();
                    let pars_s_case = array_name[2].trim().toLowerCase();
                    let pars_fournisseur = array_name[3].trim().toLowerCase();


                    let clients = this.state.annuaire_clients_mandat || [];
                    let clients_cases = this.state.clients_cases || [];

                    let find_client = clients.find(x => x.societyName.trim().toLowerCase() === pars_client)
                    if(find_client){
                        let find_client_case = clients_cases.find(x => x.ID_client === find_client.ID)
                        if(find_client_case){
                            let find_client_folder = (find_client_case.folders || []).find( x => x.name.trim().toLowerCase() === pars_case)
                            if(find_client_folder){

                                SmartService.getFile(find_client_folder.folder_id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(async folderRes => {

                                    if (folderRes.succes === true && folderRes.status === 200) {

                                        let content = folderRes.data.Content.folders || [];
                                        let findFF_folder = content.find(x => x.name === "Compta fournis.");

                                        if(findFF_folder){

                                            let compta_fournisseurs = this.state.compta_fournisseurs || [];
                                            let find_fourniss = compta_fournisseurs.find( x => x.name.trim().toLowerCase() === pars_fournisseur)
                                            if(find_fourniss){

                                                let b64 = await this.generateOdooFacture(pars_formated_date.format("YYYY-MM-DD"),find_client_case.odoo_client_id,parseFloat(pars_amount.replace(",",".")))
                                                let data = this.state.bot_recovered_data
                                                data["client"] = {label:find_fourniss.name};
                                                data['facture_b64'] = b64
                                                this.stop_loading_bot()
                                                await this.executeBot("bot_upload_fact",this.state.bot_upload_fact,3)

                                            }else{
                                                let new_fourniss_name = array_name[3];
                                                SmartService.addFolder({name:new_fourniss_name,folder_id:findFF_folder.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes => {

                                                    if (addFolderRes.succes === true && addFolderRes.status === 200) {

                                                        this.verifIsTableExist("compta_fournisseurs").then( v => {
                                                            let newItem = {
                                                                created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                                                                created_by:localStorage.getItem("email"),
                                                                name:new_fourniss_name,
                                                                inside_folder_id:findFF_folder.id,
                                                                folder_id:addFolderRes.data.id
                                                            }
                                                            rethink.insert("test", 'table("compta_fournisseurs").insert(' + JSON.stringify(newItem) + ')', db_name, false).then( async resAdd => {
                                                                if (resAdd && resAdd === true) {
                                                                    console.log("fourniss added")

                                                                    let b64 = await this.generateOdooFacture(pars_formated_date.format("YYYY-MM-DD"),find_client_case.odoo_client_id,parseFloat(pars_amount.replace(",",".")))
                                                                    let data = this.state.bot_recovered_data
                                                                    data["client"]["label"] = new_fourniss_name;
                                                                    data['facture_b64'] = b64
                                                                    this.stop_loading_bot()
                                                                    await this.executeBot("bot_upload_fact",this.state.bot_upload_fact,3)

                                                                } else {
                                                                    console.log("Erreur add fourniss !")
                                                                }
                                                            }).catch(err => {
                                                                console.log(err)
                                                            })
                                                        });

                                                    }else{

                                                    }
                                                }).catch( err => {
                                                    console.log(err)
                                                })


                                            }


                                        }else{

                                        }

                                    }else{

                                    }



                                }).catch( err => {
                                    console.log(err)
                                })


                            }else{

                            }
                        }else{

                        }
                    }else{

                    }
                }
            }
            else{
                setTimeout(() => {
                    this.stop_loading_bot()
                    this.executeBot("bot_upload_fact",this.state.bot_upload_fact,1)
                },1500)

            }


        }else{
            setTimeout(() => {
                this.stop_loading_bot()
                this.executeBot("bot_upload_fact",this.state.bot_upload_fact,1)
            },1500)
        }

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
                    name:imgToUpload.name,
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

    downloadB64File(name,b64){
        let a = document.createElement('a');
        a.href = 'data:application/pdf;base64,' + b64;
        a.download = name;
        a.click();
    }

    onClickAction(event,action){
        this.setState({openSpeedDial:false})
        if(action.name === "Images"){
            this.imageUpload.click()
        }else if(action.name === "Documents"){
            this.setState({anchorElFiles: event.currentTarget})
        }else if(action.name === "Signer"){
            this.setState({anchorElToSignFile:event.currentTarget})
        }else if(action.name === "ChatBot"){

            this.executeBot("initial_bot",this.state.initial_bot,0)


            /*if(this.state.procurationData.client !== ""){
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
            }
            else{
                setTimeout(() => {
                    this.beginBot()
                },500)
            }*/
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
            },
                {
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
                }
                )
        this.setState({messages:msgs})
        setTimeout(()=> {
            this.scrollToBottom();
        },250)
    }

    async executeBot(bot_name,bot,question_id){
        this.setState({anchorElMsgMenu:null})
        let s_bot = bot
        s_bot.currentQuest = question_id;
        this.setState({[bot_name]:s_bot})
        let msgs = this.state.messages || [];
        let find_question = s_bot.questions.find(x => x.id === question_id)
        if(find_question){
            this.start_loading_bot()
            setTimeout(() => {
                this.scrollToBottom();
            },200)
            await find_question.action_before()
            this.stop_loading_bot()
            msgs.push({
                created_at: moment().format("YYYY-MM-DD HH:mm:ss") ,
                id: utilFunctions.getUID() ,
                room_id: this.state.room.id ,
                text: find_question.question ,
                type: "text",
                sender:{
                    email:"ChatBot"
                }
            })
            this.setState({messages:msgs})

            setTimeout(async ()=> {
                this.scrollToBottom();

                if(find_question.suggestions.type !== "text"){

                    if(find_question.suggestions.type === "date"){
                        setTimeout(() => {
                            this.datePickerRef.click()
                        },700)
                    }
                    else if(find_question.suggestions.type === "upload_fact"){
                        setTimeout(() => {
                            this.fact_upload.click()
                        },500)
                    }
                    else{
                        setTimeout(() => {
                            msgs.push({
                                created_at: moment().format("YYYY-MM-DD HH:mm:ss") ,
                                id: utilFunctions.getUID() ,
                                room_id: this.state.room.id ,
                                text: "",
                                type: find_question.suggestions.type,
                                sender:{
                                    email:"ChatBot"
                                },
                                extra:find_question
                            })
                            this.setState({messages:msgs})
                            setTimeout(() => {this.scrollToBottom()},250)

                        },200)
                    }
                }
                else{
                    if(find_question.action_after){
                        console.log("action after")
                        this.start_loading_bot()
                        setTimeout(() => {
                            this.scrollToBottom();
                        },200)
                        await find_question.action_after();
                        this.stop_loading_bot()
                    }
                }
            },250)

            //this.setState({messages:msgs})


            /*msgs.push({
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
            },250)*/

        }else{

        }
    }

    start_loading_bot(timeout){
        let msgs = this.state.messages;
        msgs.push({
            id:"loading",
            type: "loading",
            sender:{
                email:"ChatBot"
            }
        })
        this.setState({messages:msgs})

        if(timeout && timeout > 100){
            setTimeout(() => {
                let find = msgs.findIndex(x => x.id === "loading");
                msgs.splice(find,1)
                this.setState({messages:msgs})
            },timeout)
        }
    }

    stop_loading_bot(){
        let msgs = this.state.messages;
        let find = msgs.findIndex(x => x.id === "loading");
        msgs.splice(find,1)
        this.setState({messages:msgs})
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

    markAsfacture(type){
        let selected = this.state.selectedMsg;

        if(selected.type === "image"){

            this.executeBot("bot_saisie_fact",this.state.bot_saisie_fact,0)

            /*let current_room = this.state.room;
            let room_tasks = current_room.tasks || [];
            let user_email = localStorage.getItem("email")
            let findClientByEmail = this.state.annuaire_clients_mandat.find(x => x.email === user_email);
            if(findClientByEmail){
                let find_client_task = room_tasks.find(x => x.client === findClientByEmail.id)
                let find_client_task_index = room_tasks.findIndex(x => x.client === findClientByEmail.id)
                if(find_client_task){
                    this.setState({anchorElMsgMenu:null,loadingCall:true})
                    let task_files = find_client_task.files || [];
                    let team_validation = [];
                    (current_room.tasks[find_client_task_index].team || []).map((t,key) => {
                        team_validation.push({
                            id:t.id,
                            email:t.email,
                            validation:"false"
                        })
                    })
                    task_files.push({
                        added_at:moment().format("YYYY-MM-DD HH:mm:ss"),
                        added_by:{
                            email:localStorage.getItem("email"),
                            id:findClientByEmail.id,
                            type:"client"
                        },
                        leader_validation:"false",
                        team_validation:team_validation,
                        type:type,
                        b64:selected.text,
                        name:selected.name || ""
                    })
                    find_client_task.files = task_files;
                    current_room.tasks[find_client_task_index] = find_client_task;
                    rethink.update("test",'table("rooms").get('+JSON.stringify(current_room.id)+').update('+ JSON.stringify(current_room) + ')',db_name,false).then( updateRes => {
                        if (updateRes && updateRes === true) {
                            this.setState({loadingCall:false})
                            this.openSnackbar("success","Votre image est bien marquée comme facture !")
                        } else {
                            this.setState({loadingCall:false})
                            this.openSnackbar("error","une erreur est survenue ! Veuillez réessayer ultérieurement ")
                        }
                    }).catch(err => {console.log(err)})

                }else{
                    this.setState({loadingCall:false})
                    this.openSnackbar("error","Aucune tache est encore attribué à votre compte, veuillez réessayer ultérieurement")
                }
            }else{
                this.setState({loadingCall:false})
                this.openSnackbar("error","Vous n'avez pas le droit d'effectuer cette opération !")
            }*/

        }else{
            this.setState({loadingCall:false})
            this.openSnackbar("error","Vous pouvez marquer seulement des images comme une facture...")
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


        //console.log(this.state.bot_recovered_data)

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
                                <div className="contact-profile">
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
                                </div>
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
                                                                                             msg.id_in_ged ? this.downloadFile(msg.id_in_ged) : this.downloadB64File(msg.name,msg.b64)
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
                                                                msg.type === "loading" ?
                                                                    <div style={{backgroundColor:"#fff",borderRadius: 7.5,
                                                                        display: "inline-block",maxWidth:45}}>
                                                                        <img alt="" src={require("../../assets/images/gif/loading3.gif")} style={{width:45,height:40,marginTop:-3}}/>
                                                                    </div> :

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
                                                                                             msg.id_in_ged ? this.downloadFile(msg.id_in_ged) : this.downloadB64File(msg.name,msg.b64)
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
                                                                            </div> :

                                                                            msg.type === "buttons" ?
                                                                            <div style={{
                                                                                backgroundColor: "#f5f5f5",
                                                                                padding: "3px",
                                                                                borderRadius: 7.5,
                                                                                display: "inline-block",
                                                                                marginBottom:15,
                                                                                maxWidth:"100%"
                                                                            }}
                                                                            >
                                                                                {
                                                                                    (msg.extra.suggestions.responses || []).map((resp,key) => (
                                                                                        <div style={{margin:10}}>
                                                                                            <AtlButton
                                                                                                onClick={() => {
                                                                                                    resp.selected = true;
                                                                                                    let updX = this.state.updateScreen
                                                                                                    this.setState({updateScreen:!updX})
                                                                                                    setTimeout(() => {
                                                                                                        resp.onClick()
                                                                                                    },400)
                                                                                                }}
                                                                                                appearance="default"
                                                                                                //isSelected={resp.selected && resp.selected === true }
                                                                                                //iconAfter={resp.selected && resp.selected === true ? <CheckIcon fontSize="small" color="secondary"/> : null}

                                                                                            >
                                                                                                {resp.text}
                                                                                            </AtlButton>
                                                                                        </div>
                                                                                    ))
                                                                                }
                                                                            </div> :

                                                                                msg.type === "select" ?
                                                                                    <div style={{
                                                                                        backgroundColor: "#f5f5f5",
                                                                                        padding: "5px",
                                                                                        borderRadius: 7.5,
                                                                                        marginBottom:15}}
                                                                                    >

                                                                                        <Select
                                                                                            formatOptionLabel={formatOptionLabel}
                                                                                            options={this.state.oddo_clients || []}
                                                                                            placeholder="Sélectionner"
                                                                                            onChange={value => {msg.extra.suggestions.onSelect(value)}}
                                                                                        />

                                                                                    </div> :

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

                                                            <input style={{visibility: 'hidden', width: 0, height: 0}}
                                                                   type='file' accept='.pdf'
                                                                   onChange={(files) => this.upload_fact(files)}
                                                                   ref={(ref) => this.fact_upload = ref}
                                                            />

                                                        </li>
                                                    </div>

                                            ))
                                        }
                                    </ul>
                                </div>


                                {
                                    this.state.showTaggedMsgForm === true &&  this.renderMsgResponseForm()

                                }


                                <div style={{backgroundColor:"#f0f0f0",position:"absolute",bottom:0,height:60,width:"100%",display:"flex"}}>

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
                                                           this.addNewMessage(this.state.text,"bot_saisie_fact")
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


                <DatePicker
                    id="datePicker-1"
                    ref={(ref) => this.datePickerRef = ref}
                    value={new Date()}
                    onChange={value => {
                        console.log(value)
                        setTimeout(() => {
                            this.addNewMessage(moment(value).format("YYYY-MM-DD"),"bot_saisie_fact")
                        },400)
                    }}
                    label=""
                    formatStyle="small"
                    locale="fr-Fr"
                    style={{display:"none"}}
                    isCentered={true}
                />

                <DarkBackground disappear={this.state.loadingCall}>
                    <LoadingOverlay
                        style={{top:250}}
                        active={true}
                        spinner={true}
                        text='Opération en cours...'
                    >
                    </LoadingOverlay>
                </DarkBackground>


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
                    <Paper style={{width:260}}>
                        <MenuList id="menu-list-grow">
                                <MenuItem style={{minHeight:40}}
                                          onClick={() => {
                                              this.setState({showTaggedMsgForm:true,anchorElMsgMenu:null,taggedMsg:this.state.selectedMsg})
                                          }}
                                >
                                    Répondre
                                </MenuItem>
                                <MenuItem style={{minHeight:40}} onClick={() => {}}>Marquer comme important</MenuItem>
                                <MenuItem style={{minHeight:40}} onClick={() => {}}>Marquer comme BdC</MenuItem>
                                <MenuItem style={{minHeight:40}} onClick={() => {}}>Marquer comme devis</MenuItem>
                                <MenuItem style={{minHeight:40}} onClick={() => {this.markAsfacture("whatsus_tag_facture")}}
                                >
                                    Marquer comme facture
                                </MenuItem>
                                <MenuItem style={{minHeight:40}} onClick={() => {this.markAsfacture("whatsus_tag_facture_fourniss")}}>Marquer comme facture fourniss.</MenuItem>
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
                                /*allowDrop={(options) => {
                                    return false
                                }}*/
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
                                onContextMenu={event => {
                                    event.preventDefault()
                                    console.log(event.node)
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
