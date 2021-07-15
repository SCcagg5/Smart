import React from "react";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-date-picker";
import calendar from "../../assets/icons/calendar_icon.jpg";
import france from "../../assets/images/flags/france.png";
import suisse from "../../assets/images/flags/suisse.png";
import tunisie from "../../assets/images/flags/tunisie.png";
import {Button, Label} from "reactstrap";
import utilFunctions from "../../tools/functions";
import {IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {Dropdown, Input} from "semantic-ui-react";
import Data from "../../data/Data";
import moment from "moment";
import DocGenerationService from "../../provider/DocGenerationService";
import rethink from "../../controller/rethink";
import SmartService from "../../provider/SmartService";

const db_name = process.env.REACT_APP_RETHINKDB_BEGIN_NAME;

export default function AugmCapital(props){

    const [selected_soc, setSelected_soc] = React.useState(props.societies.length > 0 ? props.societies[0] : "");
    const [date_ass, setDate_ass] = React.useState(null);
    const [agio, setAgio] = React.useState("");
    const [typeAugCapital, setTypeAugCapital] = React.useState("1");
    const [cessionAction, setCessionAction] = React.useState("1");
    const [cessionAssignor, setCessionAssignor] = React.useState(props.societies[0].associes[0].id);
    const [cession_actions, setCession_actions] = React.useState();
    const [totalNewCessionActionsEmis, setTotalNewCessionActionsEmis] = React.useState(0);

    const [primeEmission, setPrimeEmission] = React.useState();
    const [newAssocies, setNewAssocies] = React.useState([]);
    const [newAssociesValidated, setNewAssociesValidated] = React.useState([]);
    const [totalNewActionsEmis, setTotalNewActionsEmis] = React.useState(0);
    const [updateScreen, setUpdateScreen] = React.useState(false);

    let associes = selected_soc.associes || [];


    const addNewAssocie = () => {
        console.log("add actio")
        let objCopy = newAssocies;
        objCopy.push(
            {
                id: utilFunctions.getUID(),
                email: '',
                pwd: Math.random().toString(36).substr(2, 5),
                phone: '',
                type: 'Un particulier',
                civility: 'M.',
                firstname: '',
                lastname: '',
                adress: '',
                postalCode: '',
                pays: 'France',
                ville: '',
                birthday: '',
                nationality: 'française',
                origine: "",
                isAdministrator: 'false',
                nbActions: '',
                representant: {
                    rep_firstname: '',
                    rep_lastname: '',
                },
                ej_name: '',
                formeSocial: 'SARL',
                typeTmp: 'Un particulier',
                walletAdr: "",
                identityCardNum: '',
                identityCardDate: '',
                passeportNum: '',
                passeportDate: '',
                immatriculation: '',
                numSiret: '',
                capitalSocial: '',
                capitalSocialCurrency: 'TND'
            }
        );
        setNewAssocies(objCopy)
        setUpdateScreen(!updateScreen)
    };

    const handle_newAssoc_aoc = (array, key, name) => event => {
        console.log(event.target.value)
        let objCopy = newAssocies;
        objCopy[key][name] = event.target.value;
        setNewAssocies(objCopy)
        setUpdateScreen(!updateScreen)
    }

    const handleTypeTmpChange = (key, value) => {
        let actiosCopy = newAssocies;
        actiosCopy[key].typeTmp = value;
        setNewAssocies(actiosCopy)
        setUpdateScreen(!updateScreen)
    };

    const handleOnChangePhone = (value, key) => {
        let objCopy = newAssocies;
        objCopy[key].phone = value;
        setNewAssocies(objCopy)
        setUpdateScreen(!updateScreen)
    };

    const validate_augmCapital1 = () => {

        props.setLoading(true)

        let augmCapital_uid =utilFunctions.getUID();

        let last_rep_parts = [];
        selected_soc.associes.map( item => {
            let actio_desc = ""
            if(item.typeTmp === "Un particulier"){
                actio_desc = item.civility + " " + item.firstname + " " + item.lastname
            }else{
                actio_desc = "La société " + " " + item.ej_name
            }
            last_rep_parts.push({actio_desc:actio_desc,nbActions:item.nbActionsHistory && item.nbActionsHistory.length > 0 ? item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions : item.nbActions})
        })

        let associes = selected_soc.associes || [];
        let newActionsEmis = 0;
        let details_new_parts = [];
        let apports_capital = [];

        associes.map( (item,key) => {
            if (item.nbNewActions && item.nbNewActions !== "" && !isNaN(parseInt(item.nbNewActions))) {
                newActionsEmis = newActionsEmis + parseInt(item.nbNewActions)
                item.isOld = "true"
                details_new_parts.push({
                    isOld:"true",
                    actio_id:item.id,
                    actio_email:item.email,
                    nb_actions_before:parseInt(item.nbActions),
                    nb_actions_after:parseInt(item.nbActions) + parseInt(item.nbNewActions),
                    include_in_augm:"true"
                })
            }else{
                details_new_parts.push({
                    isOld:"true",
                    actio_id:item.id,
                    actio_email:item.email,
                    nb_actions_before:parseInt(item.nbActions),
                    nb_actions_after:parseInt(item.nbActions),
                    include_in_augm:"false"
                })
            }
        })
        newAssociesValidated.map( item => {
            if (item.nbNewActions && item.nbNewActions !== "" && !isNaN(parseInt(item.nbNewActions))) {
                newActionsEmis = newActionsEmis + parseInt(item.nbNewActions)
                item.isOld = "false"
                details_new_parts.push({
                    isOld:"false",
                    actio_id:item.id,
                    actio_email:item.email,
                    nb_actions_before:0,
                    nb_actions_after:parseInt(item.nbNewActions),
                    include_in_augm:"true"
                })
            }
        })

        let all_actios = associes.concat(newAssociesValidated);
        let signers = []

        all_actios.map( (item,key) =>  {
            let label = ""
            let nbActionsHistory = item.nbActionsHistory || [];
            if(item.typeTmp === "Un particulier"){
                label = item.firstname + " " +item.lastname;
                signers.push({fname:label})
            }else{
                label = "La société " + item.ej_name + " répresenté par " + item.representant.rep_firstname + " " + item.representant.rep_lastname
                signers.push({fname:label})
            }
            if (item.nbNewActions && item.nbNewActions !== "" && !isNaN(parseInt(item.nbNewActions))) {
                let nb_parts = item.nbActionsHistory && item.nbActionsHistory.length > 0 ? item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions : parseInt(item.isOld && item.isOld === "false" ? item.nbNewActions : item.nbActions)
                apports_capital.push({
                    num_part_word:utilFunctions.numberToWord(key+1),
                    actio_desc:item.typeTmp === "Un particulier" ? (item.civility + " " + item.firstname + " " + item.lastname) : "La société " + item.ej_name,
                    nb_parts:nb_parts + parseInt(item.nbNewActions),
                    montant:(nb_parts + parseInt(item.nbNewActions)) * parseFloat(selected_soc.capital.valeurAction)
                })
                nbActionsHistory.push({
                    nbActions:(item.nbActionsHistory && item.nbActionsHistory.length > 0) ? (item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions + parseInt(item.nbNewActions))  : parseInt(item.nbNewActions) + parseInt(item.isOld && item.isOld === "false" ? "0" : item.nbActions),
                    valeurAction:selected_soc.capital.valeurAction,
                    augmCapital_uid:augmCapital_uid
                })
                item.nbActionsHistory = nbActionsHistory
            }

            if(item.isOld === "false"){
                item.nbActions = item.nbNewActions
            }
        })

        let newAugmCapital = {
            uid:augmCapital_uid,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            created_by: localStorage.getItem("email"),
            date_ass: date_ass ? moment(date_ass).format("YYYY-MM-DD HH:mm:ss") : moment().format("YYYY-MM-DD HH:mm:ss"),
            agio: agio,
            typeAugCapital: typeAugCapital === "0" ? "primeEmission" : "normal",
            valeurAction: selected_soc.capital.valeurAction,
            nbNewActionsEmis: newActionsEmis,
            details_new_parts:details_new_parts
        }

        let current_capital = selected_soc.capitalHistory && selected_soc.capitalHistory.length > 0 ? selected_soc.capitalHistory[selected_soc.capitalHistory.length -1].capital : parseFloat(selected_soc.capital.totalCapital)
        let totalActions = current_capital / parseFloat(selected_soc.capital.valeurAction);
        let augm_amount = newActionsEmis * parseFloat(selected_soc.capital.valeurAction);


        let generation_data = {
            "data":{
                sName:selected_soc.name,
                capital:selected_soc.capitalHistory && selected_soc.capitalHistory.length > 0 ? selected_soc.capitalHistory[selected_soc.capitalHistory.length -1].capital : selected_soc.capital.totalCapital,
                sAdress:selected_soc.siege.adress + ", " + selected_soc.siege.ville + ", " + selected_soc.siege.codePostal + " " + selected_soc.pays,
                ass_date:moment(date_ass).format("DD MMMM YYYY"),
                gerant_fname:selected_soc.gerants[0].firstname + " " + selected_soc.gerants[0].lastname,
                nb_parts_total:totalActions,
                nb_new_parts_total:totalActions + newActionsEmis,
                montant_augm:augm_amount,
                capital_after_augm:current_capital + augm_amount,
                bank_name:"AMEN BANK",
                bank_desc:"AMEN BANK, Agence Sfax nord",
                valeurAction:selected_soc.capital.valeurAction,
                capital_used_bank_date:"24 Juin 2021",
                associes:signers,
                rep_parts:last_rep_parts,
                apports_capital:apports_capital

            }
        }

        let augmCapitalArray = selected_soc.augmCapital || [];
        let capitalHistory = selected_soc.capitalHistory || [];

        //clear inputs
        all_actios.map( item => {
            if(item.nbNewActions) item.nbNewActions = ""
        })
        augmCapitalArray.push(newAugmCapital)
        capitalHistory.push({
            capital:capitalHistory.length > 0 ? capitalHistory[capitalHistory.length -1].capital +augm_amount : parseFloat(selected_soc.capital.totalCapital) + augm_amount,
            valeurAction:selected_soc.capital.valeurAction,
            nbActions: capitalHistory.length > 0 ? capitalHistory[capitalHistory.length -1].nbActions + newActionsEmis : totalActions + newActionsEmis,
            augmCapital_uid:augmCapital_uid
        })
        let item = selected_soc
        item.capitalHistory = capitalHistory
        item.associes = all_actios

        setTimeout(() => {
            DocGenerationService.generate_TN_AugmCapitalNormal(generation_data).then( async genRes => {
                if(genRes && genRes.data){

                    let saveDocRes = await saveAugmDocs(genRes.data,"Augm_Capital_"+moment().format("DD-MM-YYYY HH:mm"))
                    if(saveDocRes && saveDocRes.uid){

                        augmCapitalArray[augmCapitalArray.length -1].idDoc = saveDocRes.uid
                        item.augmCapital = augmCapitalArray;

                        rethink.update("test",'table("societies").get('+JSON.stringify(selected_soc.id)+').update('+ JSON.stringify(item) + ')',db_name,false).then( updateRes => {
                            if(updateRes && updateRes === true){
                                setNewAssociesValidated([])
                                setUpdateScreen(!updateScreen)
                                props.setLoading(false)
                                props.openSnackbar('success', 'Augmentation de capital effectuée avec succès');
                                setTimeout(() => {
                                    props.openPdf(genRes.data,"Augm_capital"+moment().format("DD-MM-YYYY"),"pdf")
                                },500)
                            }else{
                                props.setLoading(false)
                                props.openSnackbar("error","Une erreur est survenue !")
                            }
                        }).catch(err => {
                            props.setLoading(false)
                            console.log(err)
                            props.openSnackbar("error","Une erreur est survenue !")
                        })
                    }else{
                        props.setLoading(false)
                        props.openSnackbar("error","Une erreur est survenue lors de l'enregistrement de document !")
                    }

                }else{
                    props.setLoading(false)
                    props.openSnackbar("error","Une erreur est survenue lors de la génération de document !")
                }
            }).catch(err => {
                console.log(err)
                props.setLoading(false)
                props.openSnackbar("error","Une erreur est survenue lors de la génération de document !")
            })
        },500)

    }


    const validate_augmCapital2 = () => {

        props.setLoading(true)

        let augmCapital_uid =utilFunctions.getUID();

        let last_rep_parts = [];
        selected_soc.associes.map( item => {
            let actio_desc = ""
            if(item.typeTmp === "Un particulier"){
                actio_desc = item.civility + " " + item.firstname + " " + item.lastname
            }else{
                actio_desc = "La société " + " " + item.ej_name
            }
            last_rep_parts.push({actio_desc:actio_desc,nbActions:item.nbActionsHistory && item.nbActionsHistory.length > 0 ? item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions : item.nbActions})
        })

        let associes = selected_soc.associes || [];
        let newActionsEmis = 0;
        let details_new_parts = [];
        let apports_capital = [];

        associes.map( (item,key) => {
            let actio_nb_actions = item.nbActionsHistory && item.nbActionsHistory.length > 0 ? item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions :parseInt(item.nbActions)
            if (item.nbNewActions && item.nbNewActions !== "" && !isNaN(parseInt(item.nbNewActions))) {
                newActionsEmis = newActionsEmis + parseInt(item.nbNewActions)
                item.isOld = "true"
                details_new_parts.push({
                    isOld:"true",
                    actio_id:item.id,
                    actio_email:item.email,
                    nb_actions_before:actio_nb_actions,
                    nb_actions_after: actio_nb_actions + parseInt(item.nbNewActions)
                })
            }else{
                details_new_parts.push({
                    isOld:"true",
                    actio_id:item.id,
                    actio_email:item.email,
                    nb_actions_before:actio_nb_actions,
                    nb_actions_after:actio_nb_actions,
                    include_in_augm:"false"
                })
            }
        })
        let new_actios_desc = [];
        let new_actions_desc_profit = "au profit de ";

        newAssociesValidated.map( (item,key) => {
            if (item.nbNewActions && item.nbNewActions !== "" && !isNaN(parseInt(item.nbNewActions))) {
                newActionsEmis = newActionsEmis + parseInt(item.nbNewActions)
                item.isOld = "false"
                details_new_parts.push({
                    isOld:"false",
                    actio_id:item.id,
                    actio_email:item.email,
                    nb_actions_before:0,
                    nb_actions_after:parseInt(item.nbNewActions),
                    include_in_augm:"true"
                })
                let desc = "";
                if(item.typeTmp === "Un particulier"){
                    desc = item.civility + " " + item.firstname + " " + item.lastname +", de nationalité " + item.nationality;
                    new_actions_desc_profit = new_actions_desc_profit + (key === 0 ? item.civility + " " + item.firstname + " " + item.lastname :", " + item.civility + " " + item.firstname + " " + item.lastname )
                }else{
                    desc = "La société " + item.ej_name + ", avec un capital de " + item.capitalSocial + " " + item.capitalSocialCurrency + ", de nationalité " + (item.pays === "France" ? "française" :item.pays === "Switzerland" ? "Suisse" : "tunisienne") + ", représenté par " +
                        item.representant.rep_firstname + " " + item.representant.rep_lastname

                    new_actions_desc_profit = new_actions_desc_profit + (key === 0 ? item.ej_name :", " + item.ej_name + " " + item.lastname )
                }
                new_actios_desc.push({
                    actio_desc:desc
                })
            }
        })


        let all_actios = associes.concat(newAssociesValidated);
        let signers = []
        let new_parts = [];
        let rep_capital_final = [];
        all_actios.map( (item,key) =>  {
            let label = ""
            let nbActionsHistory = item.nbActionsHistory || [];
            if(item.typeTmp === "Un particulier"){
                label = item.firstname + " " +item.lastname;
                signers.push({fname:label})
            }else{
                label = "La société " + item.ej_name + " répresenté par " + item.representant.rep_firstname + " " + item.representant.rep_lastname
                signers.push({fname:label})
            }
            let nb_parts = item.nbActionsHistory && item.nbActionsHistory.length > 0 ? item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions : parseInt(item.isOld && item.isOld === "false" ? item.nbNewActions : item.nbActions)
            if (item.nbNewActions && item.nbNewActions !== "" && !isNaN(parseInt(item.nbNewActions))) {
                if(item.typeTmp === "Un particulier"){
                    new_parts.push({
                        actio_desc:item.civility + " " + item.firstname + " " + item.lastname,
                        nb_parts:item.nbNewActions
                    })
                }else{
                    new_parts.push({
                        actio_desc:"La société " + item.ej_name,
                        nb_parts:item.nbNewActions
                    })
                }

                nbActionsHistory.push({
                    nbActions:(item.nbActionsHistory && item.nbActionsHistory.length > 0) ? (item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions + parseInt(item.nbNewActions))  : parseInt(item.nbNewActions) + parseInt(item.isOld && item.isOld === "false" ? "0" : item.nbActions),
                    valeurAction:selected_soc.capital.valeurAction,
                    augmCapital_uid:augmCapital_uid
                })
                item.nbActionsHistory = nbActionsHistory;


                apports_capital.push({
                    num_part_word:utilFunctions.numberToWord(key+1),
                    actio_desc:item.typeTmp === "Un particulier" ? (item.civility + " " + item.firstname + " " + item.lastname) : "La société " + item.ej_name,
                    nb_parts:nb_parts + parseInt(item.nbNewActions),
                    montant:(nb_parts + parseInt(item.nbNewActions)) * parseFloat(selected_soc.capital.valeurAction)
                })

                rep_capital_final.push({
                    num_part_word:utilFunctions.numberToWord(key+1),
                    actio_desc:item.typeTmp === "Un particulier" ? (item.civility + " " + item.firstname + " " + item.lastname) : "La société " + item.ej_name,
                    nb_parts:nb_parts + (item.isOld && item.isOld === "false" ? 0 :parseInt(item.nbNewActions)) ,
                    montant:(nb_parts + (item.isOld && item.isOld === "false" ? 0 :parseInt(item.nbNewActions)) ) * parseFloat(selected_soc.capital.valeurAction)
                })

            }else{
                let nb_parts = item.nbActionsHistory && item.nbActionsHistory.length > 0 ? item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions : parseInt(item.isOld && item.isOld === "false" ? item.nbNewActions : item.nbActions)
                rep_capital_final.push({
                    num_part_word:utilFunctions.numberToWord(key+1),
                    actio_desc:item.typeTmp === "Un particulier" ? (item.civility + " " + item.firstname + " " + item.lastname) : "La société " + item.ej_name,
                    nb_parts:nb_parts,
                    montant:(nb_parts) * parseFloat(selected_soc.capital.valeurAction)
                })
            }

            /*if(item.isOld === "false"){
                item.nbActions = item.nbNewActions
            }*/
        })

        let newAugmCapital = {
            uid:augmCapital_uid,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            created_by: localStorage.getItem("email"),
            date_ass: date_ass ? moment(date_ass).format("YYYY-MM-DD HH:mm:ss") : moment().format("YYYY-MM-DD HH:mm:ss"),
            agio: agio,
            typeAugCapital: typeAugCapital === "0" ? "primeEmission" : "normal",
            primeEmission:primeEmission,
            valeurAction: selected_soc.capital.valeurAction,
            nbNewActionsEmis: newActionsEmis,
            details_new_parts:details_new_parts
        }

        let current_capital = selected_soc.capitalHistory && selected_soc.capitalHistory.length > 0 ? selected_soc.capitalHistory[selected_soc.capitalHistory.length -1].capital : parseFloat(selected_soc.capital.totalCapital)
        let totalActions = current_capital / parseFloat(selected_soc.capital.valeurAction);
        let augm_amount = newActionsEmis * parseFloat(selected_soc.capital.valeurAction);


        let nb_new_actios_desc = "";
        let new_actios_participate_word = ""
        if(newAssociesValidated.length >= 1){
            nb_new_actios_desc = (newAssociesValidated.length === 1 ? "d'" : "de ") + utilFunctions.numberToWord2(newAssociesValidated.length) + (newAssociesValidated.length === 1 ? " nouveau" : " nouveaux") + (newAssociesValidated.length === 1 ? " asscoié" : " associés")
            new_actios_participate_word = (newAssociesValidated.length === 1 ? "Le nouveau associé participera" : "les nouveaux associés particeperont")
        }

        let prime_emission_value = primeEmission && !isNaN(primeEmission) ? primeEmission : "0"
        let generation_data = {
            "data":{
                sName:selected_soc.name,
                capital:selected_soc.capitalHistory && selected_soc.capitalHistory.length > 0 ? selected_soc.capitalHistory[selected_soc.capitalHistory.length -1].capital : selected_soc.capital.totalCapital,
                sAdress:selected_soc.siege.adress + ", " + selected_soc.siege.ville + ", " + selected_soc.siege.codePostal + " " + selected_soc.pays,
                ass_date:moment(date_ass).format("DD MMMM YYYY"),
                gerant_fname:selected_soc.gerants[0].firstname + " " + selected_soc.gerants[0].lastname,
                nb_parts_total:totalActions,
                nb_new_parts_total:totalActions + newActionsEmis,
                montant_augm:augm_amount,
                capital_after_augm:current_capital + augm_amount,
                bank_name:"AMEN BANK",
                bank_desc:"AMEN BANK, Agence Sfax nord",
                valeurAction:selected_soc.capital.valeurAction,
                capital_used_bank_date:"24 Juin 2021",
                associes:signers,
                rep_parts:last_rep_parts,
                apports_capital:apports_capital,
                nb_new_actios_desc:nb_new_actios_desc,
                new_actios:new_actios_desc,
                newActionsEmis:newActionsEmis,
                total_prime_emission : newActionsEmis * parseFloat(prime_emission_value),
                new_actios_desc:new_actions_desc_profit,
                total_prime_augm:(newActionsEmis * parseFloat(prime_emission_value)) + (newActionsEmis * parseFloat(selected_soc.capital.valeurAction)),
                new_parts:new_parts,
                prime_emission:prime_emission_value,
                new_actios_participate_word:new_actios_participate_word,
                rep_capital_final:rep_capital_final,
                hasPrime:typeAugCapital === "0" && !isNaN(primeEmission)
            }
        }

        let augmCapitalArray = selected_soc.augmCapital || [];
        let capitalHistory = selected_soc.capitalHistory || [];

        //clear inputs
        all_actios.map( item => {
            if(item.nbNewActions) item.nbNewActions = ""
        })
        augmCapitalArray.push(newAugmCapital)
        capitalHistory.push({
            capital:capitalHistory.length > 0 ? capitalHistory[capitalHistory.length -1].capital +augm_amount : parseFloat(selected_soc.capital.totalCapital) + augm_amount,
            valeurAction:selected_soc.capital.valeurAction,
            nbActions: capitalHistory.length > 0 ? capitalHistory[capitalHistory.length -1].nbActions + newActionsEmis : totalActions + newActionsEmis,
            augmCapital_uid:augmCapital_uid
        })
        let item = selected_soc
        item.capitalHistory = capitalHistory
        item.associes = all_actios

        setTimeout(() => {
            DocGenerationService.generate_TN_AugmCapital_with_without_new_assoc(generation_data,newAssociesValidated.length > 0 ? "2" : "3").then( async genRes => {
                if(genRes && genRes.data){

                    let saveDocRes = await saveAugmDocs(genRes.data,"Augm_Capital_"+moment().format("DD-MM-YYYY HH:mm"))
                    if(saveDocRes && saveDocRes.uid){

                        augmCapitalArray[augmCapitalArray.length -1].idDoc = saveDocRes.uid
                        item.augmCapital = augmCapitalArray;

                        rethink.update("test",'table("societies").get('+JSON.stringify(selected_soc.id)+').update('+ JSON.stringify(item) + ')',db_name,false).then( updateRes => {
                            if(updateRes && updateRes === true){
                                setNewAssociesValidated([])
                                setUpdateScreen(!updateScreen)
                                props.setLoading(false)
                                props.openSnackbar('success', 'Augmentation de capital effectuée avec succès');
                                setTimeout(() => {
                                    props.openPdf(genRes.data,"Augm_capital"+moment().format("DD-MM-YYYY"),"pdf")
                                },500)

                            }else{
                                props.setLoading(false)
                                props.openSnackbar("error","Une erreur est survenue !")
                            }
                        }).catch(err => {
                            props.setLoading(false)
                            console.log(err)
                            props.openSnackbar("error","Une erreur est survenue !")
                        })
                    }else{
                        props.setLoading(false)
                        props.openSnackbar("error","Une erreur est survenue lors de l'enregistrement de document !")
                    }

                }else{
                    props.setLoading(false)
                    props.openSnackbar("error","Une erreur est survenue lors de la génération de document !")
                }
            }).catch(err => {
                console.log(err)
                props.setLoading(false)
                props.openSnackbar("error","Une erreur est survenue lors de la génération de document !")
            })
        },500)



    }


    const validate_augmCapital3 = () => {

        props.setLoading(true)

        let augmCapital_uid =utilFunctions.getUID();
        let cession_uid =utilFunctions.getUID();

        let last_rep_parts = [];
        selected_soc.associes.map( item => {
            let actio_desc = ""
            if(item.typeTmp === "Un particulier"){
                actio_desc = item.civility + " " + item.firstname + " " + item.lastname
            }else{
                actio_desc = "La société " + " " + item.ej_name
            }
            last_rep_parts.push({actio_desc:actio_desc,nbActions:item.nbActionsHistory && item.nbActionsHistory.length > 0 ? item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions : item.nbActions})
        })

        let associes = selected_soc.associes || [];
        let newActionsEmis = 0;
        let details_new_parts = [];
        let apports_capital = [];

        associes.map( (item,key) => {
            let actio_nb_actions = item.nbActionsHistory && item.nbActionsHistory.length > 0 ? item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions :parseInt(item.nbActions)
            if (item.nbNewActions && item.nbNewActions !== "" && !isNaN(parseInt(item.nbNewActions))) {
                newActionsEmis = newActionsEmis + parseInt(item.nbNewActions)
                item.isOld = "true"
                details_new_parts.push({
                    isOld:"true",
                    actio_id:item.id,
                    actio_email:item.email,
                    nb_actions_before:actio_nb_actions,
                    nb_actions_after: item.id === cessionAssignor ? (actio_nb_actions + parseInt(item.nbNewActions) - parseInt(cession_actions)) :
                        actio_nb_actions + parseInt(item.nbNewActions) + (item.nbNewCession && !isNaN(item.nbNewCession) ? parseInt(item.nbNewCession) : 0)
                })
            }else{
                details_new_parts.push({
                    isOld:"true",
                    actio_id:item.id,
                    actio_email:item.email,
                    nb_actions_before:actio_nb_actions,
                    nb_actions_after:item.id === cessionAssignor ? (actio_nb_actions - parseInt(cession_actions)) :
                        actio_nb_actions + (item.nbNewCession && !isNaN(item.nbNewCession) ? parseInt(item.nbNewCession) : 0),
                    include_in_augm:"false"
                })
            }
        })

        let new_actios_desc = [];
        let new_actions_desc_profit = "au profit de ";
        let signers = []
        let new_parts = [];
        let rep_capital_final = [];
        let recievers = [];
        associes.map( (item,key) =>  {
            let label = ""
            let nbActionsHistory = item.nbActionsHistory || [];
            if(item.typeTmp === "Un particulier"){
                label = item.firstname + " " +item.lastname;
                signers.push({fname:label})
            }else{
                label = "La société " + item.ej_name + " répresenté par " + item.representant.rep_firstname + " " + item.representant.rep_lastname
                signers.push({fname:label})
            }
            let nb_parts = item.nbActionsHistory && item.nbActionsHistory.length > 0 ? item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions : parseInt(item.isOld && item.isOld === "false" ? item.nbNewActions : item.nbActions)
            if (item.nbNewActions && item.nbNewActions !== "" && !isNaN(parseInt(item.nbNewActions))) {
                if(item.typeTmp === "Un particulier"){
                    new_parts.push({
                        actio_desc:item.civility + " " + item.firstname + " " + item.lastname,
                        nb_parts:item.nbNewActions
                    })
                }else{
                    new_parts.push({
                        actio_desc:"La société " + item.ej_name,
                        nb_parts:item.nbNewActions
                    })
                }

                nbActionsHistory.push({
                    nbActions:(item.nbActionsHistory && item.nbActionsHistory.length > 0) ? (item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions + parseInt(item.nbNewActions))  : parseInt(item.nbNewActions) + parseInt(item.isOld && item.isOld === "false" ? "0" : item.nbActions),
                    valeurAction:selected_soc.capital.valeurAction,
                    augmCapital_uid:augmCapital_uid,
                    cession_uid:cession_uid
                })
                item.nbActionsHistory = nbActionsHistory;


                apports_capital.push({
                    num_part_word:utilFunctions.numberToWord(key+1),
                    actio_desc:item.typeTmp === "Un particulier" ? (item.civility + " " + item.firstname + " " + item.lastname) : "La société " + item.ej_name,
                    nb_parts:nb_parts + parseInt(item.nbNewActions),
                    montant:(nb_parts + parseInt(item.nbNewActions)) * parseFloat(selected_soc.capital.valeurAction)
                })

                rep_capital_final.push({
                    num_part_word:utilFunctions.numberToWord(key+1),
                    actio_desc:item.typeTmp === "Un particulier" ? (item.civility + " " + item.firstname + " " + item.lastname) : "La société " + item.ej_name,
                    nb_parts: nb_parts + (item.isOld && item.isOld === "false" ? 0 :parseInt(item.nbNewActions)) + (item.id === cessionAssignor ? - parseInt(cession_actions) : parseInt(item.nbNewCession && !isNaN(item.nbNewCession) ? item.nbNewCession : "0")) ,
                    montant:(nb_parts + (item.isOld && item.isOld === "false" ? 0 :parseInt(item.nbNewActions)) + (item.id === cessionAssignor ? - parseInt(cession_actions) : parseInt(item.nbNewCession && !isNaN(item.nbNewCession) ? item.nbNewCession : "0")) ) * parseFloat(selected_soc.capital.valeurAction)
                })

            }else{
                let nb_parts = item.nbActionsHistory && item.nbActionsHistory.length > 0 ? item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions : parseInt(item.isOld && item.isOld === "false" ? item.nbNewActions : item.nbActions)
                rep_capital_final.push({
                    num_part_word:utilFunctions.numberToWord(key+1),
                    actio_desc:item.typeTmp === "Un particulier" ? (item.civility + " " + item.firstname + " " + item.lastname) : "La société " + item.ej_name,
                    nb_parts:nb_parts + (item.id === cessionAssignor ? - parseInt(cession_actions) : parseInt(item.nbNewCession && !isNaN(item.nbNewCession) ? item.nbNewCession : "0")),
                    montant:(nb_parts + (item.id === cessionAssignor ? - parseInt(cession_actions) : parseInt(item.nbNewCession && !isNaN(item.nbNewCession) ? item.nbNewCession : "0"))) * parseFloat(selected_soc.capital.valeurAction)
                })
            }


            if(item.nbNewCession && !isNaN(item.nbNewCession)){
                nbActionsHistory.push({
                    nbActions:(item.nbActionsHistory && item.nbActionsHistory.length > 0) ? (item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions + parseInt(item.nbNewCession))  : parseInt(item.nbNewCession) + parseInt(item.isOld && item.isOld === "false" ? "0" : item.nbActions),
                    valeurAction:selected_soc.capital.valeurAction,
                    cession:"true",
                    augmCapital_uid:augmCapital_uid,
                    cession_uid:cession_uid
                })
                item.nbActionsHistory = nbActionsHistory;
                recievers.push({
                    actio_desc:item.typeTmp === "Un particulier" ? (item.civility + " " + item.firstname + " " + item.lastname) : item.ej_name,
                    new_parts:item.nbNewCession
                })
            }
            if(item.id === cessionAssignor){
                nbActionsHistory.push({
                    nbActions:(item.nbActionsHistory && item.nbActionsHistory.length > 0) ? (item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions - parseInt(cession_actions))  : parseInt(item.isOld && item.isOld === "false" ? "0" : item.nbActions) - parseInt(cession_actions),
                    valeurAction:selected_soc.capital.valeurAction,
                    cession:"true",
                    augmCapital_uid,
                    cession_uid:cession_uid
                })
                item.nbActionsHistory = nbActionsHistory;
            }

            /*if(item.isOld === "false"){
                item.nbActions = item.nbNewActions
            }*/
        })

        let newAugmCapital = {
            uid:augmCapital_uid,
            cession_uid:cession_uid,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            created_by: localStorage.getItem("email"),
            date_ass: date_ass ? moment(date_ass).format("YYYY-MM-DD HH:mm:ss") : moment().format("YYYY-MM-DD HH:mm:ss"),
            agio: agio,
            typeAugCapital: typeAugCapital === "0" ? "primeEmission" : cessionAction === "0" ? "with_cession" : "normal",
            primeEmission:primeEmission,
            valeurAction: selected_soc.capital.valeurAction,
            nbNewActionsEmis: newActionsEmis,
            details_new_parts:details_new_parts
        }



        let current_capital = selected_soc.capitalHistory && selected_soc.capitalHistory.length > 0 ? selected_soc.capitalHistory[selected_soc.capitalHistory.length -1].capital : parseFloat(selected_soc.capital.totalCapital)
        let totalActions = current_capital / parseFloat(selected_soc.capital.valeurAction);
        let augm_amount = newActionsEmis * parseFloat(selected_soc.capital.valeurAction);


        let nb_new_actios_desc = "";
        let new_actios_participate_word = ""
        if(newAssociesValidated.length >= 1){
            nb_new_actios_desc = (newAssociesValidated.length === 1 ? "d'" : "de ") + utilFunctions.numberToWord2(newAssociesValidated.length) + (newAssociesValidated.length === 1 ? " nouveau" : " nouveaux") + (newAssociesValidated.length === 1 ? " asscoié" : " associés")
            new_actios_participate_word = (newAssociesValidated.length === 1 ? "Le nouveau associé participera" : "les nouveaux associés particeperont")
        }

        let prime_emission_value = primeEmission && !isNaN(primeEmission) ? primeEmission : "0"
        let find_c_asignor = (selected_soc.associes || []).find(x => x.id === cessionAssignor)

        let asignor_current_parts =find_c_asignor.nbActionsHistory && find_c_asignor.nbActionsHistory.length > 0 ? find_c_asignor.nbActionsHistory[find_c_asignor.nbActionsHistory.length -1].nbActions :parseInt(find_c_asignor.nbActions)

        let newCession = {
            uid:cession_uid,
            augmCapital_uid:augmCapital_uid,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            created_by: localStorage.getItem("email"),
            asignor:{
                actio_id:find_c_asignor.id,
                nb_parts_cede:cession_actions,
                nb_parts_before:asignor_current_parts + parseInt(cession_actions),
                nb_parts_after:asignor_current_parts,
                augmCapital:"true",
                recievers:recievers
            }
        }

        let generation_data = {
            "data":{
                sName:selected_soc.name,
                capital:selected_soc.capitalHistory && selected_soc.capitalHistory.length > 0 ? selected_soc.capitalHistory[selected_soc.capitalHistory.length -1].capital : selected_soc.capital.totalCapital,
                sAdress:selected_soc.siege.adress + ", " + selected_soc.siege.ville + ", " + selected_soc.siege.codePostal + " " + selected_soc.pays,
                ass_date:moment(date_ass).format("DD MMMM YYYY"),
                gerant_fname:selected_soc.gerants[0].firstname + " " + selected_soc.gerants[0].lastname,
                nb_parts_total:totalActions,
                nb_new_parts_total:totalActions + newActionsEmis,
                montant_augm:augm_amount,
                capital_after_augm:current_capital + augm_amount,
                bank_name:"AMEN BANK",
                bank_desc:"AMEN BANK, Agence Sfax nord",
                valeurAction:selected_soc.capital.valeurAction,
                capital_used_bank_date:"24 Juin 2021",
                associes:signers,
                rep_parts:last_rep_parts,
                apports_capital:apports_capital,
                nb_new_actios_desc:nb_new_actios_desc,
                new_actios:new_actios_desc,
                newActionsEmis:newActionsEmis,
                total_prime_emission : newActionsEmis * parseFloat(prime_emission_value),
                new_actios_desc:new_actions_desc_profit,
                total_prime_augm:(newActionsEmis * parseFloat(prime_emission_value)) + (newActionsEmis * parseFloat(selected_soc.capital.valeurAction)),
                new_parts:new_parts,
                prime_emission:prime_emission_value,
                new_actios_participate_word:new_actios_participate_word,
                rep_capital_final:rep_capital_final,
                hasPrime:typeAugCapital === "0" && !isNaN(primeEmission),
                c_nb_parts:cession_actions,
                c_asignor:find_c_asignor.typeTmp === "Un particulier" ? (find_c_asignor.civility + " " + find_c_asignor.firstname + " " + find_c_asignor.lastname) : find_c_asignor.ej_name,
                recievers:recievers
            }
        }

        let augmCapitalArray = selected_soc.augmCapital || [];
        let capitalHistory = selected_soc.capitalHistory || [];
        let cessionArray = selected_soc.cessionActions || [];

        //clear inputs
        associes.map( item => {
            if(item.nbNewActions) item.nbNewActions = ""
        })
        augmCapitalArray.push(newAugmCapital)
        cessionArray.push(newCession)
        capitalHistory.push({
            capital:capitalHistory.length > 0 ? capitalHistory[capitalHistory.length -1].capital + augm_amount : parseFloat(selected_soc.capital.totalCapital) + augm_amount,
            valeurAction:selected_soc.capital.valeurAction,
            nbActions: capitalHistory.length > 0 ? capitalHistory[capitalHistory.length -1].nbActions + newActionsEmis : totalActions + newActionsEmis,
            augmCapital_uid:augmCapital_uid,
            cession_uid:cession_uid
        })
        let item = selected_soc
        item.capitalHistory = capitalHistory
        item.cessionActions = cessionArray
        item.associes = associes

        setTimeout(() => {
            DocGenerationService.generate_TN_AugmCapital_with_Cession(generation_data).then( async genRes => {
                console.log(genRes)
                if(genRes && genRes.data){

                    let saveDocRes = await saveAugmDocs(genRes.data,"Augm_Capital_"+moment().format("DD-MM-YYYY HH:mm"))
                    if(saveDocRes && saveDocRes.uid){

                        augmCapitalArray[augmCapitalArray.length -1].idDoc = saveDocRes.uid
                        item.augmCapital = augmCapitalArray;
                        console.log(item)
                        rethink.update("test",'table("societies").get('+JSON.stringify(selected_soc.id)+').update('+ JSON.stringify(item) + ')',db_name,false).then( updateRes => {
                            if(updateRes && updateRes === true){
                                setNewAssociesValidated([])
                                setUpdateScreen(!updateScreen)
                                props.setLoading(false)
                                props.openSnackbar('success', 'Augmentation de capital effectuée avec succès');
                                setTimeout(() => {
                                    props.openPdf(genRes.data,"Augm_capital"+moment().format("DD-MM-YYYY"),"pdf")
                                },500)

                            }else{
                                props.setLoading(false)
                                props.openSnackbar("error","Une erreur est survenue !")
                            }
                        }).catch(err => {
                            props.setLoading(false)
                            console.log(err)
                            props.openSnackbar("error","Une erreur est survenue !")
                        })
                    }else{
                        props.setLoading(false)
                        props.openSnackbar("error","Une erreur est survenue lors de l'enregistrement de document !")
                    }

                }else{
                    props.setLoading(false)
                    props.openSnackbar("error","Une erreur est survenue lors de la génération de document !")
                }
            }).catch(err => {
                console.log(err)
                props.setLoading(false)
                props.openSnackbar("error","Une erreur est survenue lors de la génération de document !")
            })
        },500)



    }


    const saveAugmDocs = (b64,name) => {

        return new Promise(async (resolve, reject) => {

            rethink.createTable(db_name, "documents", "test").then( verif => {
                let newItem = {
                    created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
                    created_by:localStorage.getItem("email"),
                    b64:b64,
                    name:name,
                    uid:utilFunctions.getUID()
                }
                rethink.insert("test",'table("documents").insert('+ JSON.stringify(newItem) + ')',db_name,false).then( resAdd => {
                    if (resAdd && resAdd === true) {
                        resolve({uid:newItem.uid})
                    }else{
                        resolve(false)
                    }
                }).catch(err => {
                    console.log(err)
                    resolve(false)
                })
            }).catch(err => {
                console.log(err)
                resolve(false)
            })
        })
    }


    const getTotalNewActionsEmis = () => {
        let newActions = 0;
        associes.map(item => {
            if (item.nbNewActions && item.nbNewActions !== "" && !isNaN(parseInt(item.nbNewActions))) {
                newActions = newActions + parseInt(item.nbNewActions)
            }
        })
        newAssociesValidated.map(item => {
            if (item.nbNewActions && item.nbNewActions !== "" && !isNaN(parseInt(item.nbNewActions))) {
                newActions = newActions + parseInt(item.nbNewActions)
            }
        })
        return newActions
    }

    const getTotalNewCessionActionsEmis = () => {
        let newActions = 0;
        associes.map(item => {
            if (item.nbNewCession && item.nbNewCession !== "" && !isNaN(parseInt(item.nbNewCession))) {
                newActions = newActions + parseInt(item.nbNewCession)
            }
        })
        return newActions
    }


    return(
        <div>
            <h4>Augmentation de capital</h4>

            <div style={{
                marginTop: 35,
                padding: 10,
                paddingBottom: 50,
                paddingLeft: 35,
                border: "2px solid #f0f0f0",
                minWidth: 1000
            }}>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <h5>Sélectionner votre société</h5>
                        <select className="form-control custom-select"
                                style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                                onChange={(event) => {
                                    setSelected_soc(event.target.value)
                                }}
                                value={selected_soc}
                        >
                            {
                                (props.societies || []).map((soc,key) => (
                                    <option key={key} value={soc.id} label={soc.name}/>
                                ))
                            }

                        </select>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <h5>Date de l'assemblée générale</h5>
                        <DatePicker
                            calendarIcon={<img alt="" src={calendar} style={{width: 20}}/>}
                            onChange={(e) => {
                                setDate_ass(e)
                            }}
                            value={date_ass}
                            dayPlaceholder="dd"
                            monthPlaceholder="mm"
                            yearPlaceholder="yyyy"
                            format="dd-MM-yyyy"
                        />
                    </div>
                    <div className="col-md-6">
                        <h5>Agio d'émission</h5>
                        <input
                            className="form-control "
                            id="ezefze"
                            style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                            name="ezefze"
                            value={agio}
                            onChange={(e) => {
                                setAgio(e.target.value)
                            }}/>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-md-12">
                        <h5 className="mb-3">
                            Augmenter le capital avec une prime d'emission ?
                        </h5>
                        <div style={{display:"flex"}}>
                            <div className="radio radio-pink mb-2">
                                <input type="radio"
                                       name={"radioTypeAg"}
                                       id={"radioTypeAg1"}
                                       style={{marginLeft: 10}}
                                       onClick={() => setTypeAugCapital("0")}
                                       checked={typeAugCapital === "0"}
                                       value={typeAugCapital}
                                />
                                <label htmlFor={"radioTypeAg1"}>
                                    Oui
                                </label>
                            </div>
                            <div className="radio radio-pink mb-2">
                                <input type="radio"
                                       name={"radioTypeAg"}
                                       id={"radioTypeAg2"}
                                       style={{marginLeft: 10}}
                                       onClick={() => setTypeAugCapital("1")}
                                       checked={typeAugCapital === "1"}
                                       value={typeAugCapital}
                                />
                                <label htmlFor={"radioTypeAg2"}>
                                    Non
                                </label>
                            </div>
                        </div>
                    </div>
                    {
                        typeAugCapital === "0" &&
                        <div className="col-md-12">
                            <h5>Prime d'emission</h5>
                            <input
                                className="form-control "
                                id="ezefze"
                                style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                                name="ezefze"
                                value={primeEmission}
                                onChange={(e) => {
                                    setPrimeEmission(e.target.value)
                                }}/>
                        </div>
                    }
                </div>

                <div className="row mt-2">
                    <div className="col-md-12">
                        <h5 className="mb-3">
                            Cession d'action ?
                        </h5>
                        <div style={{display:"flex"}}>
                            <div className="radio radio-pink mb-2">
                                <input type="radio"
                                       name={"radioCession"}
                                       id={"radioCession1"}
                                       style={{marginLeft: 10}}
                                       onClick={() => setCessionAction("0")}
                                       checked={cessionAction === "0"}
                                       value={cessionAction}
                                />
                                <label htmlFor={"radioCession1"}>
                                    Oui
                                </label>
                            </div>
                            <div className="radio radio-pink mb-2">
                                <input type="radio"
                                       name={"radioCession"}
                                       id={"radioCession2"}
                                       style={{marginLeft: 10}}
                                       onClick={() => setCessionAction("1")}
                                       checked={cessionAction === "1"}
                                       value={cessionAction}
                                />
                                <label htmlFor={"radioCession2"}>
                                    Non
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    cessionAction === "0" &&

                    <div style={{
                        padding: 10,
                        paddingBottom: 50,
                        paddingLeft: 35,
                        border: "2px solid #f0f0f0",
                        borderRadius: 7.5
                    }}
                    >
                        <div className="row mt-2">
                            <div className="col-md-5">
                                <div>
                                    <h5>De</h5>
                                    <select className="form-control custom-select"
                                            style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                                            onChange={(event) => {
                                                setCessionAssignor(event.target.value)
                                            }}
                                            value={cessionAssignor}
                                    >
                                        {
                                            (selected_soc.associes || []).map((assoc, key) => (
                                                <option key={key} value={assoc.id}
                                                        label={assoc.typeTmp === "Un particulier" ? (assoc.firstname + " " + assoc.lastname) : assoc.ej_name}/>
                                            ))
                                        }

                                    </select>
                                </div>

                                <div>
                                    <h5>Nombre d'actions à céder</h5>
                                    <input
                                        className="form-control "
                                        id="ezefze"
                                        style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                                        name="ezefze"
                                        value={cession_actions}
                                        onChange={(e) => {
                                            setCession_actions(e.target.value)
                                        }}/>
                                </div>

                                <div className="col-md-6 mt-2">

                                </div>

                            </div>
                            <div className="col-md-6">
                                <h4 className="header-title mb-0">À</h4>

                                <div id="cardCollpase4" className="collapse pt-3 show"
                                     style={{maxHeight: 250, overflow: "auto"}}>
                                    <div className="table-responsive">
                                        <table className="table table-centered table-borderless mb-0">
                                            <thead className="thead-light">
                                            <tr>
                                                <th>Associé</th>
                                                <th className="text-center">Nb actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                associes.map((item, key) => (
                                                    item.nbActions !== "0" && item.id !== cessionAssignor &&
                                                    <tr>
                                                        <td>{item.ej_name === "" ? item.firstname + ' ' + item.lastname : item.ej_name}</td>
                                                        <td align="center">
                                                            <input type="text" className="form-control" id="nbCession"
                                                                   placeholder=""
                                                                   style={{width: 120}}
                                                                   value={associes[key]["nbNewCession"]}
                                                                   onChange={e => {
                                                                       item.nbNewCession = e.target.value
                                                                       setTotalNewCessionActionsEmis(getTotalNewCessionActionsEmis())
                                                                   }}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }






                <div className="row mt-4">
                    <div className="col-md-12">
                        <h4 className="header-title mb-0">Actionnaires de la société</h4>

                        <div id="cardCollpase4" className="collapse pt-3 show">
                            <div className="table-responsive">
                                <table className="table table-centered table-borderless mb-0">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>Actionnaire</th>
                                        <th>Email</th>
                                        <th style={{textAlign:"center"}}>Nationnalité</th>
                                        <th className="text-center">Téléphone</th>
                                        <th className="text-center">Nb actions avant augmentat.</th>
                                        <th className="text-center">Nombre d'actions nouvelles</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        associes.map((item, key) => (
                                            item.nbActions !== "0" &&
                                            <tr>
                                                <td>{ item.ej_name === ""  ? item.firstname + ' ' + item.lastname : item.ej_name}</td>
                                                <td>
                                                    <span className="badge bg-soft-blue text-blue p-1">{item.email} </span>
                                                </td>
                                                <td align="center">
                                                    <img src={
                                                        item.typeTmp === "Un particulier" ?  ((item.nationality === "française") ? france : (item.nationality === "Suisse") ? suisse : tunisie) :
                                                            (item.pays === "France" ? france : item.pays === "Switzerland" ? suisse : tunisie)

                                                    }
                                                         alt="society-flags" height="24" />
                                                </td>
                                                <td className="text-center" style={{color:"#000"}}>
                                                    +&nbsp;{item.phone}
                                                </td>
                                                <td className="text-center"><span
                                                    className="badge bg-soft-danger text-danger p-1">
                                                    {item.nbActionsHistory && item.nbActionsHistory.length > 0 ? item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions + " actions" : item.nbActions  +  " actions"}
                                                </span>
                                                </td>

                                                <td align="center">
                                                    <input type="text" className="form-control" id="nbNewActions"
                                                           placeholder="Exp: 50"
                                                           style={{width:120}}
                                                           value={associes[key]["nbNewActions"]}
                                                           onChange={e => {
                                                               item.nbNewActions = e.target.value
                                                               setTotalNewActionsEmis(getTotalNewActionsEmis())
                                                           }}
                                                    />
                                                </td>

                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            {
                                associes.length === 0 &&
                                <h6>Pas d'actionnaires encore ajoutés dans cette société !</h6>
                            }
                        </div>
                    </div>
                </div>

                <div className="row" style={{marginTop: 15}}>
                    <div className="col-lg-12">
                        <div className="float-right">
                            <Button color="primary"
                                    disabled={cessionAction === "0"}
                                    onClick={() => {addNewAssocie()}}
                                    className="btn btn-success waves-effect waves-light font-weight-bold">
                                <i className="fa fa-plus"/>&nbsp;&nbsp;
                                Ajouter un nouveau actionnaire
                            </Button>
                        </div>
                    </div>
                </div>

                <AvForm onValidSubmit={(event, values) => {}}
                >

                    {
                        newAssocies.map((item, key) => (
                            <div className="mt-2" key={key} style={{
                                padding: 25,
                                backgroundColor: "#f0f0f0",
                                borderRadius: 7.5,
                                marginBottom: 20
                            }}
                            >
                                <div className="row">
                                    <div className="col-lg-6">
                                        <AvGroup className="mb-3">
                                            <Label for="forme">L'associé est</Label>
                                            <AvInput type="select"
                                                     className="custom-select"
                                                     name={"formeMo" + key}
                                                     id={"formeMo" + key}
                                                     onChange={(event) => handleTypeTmpChange(key, event.target.value)}
                                                     value={newAssocies[key].type}
                                            >
                                                <option
                                                    value="Un particulier">Un particulier
                                                </option>
                                                <option
                                                    value="Une entité juridique">Une
                                                    entité juridique
                                                </option>
                                            </AvInput>
                                        </AvGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        {
                                            item.typeTmp === "Un particulier" ?
                                                <AvGroup className="mb-3">
                                                    <Label
                                                        for="role">Civilité</Label>
                                                    <AvInput type="select"
                                                             className="custom-select"
                                                             name={"civiliteMo" + key}
                                                             id={"civiliteMo" + key}
                                                             value={newAssocies[key].gender}
                                                             onChange={handle_newAssoc_aoc("associes", key, "gender")}
                                                    >
                                                        <option
                                                            value="M.">M.
                                                        </option>
                                                        <option
                                                            value="Mme">Mme
                                                        </option>
                                                    </AvInput>
                                                </AvGroup> :
                                                <AvGroup className="mb-3">
                                                    <Label for="role">Forme social</Label>
                                                    <AvInput type="select"
                                                             className="custom-select"
                                                             name={"formeSo" + key}
                                                             id={"formeSo" + key}
                                                             value={newAssocies[key].formeSocial}
                                                             onChange={handle_newAssoc_aoc("associes", key, "formeSocial")}
                                                    >
                                                        <option
                                                            value="SARL">SARL
                                                        </option>
                                                        <option
                                                            value="SA">SA
                                                        </option>
                                                    </AvInput>
                                                </AvGroup>
                                        }

                                    </div>
                                </div>
                                {
                                    item.typeTmp !== "Un particulier" &&
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <AvGroup className="mb-3">
                                                <Label for="prenom">Immatriculation</Label>
                                                <AvInput type="text"
                                                         name={"immatriculation" + key}
                                                         id={"immatriculation" + key}
                                                         value={newAssocies[key].immatriculation}
                                                         onChange={handle_newAssoc_aoc("associes", key, "immatriculation")}
                                                         required/>
                                                <AvFeedback>Ce champs est
                                                    obligatoire</AvFeedback>
                                            </AvGroup>
                                        </div>
                                        <div className="col-lg-6">
                                            <AvGroup className="mb-3">
                                                <Label for="prenom">Numéro
                                                    Siret(France)</Label>
                                                <AvInput type="text"
                                                         name={"numSiret" + key}
                                                         id={"numSiret" + key}
                                                         value={newAssocies[key].numSiret}
                                                         onChange={handle_newAssoc_aoc("associes", key, "numSiret")}
                                                />
                                                <AvFeedback>Ce champs est
                                                    obligatoire</AvFeedback>
                                            </AvGroup>
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <Label for="prenom">Capital social</Label>
                                            <Input
                                                className="custom-sui-input-size"
                                                size="small"
                                                label={
                                                    <Dropdown defaultValue='TND' options={[
                                                        {
                                                            key: 'TND',
                                                            text: 'TND',
                                                            value: 'TND'
                                                        },
                                                        {
                                                            key: 'EURO',
                                                            text: 'EURO',
                                                            value: 'EURO'
                                                        },
                                                        {
                                                            key: 'CHF',
                                                            text: 'CHF',
                                                            value: 'CHF'
                                                        },
                                                    ]}
                                                              value={newAssocies[key].capitalSocialCurrency}
                                                              onChange={(event, data) => {
                                                                  let objCp = newAssocies;
                                                                  objCp[key].capitalSocialCurrency = data.value;
                                                                  setNewAssocies(objCp)
                                                                  setUpdateScreen(!updateScreen)
                                                              }}
                                                    />}
                                                labelPosition='right'
                                                value={newAssocies[key].capitalSocial}
                                                onChange={(event, data) => {
                                                    let objCp = newAssocies;
                                                    objCp[key].capitalSocial = event.target.value;
                                                    setNewAssocies(objCp)
                                                    setUpdateScreen(!updateScreen)
                                                }}
                                            />
                                        </div>
                                    </div>
                                }
                                {
                                    item.typeTmp !== "Un particulier" &&
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <AvGroup className="mb-3">
                                                <Label for="email">Nom du représentant</Label>
                                                <AvInput type="text"
                                                         name={"repnom" + key}
                                                         id={"repnom" + key}
                                                         value={newAssocies[key].representant.rep_firstname}
                                                         onChange={event => {
                                                             let objCp = newAssocies;
                                                             objCp[key].representant.rep_firstname = event.target.value;
                                                             setNewAssocies(objCp)
                                                             setUpdateScreen(!updateScreen)
                                                         }}
                                                         required/>
                                                <AvFeedback>Ce champs est
                                                    obligatoire</AvFeedback>
                                            </AvGroup>
                                        </div>
                                        <div className="col-lg-6">
                                            <AvGroup className="mb-3">
                                                <Label for="email">Prénom du
                                                    représentant</Label>
                                                <AvInput type="text"
                                                         name={"repprenom" + key}
                                                         id={"repprenom" + key}
                                                         value={newAssocies[key].representant.rep_lastname}
                                                         onChange={event => {
                                                             let objCp = newAssocies
                                                             objCp[key].representant.rep_lastname = event.target.value;
                                                             setNewAssocies(objCp)
                                                             setUpdateScreen(!updateScreen)
                                                         }}
                                                         required/>
                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                            </AvGroup>
                                        </div>
                                    </div>
                                }
                                <div className="row">
                                    {
                                        item.typeTmp === "Un particulier" ?
                                            [
                                                <div className="col-lg-6">
                                                    <AvGroup
                                                        className="mb-3">
                                                        <Label for="nom">Nom</Label>
                                                        <AvInput type="text"
                                                                 name={"firstnameMo" + key}
                                                                 id={"firstnameMo" + key}
                                                                 value={newAssocies[key].firstname}
                                                                 onChange={handle_newAssoc_aoc("associes", key, "firstname")}
                                                                 required/>
                                                        <AvFeedback>Ce champs est
                                                            obligatoire</AvFeedback>
                                                    </AvGroup>
                                                </div>,
                                                <div className="col-lg-6">
                                                    <AvGroup
                                                        className="mb-3">
                                                        <Label
                                                            for="prenom">Prénom</Label>
                                                        <AvInput type="text"
                                                                 name={"lastnameMo" + key}
                                                                 id={"lastnameMo" + key}
                                                                 value={newAssocies[key].lastname}
                                                                 onChange={handle_newAssoc_aoc("associes", key, "lastname")}
                                                                 required/>
                                                        <AvFeedback>Ce champs est
                                                            obligatoire</AvFeedback>
                                                    </AvGroup>
                                                </div>

                                            ] :

                                            <div className="col-lg-12">
                                                <AvGroup className="mb-3">
                                                    <Label for="prenom">Nom de l'entité juridique</Label>
                                                    <AvInput type="text"
                                                             name={"ejname" + key}
                                                             id={"ejname" + key}
                                                             value={newAssocies[key].ej_name}
                                                             onChange={handle_newAssoc_aoc("associes", key, "ej_name")}
                                                             required/>
                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                </AvGroup>
                                            </div>

                                    }


                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <AvGroup className="mb-3">
                                            <Label for="email">Email</Label>
                                            <AvInput type="email"
                                                     name={"emailMo" + key}
                                                     id={"emailMo" + key}
                                                     value={newAssocies[key].email}
                                                     onChange={handle_newAssoc_aoc("associes", key, "email")}
                                                     required/>
                                            <AvFeedback>Email invalide</AvFeedback>
                                        </AvGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <AvGroup className="mb-3">
                                            <Label for="password">Numéro de
                                                téléphone</Label>
                                            <PhoneInput
                                                country={'fr'}
                                                value={newAssocies[key].phone}
                                                onChange={(value) => handleOnChangePhone(value, key)}
                                                inputStyle={{
                                                    width: "inherit",
                                                    height: 37
                                                }}/>
                                        </AvGroup>
                                    </div>
                                </div>

                                {
                                    item.typeTmp === "Un particulier" &&
                                    [
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="datnaiss">Date de naissance</Label>
                                                    <AvInput type="date"
                                                             name={"birthdayMo" + key}
                                                             id={"birthdayMo" + key}
                                                             value={newAssocies[key].birthday}
                                                             onChange={handle_newAssoc_aoc("associes", key, "birthday")}
                                                             required/>
                                                    <AvFeedback>Date invalide</AvFeedback>
                                                </AvGroup>
                                            </div>
                                            <div className="col-lg-6">
                                                <AvGroup className="mb-3">
                                                    <Label
                                                        for="nationality">Nationnalité</Label>
                                                    <AvInput type="select"
                                                             style={{textTransform: "capitalize"}}
                                                             className="custom-select"
                                                             name={"nationalityMo" + key}
                                                             id={"nationalityMo" + key}
                                                             value={newAssocies[key].nationality}
                                                             onChange={handle_newAssoc_aoc("associes", key, "nationality")}
                                                    >
                                                        {
                                                            Data.nationalityList.map((item, key) => (
                                                                <option
                                                                    style={{textTransform: "capitalize"}}
                                                                    value={item.nationalite}>{item.nationalite}
                                                                </option>
                                                            ))
                                                        }
                                                    </AvInput>
                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                </AvGroup>
                                            </div>
                                        </div>,
                                        newAssocies[key].nationality === "tunisienne" ?
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <AvGroup className="mb-3">
                                                        <Label for="email">Titulaire de la carte d'identité numéro:</Label>
                                                        <AvInput type="text"
                                                                 name={"numCarteIdentiteMo" + key}
                                                                 id={"numCarteIdentiteMo" + key}
                                                                 value={newAssocies[key].identityCardNum}
                                                                 onChange={handle_newAssoc_aoc("associes", key, "identityCardNum")}
                                                                 required/>
                                                        <AvFeedback>Ce champs est
                                                            obligatoire</AvFeedback>

                                                    </AvGroup>
                                                </div>
                                                <div className="col-lg-6">
                                                    <AvGroup>
                                                        <Label for="datnaiss">Délivé le </Label>
                                                        <AvInput type="date"
                                                                 name={"dateCarteIdentiteMo" + key}
                                                                 id={"dateCarteIdentiteMo" + key}
                                                                 value={newAssocies[key].identityCardDate}
                                                                 onChange={handle_newAssoc_aoc("associes", key, "identityCardDate")}
                                                                 required/>
                                                        <AvFeedback>Date invalide</AvFeedback>
                                                    </AvGroup>
                                                </div>
                                            </div> :
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <AvGroup className="mb-3">
                                                        <Label for="email">Titulaire du passeport numéro:</Label>
                                                        <AvInput type="text"
                                                                 name={"numPasseportMo" + key}
                                                                 id={"numPasseportMo" + key}
                                                                 value={newAssocies[key].passeportNum}
                                                                 onChange={handle_newAssoc_aoc("associes", key, "passeportNum")}
                                                                 required/>
                                                        <AvFeedback>Ce champs est obligatoire</AvFeedback>

                                                    </AvGroup>
                                                </div>
                                                <div className="col-lg-6">
                                                    <AvGroup>
                                                        <Label for="datnaiss">Délivé
                                                            le </Label>
                                                        <AvInput type="date"
                                                                 name={"datePasseportMo" + key}
                                                                 id={"datePasseportMo" + key}
                                                                 value={newAssocies[key].passeportDate}
                                                                 onChange={handle_newAssoc_aoc("associes", key, "passeportDate")}
                                                                 required/>
                                                        <AvFeedback>Date invalide</AvFeedback>
                                                    </AvGroup>
                                                </div>
                                            </div>

                                    ]
                                }

                                <h4 className="mb-3">
                                    {
                                        item.typeTmp === "Un particulier" ? "Adresse de l'associé" : "Adresse du siège social"
                                    }
                                </h4>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <AvGroup className="mb-3">
                                            <Label
                                                for="adress">Adresse</Label>
                                            <AvInput type="text"
                                                     name={"adressMo" + key}
                                                     id={"adressMo" + key}
                                                     value={newAssocies[key].adress}
                                                     onChange={handle_newAssoc_aoc("associes", key, "adress")}
                                                     required/>
                                            <AvFeedback>Ce champs est
                                                obligatoire</AvFeedback>
                                        </AvGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <AvGroup className="mb-3">
                                            <Label
                                                for="adress">Ville</Label>
                                            <AvInput type="text"
                                                     name={"villeMo" + key}
                                                     id={"villeMo" + key}
                                                     value={newAssocies[key].ville}
                                                     onChange={handle_newAssoc_aoc("associes", key, "ville")}
                                                     required/>
                                            <AvFeedback>Ce champs est
                                                obligatoire</AvFeedback>
                                        </AvGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <AvGroup className="mb-3">
                                            <Label for="postalcode">Code postal</Label>
                                            <AvInput type="number"
                                                     name={"postalCodeMo" + key}
                                                     id={"postalCodeMo" + key}
                                                     value={newAssocies[key].postalCode}
                                                     onChange={handle_newAssoc_aoc("associes", key, "postalCode")}
                                                     required/>
                                            <AvFeedback>Code postal
                                                invalide</AvFeedback>
                                        </AvGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <AvGroup className="mb-3">
                                            <Label for="pays">Pays</Label>
                                            <AvInput type="select"
                                                     className="custom-select"
                                                     name={"paysMo" + key}
                                                     id={"paysMo" + key}
                                                     value={newAssocies[key].pays}
                                                     onChange={handle_newAssoc_aoc("associes", key, "pays")}
                                                     required>
                                                {
                                                    Data.contreyList.map((item, key) => (
                                                        <option
                                                            value={item.Name}>{item.Name}</option>
                                                    ))
                                                }
                                            </AvInput>
                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                        </AvGroup>
                                    </div>
                                </div>

                                <div align="center">
                                    <Button color="primary"
                                            onClick={() => {
                                                props.setLoading(true)
                                                setTimeout(() => {
                                                    let newValidated = newAssociesValidated
                                                    newValidated.push(newAssocies[0])
                                                    console.log(newValidated)
                                                    setNewAssociesValidated(newValidated)
                                                    setNewAssocies([])
                                                    setUpdateScreen(!updateScreen)
                                                    props.setLoading(false)
                                                },1200);

                                            }}
                                            className="btn btn-success waves-effect waves-light font-weight-bold">
                                        <i className="fa fa-plus"/>&nbsp;&nbsp;
                                        Ajouter
                                    </Button>
                                </div>

                                <div style={{
                                    marginTop: 20,
                                    marginBottom: 20,
                                    height: 2,
                                    backgroundColor: "#C0C0C0",
                                    marginLeft: 40,
                                    marginRight: 40
                                }}/>
                            </div>
                        ))
                    }

                </AvForm>



                <div className="row mt-2">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-widgets"/>
                                <h4 className="header-title mb-0">Liste des nouveaux actionnaires</h4>

                                <div id="cardCollpase4" className="collapse pt-3 show">
                                    <div className="table-responsive">
                                        <table className="table table-centered table-borderless mb-0">
                                            <thead className="thead-light">
                                            <tr>
                                                <th>Actionnaire</th>
                                                <th>Email</th>
                                                <th style={{textAlign:"center"}}>Nationnalité</th>
                                                <th className="text-center">Téléphone</th>
                                                <th className="text-center">Nombre d'actions nouvelles</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                newAssociesValidated.map((item, key) => (
                                                    item.email !== "" &&
                                                    <tr>
                                                        <td>{ item.ej_name === ""  ? item.firstname + ' ' + item.lastname : item.ej_name}</td>
                                                        <td>
                                                            <span className="badge bg-soft-blue text-blue p-1">{item.email} </span>
                                                        </td>
                                                        <td align="center">
                                                            <img src={(item.pays === "France") ?
                                                                france : (item.pays === "Switzerland") ? suisse : tunisie}
                                                                 alt="society-flags" height="24" />
                                                        </td>
                                                        <td className="text-center" style={{color:"#000"}}>
                                                            +&nbsp;{item.phone}
                                                        </td>
                                                        <td align="center">
                                                            <input type="text" className="form-control" id="nbNewActions"
                                                                   placeholder="Exp: 50"
                                                                   style={{width:120}}
                                                                   value={newAssociesValidated[key]["nbNewActions"]}
                                                                   onChange={e => {
                                                                       item.nbNewActions = e.target.value
                                                                       setTotalNewActionsEmis(getTotalNewActionsEmis())
                                                                   }}
                                                            />
                                                        </td>

                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-widgets"/>
                                <div className="mt-2" style={{display:"flex"}}>
                                    <h4 className="header-title mb-0">Total des nouvelles actions émises:&nbsp;&nbsp;&nbsp;</h4>
                                    <h4 style={{color:"red",marginTop:-1}}>{totalNewActionsEmis} actions</h4>
                                </div>
                                <div className="mt-2" style={{display:"flex"}}>
                                    <h4 className="header-title mb-0">Valeur de l'action:&nbsp;&nbsp;&nbsp;</h4>
                                    <h4 style={{color:"red",marginTop:-1}}>{selected_soc.capital.valeurAction + "DT"}</h4>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12" align="center">
                        <button type="button"
                                disabled={date_ass === null || date_ass === undefined || totalNewActionsEmis <= 0 || (typeAugCapital === "0" && isNaN(primeEmission))}
                                className="btn btn-danger waves-effect waves-light btn-lg"
                                onClick={() => {
                                    if(typeAugCapital === "1" && (newAssociesValidated === 0 )){
                                        validate_augmCapital1()
                                    }else{
                                        if(cessionAction === "0"){
                                            let find_asignor = selected_soc.associes.find(x => x.id === cessionAssignor);
                                            let asignor_current_parts =find_asignor.nbActionsHistory && find_asignor.nbActionsHistory.length > 0 ? find_asignor.nbActionsHistory[find_asignor.nbActionsHistory.length -1].nbActions :parseInt(find_asignor.nbActions)
                                            if(asignor_current_parts < parseInt(cession_actions)){
                                                props.openSnackbar("error","L'associé ne posséde pas le nombre d'actions à céder !")
                                            }
                                            else if(parseInt(cession_actions) < totalNewCessionActionsEmis){
                                                props.openSnackbar("error","La somme des actions saisies est supérieur au nombre d'actions à ceder")
                                            }
                                            else if(parseInt(cession_actions) !== totalNewCessionActionsEmis){
                                                props.openSnackbar("error","La somme des actions saisies doit etre égal au nombre d'actions à céder !")
                                            }else{
                                                validate_augmCapital3()
                                            }
                                        }else{
                                            validate_augmCapital2()
                                        }
                                    }
                                }}>
                            <h5 style={{fontWeight:"bold",color:"#fff"}}>
                                Confirmer l'augmentation du capital</h5>
                        </button>
                    </div>
                </div>



            </div>
        </div>

    )

}
